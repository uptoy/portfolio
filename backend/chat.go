package main

import (
	"backend/util"
	"fmt"
	"log"
	"net/http"
	"strings"

	"encoding/json"

	"github.com/gorilla/websocket"
)

type Chat struct {
	users    map[string]*ChatUser
	messages chan *Message
	join     chan *ChatUser
	leave    chan *ChatUser
}
type ChatUser struct {
	Username string
	Conn     *websocket.Conn
	Global   *Chat
}


var upgrader = websocket.Upgrader{
	ReadBufferSize:  512,
	WriteBufferSize: 512,
	CheckOrigin: func(r *http.Request) bool {
		log.Printf("%s %s%s %v\n", r.Method, r.Host, r.RequestURI, r.Proto)
		return r.Method == http.MethodGet
	},
}

func (c *Chat) Handler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatalln("Error on websocket connection:", err.Error())
	}

	keys := r.URL.Query()
	username := keys.Get("username")
	if strings.TrimSpace(username) == "" {
		username = fmt.Sprintf("anon-%d", util.GetRandomI64())
	}

	user := &ChatUser{
		Username: username,
		Conn:     conn,
		Global:   c,
	}

	c.join <- user

	user.Read()
}

func (c *Chat) Run() {
	for {
		select {
		case user := <-c.join:
			c.add(user)
		case message := <-c.messages:
			c.broadcast(message)
		case user := <-c.leave:
			c.disconnect(user)
		}
	}
}

func (c *Chat) add(user *ChatUser) {
	if _, ok := c.users[user.Username]; !ok {
		c.users[user.Username] = user

		body := fmt.Sprintf("%s join the chat", user.Username)
		c.broadcast(NewMessage(body, "Server"))
	}
}

func (c *Chat) broadcast(message *Message) {
	log.Printf("Broadcast message: %v\n", message)
	for _, user := range c.users {
		user.Write(message)
	}
}

func (c *Chat) disconnect(user *ChatUser) {
	if _, ok := c.users[user.Username]; ok {
		defer user.Conn.Close()
		delete(c.users, user.Username)

		body := fmt.Sprintf("%s left the chat", user.Username)
		c.broadcast(NewMessage(body, "Server"))
	}
}

func Start(port string) {

	log.Printf("Chat listening on http://localhost%s\n", port)

	c := &Chat{
		users:    make(map[string]*ChatUser),
		messages: make(chan *Message),
		join:     make(chan *ChatUser),
		leave:    make(chan *ChatUser),
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to Go WebChat!"))
	})

	http.HandleFunc("/chat", c.Handler)

	go c.Run()

	log.Fatal(http.ListenAndServe(port, nil))
}

type Message struct {
	ID     int64  `json:"id"`
	Body   string `json:"body"`
	Sender string `json:"sender"`
}

func NewMessage(body string, sender string) *Message {
	return &Message{
		ID:     util.GetRandomI64(),
		Body:   body,
		Sender: sender,
	}
}


func (u *ChatUser) Read() {
	for {
		if _, message, err := u.Conn.ReadMessage(); err != nil {
			log.Println("Error on read message:", err.Error())

			break
		} else {
			u.Global.messages <- NewMessage(string(message), u.Username)
		}
	}

	u.Global.leave <- u
}

func (u *ChatUser) Write(message *Message) {
	b, _ := json.Marshal(message)

	if err := u.Conn.WriteMessage(websocket.TextMessage, b); err != nil {
		log.Println("Error on write message:", err.Error())
	}
}
