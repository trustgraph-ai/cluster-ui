
import React, { useState, useEffect  } from 'react';
import useWebSocket /*,  { ReadyState } */ from 'react-use-websocket';

export interface Message {
    role : string;
    text : string;
    id : number;
};

interface ControlPanelProps {
}


const ControlPanel : React.FC<ControlPanelProps> =
    ({ }) => 
{

    const [messages, setMessages] = useState<Message[]>([
        { id: 0, role: "human", text: "Hello" },
        { id: 1, role: "ai", text: "Hello, nice to meet you" },
    ]);

    const [text, setText] = useState<string>("x");

    const [socketUrl, /* setSocketUrl */] = useState('/ws');
    const { sendJsonMessage, lastJsonMessage, /* readyState */ } =
        useWebSocket(socketUrl);

   useEffect(() => {
      if (lastJsonMessage) {

          console.log(lastJsonMessage);

          if (! (lastJsonMessage.type)) {
              console.log("Expecting type in message?!");
              continue;
          }

          if (lastJsonMessage.type == "error") {
          console.log("ERROR");
          }

          setMessages([
              ...messages,
              {
                  id: messages.length,
                  role: "ws",
                  text: (lastJsonMessage as any)['text']
              }
          ]);
      }
    }, [lastJsonMessage]);

    const click = () => {
        setMessages([
            ...messages,
            { id: messages.length, role: "human", text: text }
        ]);
        setText("");
        sendJsonMessage({
            "type": "message", "message": text,
        });

    }

    useEffect(() => {

//        const ws = new WebSocket("/ws");

    }, []);



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
                        <tr key={msg.id}>
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
        <input
            type="text" defaultValue={text}
            onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => click()}>
        Click!
        </button>
        </div>
        </>
    );

}

export default ControlPanel;

