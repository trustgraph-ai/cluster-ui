
import React, { useState, useRef } from 'react';

import { useMessageStore } from '../state/MessageStore';

import { Message, CommandSocket } from '../active/command-socket';

import Input from './Input';
import MessageHistory from './MessageHistory';

interface ControlPanelProps {
}

const ControlPanel : React.FC<ControlPanelProps> =
    ({ }) => 
{

    const messages = useMessageStore((state) => state.messages);
    const add = useMessageStore((state) => state.add);
    const clear = useMessageStore((state) => state.clear);

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

    return (
        <>
            <MessageHistory/>
            <Input
                onSubmit={
                    (text : string) => {
                        if (!ws.current) return;
                        ws.current.sendMessage(text);
                        appendMessage("human", text);
                    }
                }
                onClearHistory={ () => { clear(); } }
            />
            <div>
                Connected: {connected.toString()}
            </div>
        </>
    );

}

export default ControlPanel;

