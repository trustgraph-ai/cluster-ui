
export class CommandSocket {

    socket? : WebSocket;
    url : string;

    constructor(url : string) {
        this.url = url;
        this.connect();
        this.onStateChange = () => {};
        this.onMessage = () => {};
    }

    onStateChange : (connected: boolean) => void;
    onMessage : (message : any) => void;

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
            this.onMessage(msg);
        });

    }

    reconnect() { 
        console.log("Will reconnect...");
        setTimeout(() => {
            console.log("Reconnecting");
            this.connect();
        }, 2000);
    }

    send(msg : any) : void {
        if (!this.socket) return;
        this.socket.send(JSON.stringify(msg));
    };
    
};

