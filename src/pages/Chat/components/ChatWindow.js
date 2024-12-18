import React, { useState } from 'react';
import { exampleAgent } from '../../../api/agents/exampleAgent';
import '../chat.css';

const Title = () => {
    return (
        <div className="chat-header">
            <span className='chat-about'>Geometry Chat</span>
        </div>
    );
}

//TODO
const ProcessMessage = ({ message }) => {
    //    There should be prossesing with nlp
}

const UserInput = ({ onButtonClick }) => {
    const [value, setValue] = useState("");
    function handle() {
        console.log(value);
        onButtonClick(value);
        setValue("");
    }
    return (
        <div className="chat-message">
            <div className="input-group mb-0">
                <div className="input-group-prepend pad">
                    <input name="inputMessage" type="text" className="form-control" placeholder="Enter text here..."
                        value={value}
                        onChange={(e) => { setValue(e.target.value) }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                onButtonClick(e.target.value);
                                setValue("");
                            }
                        }}
                        autoComplete="off" />
                    <span className="input-group-text"><i id="buttons" className="fa fa-paper-plane-o fa-2x" onClick={handle}></i></span>
                </div>
            </div>
        </div>
    );
}

const OutputMessage = ({ messageText }) => {
    return (
        <li className="clearfix">
            <div className="message-data">
                <span className="message-data-time">10:12 AM, Today</span>
            </div>
            <div className="message my-message">{messageText}</div>
        </li>
    );
}

const InputMessage = ({ messageText }) => {
    return (
        <li className="clearfix">
            <div className="message-data float-right">
                <span className="message-data-time">10:10 AM, Today</span>
            </div>
            <div className="message other-message float-right multiline">{messageText}</div>
        </li>
    );
}

const Message = ({ text, classMessage }) => {
    if (classMessage === 'output') {
        return (<OutputMessage messageText={text} />);
    }
    else {
        return (
            <InputMessage messageText={text} />
        );
    }
}

//TODO
let messages = [
    // history of messages
    // should be stored with Cookies or smth like that
]

const ChatWindow = () => {
    const [, setMessage] = useState("");

    const handleMessage = async (msg) => {
        setMessage(msg);
        messages.push({ text: msg, class: 'input' });
        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: msg }),
            });
            const data = await response.json();
            messages.push({ text: data.response, class: 'output' });
        }
        catch (error) {
            console.error(error);
            messages.push({ text: 'Пока что я не могу ответить.', class: 'output' });
        }
        finally {
            setMessage("");
        }
    };
    let ex = exampleAgent("name");
    console.log("answer", ex);
    return (
        <div className="chat row">
            <Title />
            <div className="chat-history vertical-scroll">
                <ul>
                    {messages.map((msg, index) => (
                        <Message key={index} text={msg.text} classMessage={msg.class} />
                    ))}
                </ul>
            </div>
            <UserInput onButtonClick={handleMessage} />
        </div>
    );
}

export default ChatWindow;
