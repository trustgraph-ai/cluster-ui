
export interface IncomingCommand {
    type : string;
};

export interface Message {
    role : string;
    text : string;
};

export interface IncomingMessageCommand {
    type : string;
    body : Message;
};

export class CommandSocket {

    socket? : WebSocket;
    url : string;

    constructor(
        url : string,
        onStateChange : (connected: boolean) => void,
        onMessage : (message : Message) => void,
    ) {
    console.log("Init CommandSocket");
        this.url = url;
        this.connect();
        this.onStateChange = onStateChange;
        this.onMessage = onMessage;
    }

    onStateChange : (connected: boolean) => void;
    onMessage : (message : Message) => void;

    connect () { 

        this.socket = new WebSocket(this.url);

        this.socket.addEventListener("open", () => {
            this.onStateChange(true);
        });

        this.socket.addEventListener("close", () => {
            this.onStateChange(false);
            this.reconnect();
        });

        this.socket.addEventListener("error", () => {
        });

        this.socket.addEventListener("message", (event : any) => {

            const msg = JSON.parse(event.data);

            const type = (msg as IncomingCommand).type;

            console.log(msg);

            if (type == "message") {
                this.onMessage((msg as IncomingMessageCommand).body);
            } else {
                console.log("Ignored command type", type);
            }

        });

    }

    reconnect() { 
        console.log("Will reconnect...");
        setTimeout(() => {
            console.log("Reconnecting");
            this.connect();
        }, 2000);
    }

    sendMessage(text : string) : void {
        if (!this.socket) return;

        this.socket.send(JSON.stringify({
            type: "message",
            body: {
                text: text
            }
        }));
    };
    
};

