
import React from 'react';

import { useMessageStore } from '../state/MessageStore';
import ChatMessage from './ChatMessage';

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
                {
                    messages.map(
                        (msg) => 
                        {
                            return (
                                <ChatMessage key={msg.id} message={msg}/>
                            );
                        }
                    )
                }
            </div>
        </>
    );

}

export default MessageHistory;

