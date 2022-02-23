//TODO functional component from class component
import React from 'react';
import { InputText } from '../../components/InputText';
import { Messages } from '../../components/Messages'
import { Status } from '../../components/Status';
import './styles.css';

const baseURL = 'ws://localhost:8080/chat';

export class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: undefined,
            username: '',
            message: '',
            messages: [],
        }
    }

    render() {
        const { ws, messages } = this.state;

        return (
            <div className="chat">
                <h1>WebChat</h1>
                <Status status={ws ? 'connected' : 'disconnected'} />
                {
                    ws && <Messages messages={messages} />
                }
                <div className="chat-inputs">
                    <InputText
                        placeholder={ws ? 'Write message' : 'Enter with your username'}
                        onChange={value => ws ? this.setMessage(value) : this.setUsername(value)}
                        defaultValue={ws ? this.state.message : this.state.username}
                    />
                    <button type="button" onClick={() => ws ? this.sendMessage() : this.enterChat()}>
                        {ws ? 'Send' : 'Enter'}
                    </button>
                </div>
            </div>
        )
    }

    enterChat() {
        const { username } = this.state;

        let ws = new WebSocket(baseURL + `?username=${username}`);

        ws.onopen = (evt) => {
            console.log('Websocket opened!', {evt});
        }

        ws.onclose = (evt) => {
            console.log('Websocket closed!', {evt});
            this.setState({ws: undefined});
        }

        ws.onmessage = (msg) => {
            console.log('Websocket message:', {msg});
            this.setMessages(msg.data);
        }

        ws.onerror = (error) => {
            console.log('Websocket error:', {error});
        }

        this.setState({ws, username: ''});
    }

    sendMessage() {
        const { ws, message } = this.state;

        ws.send(message);
        this.setMessage('');
    }

    setUsername(value) {
        this.setState({username: value});
    }

    setMessage(value) {
        this.setState({message: value});
    }

    setMessages(value) {
        let messages = this.state.messages.concat([JSON.parse(value)]);
        this.setState({messages});
    }
}

export class Status extends React.Component {
  render() {
      const { status } = this.props;

      return (
          <span className="status">
              <span className={`status-icon ${status}`}></span>
              <span className="status-text">{status}</span>
          </span>
      );
  }
}

export class Messages extends React.Component {
  render() {
      const { messages } = this.props;

      return messages && messages.map(message => <p key={message.id}><strong>{message.sender}:</strong> {message.body}</p>);
  }
}

export class InputText extends React.Component {
  render() {
      const { type, placeholder, onChange, defaultValue } = this.props;

      return <input
          type={type ? type : 'text'}
          placeholder={placeholder ? placeholder : ''}
          onChange={e => onChange(e.target.value)}
          value={defaultValue}
      />
  }
}
