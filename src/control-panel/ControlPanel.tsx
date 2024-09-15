
import React, { useState, useRef, useEffect, FormEvent } from 'react';

import { useMessageStore } from '../state/MessageStore';

export interface SocketUpstream {
    type : string;
    message? : string;
};

export interface SocketDownstream {
    type : string;
    message? : string;
    error? : string;
};

interface ControlPanelProps {
}

const ControlPanel : React.FC<ControlPanelProps> =
    ({ }) => 
{

    const messages = useMessageStore((state) => state.messages);
    const add = useMessageStore((state) => state.add);

/*
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, role: "human", text: "Hello" },
        { id: 1, role: "ai", text: "Hello, nice to meet you" },
    ]);
    */

    const [text, setText] = useState<string>("");

    const [connected, setConnected] = useState<boolean>(false);
    
    const ws = useRef<any>(null);

    const appendMessage =
        (role : string, text : string) => {
            add({
                id: messages.length,
                role: role,
                text: text,
            });
        };

    const connect = () => {

        console.log("Connecting...");

        ws.current = new WebSocket("/ws");

        ws.current.onopen = (_event : any) => {
            console.log("Connected");
            setConnected(true);
        };

        ws.current.addEventListener("close", (_event : any) => {
            console.log("Disconnected");
            setConnected(false);
            reconnect();
        });

        ws.current.addEventListener("error", (_event : any) => {
            console.log("Error");
        });

    };

    useEffect( () => {

        if (!ws.current) return;

        ws.current.onmessage = (event : any) => {

            const message = (JSON.parse(event.data) as SocketDownstream);

            if (message.type == "message") {
                if (message.message)
                    appendMessage("ai", message.message);
            } else if (message.type == "error") {
                if (message.error)
                    appendMessage("ai", "Error: " + message.error);
            } else {
                console.log("Unknown message, ignored");
            }

        };

    }, [messages, text]);

    const reconnect = () => {
        console.log("Will reconnect...");
        setTimeout(() => {
            console.log("Reconnecting");
            connect();
        }, 2000);
    }

    useEffect(() => {
        connect();
    }, []);

    const click = () => {

        ws.current.send(JSON.stringify({
            type: "message", message: text,
        }));

        appendMessage("human", text);

        setText("");
    };

    const submit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="">
                Messages:
                <table>
                    <tbody>
                    {
                        messages.map(
                            (msg) => 
                            {
                                return (
                                    <tr
                                        key={msg.id}>
                                        <td>{msg.role}</td>
                                        <td>{msg.text}</td>
                                    </tr> );
                                }
                            )
                    }
                    </tbody>
                </table>
            </div>
            <div>
                <form onSubmit={(e) => submit(e)}>
                    <label htmlFor="text">Text:</label>
                    <input
                        type="text" value={text}
                        id="text"
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={() => click()}>
                        Click!
                    </button>
                </form>
            </div>
            <div>
                Connected: {connected.toString()}
            </div>
        </>
    );

}

export default ControlPanel;

