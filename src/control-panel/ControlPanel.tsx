
import React, { useState, useRef, FormEvent } from 'react';

import { useMessageStore } from '../state/MessageStore';

import { Message, CommandSocket } from './command-socket';

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

    const [text, setText] = useState<string>("");
    const [connected, setConnected] = useState<boolean>(false);
    
    const appendMessage =
        (role : string, text : string) => {
            add({
                id: messages.length,
                role: role,
                text: text,
            });
        };

    const ws = useRef<CommandSocket | null>(null);

    if (ws.current === null) {
        ws.current = new CommandSocket(
            "/ws",
            (connected : boolean) => { setConnected(connected); },
            (message : Message) => {
                appendMessage(message.role, message.text);
            },
        )
    };

    const click = () => {

        if (!ws.current) return;

        ws.current.sendMessage(text);

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

