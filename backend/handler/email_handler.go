package handler

// import (
// 	"io/ioutil"
// 	"log"
// 	"net/smtp"
// 	"strings"

// 	"golang.org/x/text/encoding/japanese"
// 	"golang.org/x/text/transform"
// )

// var (
// 	host = "smtp:1025"
// 	from = "testtest@gmail.com"
// 	to   = "testtest@gmail.com"
// 	cc   = []string{"testtest@gmail.com"}
// )

// func main() {
// 	message := strings.NewReader("testtest")
// 	transformer := japanese.ISO2022JP.NewEncoder()
// 	newMessage, _ := ioutil.ReadAll(transform.NewReader(message, transformer))
// 	err := smtp.SendMail(host, nil, from, cc, newMessage)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// }
