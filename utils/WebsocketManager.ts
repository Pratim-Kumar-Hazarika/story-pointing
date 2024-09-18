const BASE_URL = "ws://localhost:8080";

export class WebsocketManager {
  private ws: WebSocket;
  private static instance: WebsocketManager;
  private callbacks: any = {};
  private id: number;
  private intialized: boolean = false;
  private bufferedMessages: any[] = [];
  private constructor() {
    this.ws = new WebSocket(BASE_URL);
    this.bufferedMessages = [];
    this.id = 1;
    this.init();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new WebsocketManager();
    }
    return this.instance;
  }
  init() {
    this.ws.onopen = () => {
      this.intialized = true;
      this.bufferedMessages.forEach((message) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferedMessages = [];
    };
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      //  Type -  Total Participants , Pending, Voted
    };
  }

  sendMessage(message: any) {
    const messageToSend = {
      ...message,
      id: this.id++,
    };
    if (!this.intialized) {
      this.bufferedMessages.push(messageToSend);
      return;
    }
    this.ws.send(JSON.stringify(messageToSend));
  }
  async registerCallBack(type: string, callback: any, id: string) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({ callback, id });
  }
}
