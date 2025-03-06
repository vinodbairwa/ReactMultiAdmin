class WebSocketService {
    constructor() {
        this.socket = null;
    }

    connect(instrument, onMessage, onError, onClose) {
        this.socket = new WebSocket(`ws://localhost:8000/ws/${instrument}`);

        this.socket.onopen = () => {
            console.log("WebSocket Connected");
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
            if (onError) onError(error);
        };

        this.socket.onclose = () => {
            console.log("WebSocket Disconnected");
            if (onClose) onClose();
        };
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

const websocketService = new WebSocketService();
export default websocketService;
