
import React from 'react';

import { useMessageStore } from '../state/MessageStore';

//import { Message, CommandSocket } from './command-socket';

interface MessageHistoryProps {
}

const MessageHistory : React.FC<MessageHistoryProps> =
    ({ }) => 
{

    const messages = useMessageStore((state) => state.messages);

    return (
        <>
            <div>
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
        </>
    );

}

export default MessageHistory;

