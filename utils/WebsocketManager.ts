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
    console.log("called init");
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new WebsocketManager();
    }
    return this.instance;
  }
  init() {
    this.ws.onopen = () => {
      console.log("connected");
      this.intialized = true;
      const message1 = {
        method: "SUBSCRIBE",
        params: ["room1"],
      };
      this.ws.send(JSON.stringify(message1));

      this.bufferedMessages.forEach((message) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferedMessages = [];
    };
    this.ws.onmessage = (event) => {
      const messageFromSever = JSON.parse(event.data);
      // For Total Participants, Voted, Pending
      if (this.callbacks["userData"]) {
        this.callbacks["userData"].forEach(({ callback }: any) => {
          callback(messageFromSever);
        });
      }
      //  Type -    Total Participants , Pending, Voted
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
    console.log("REGISTER CALL");
    this.callbacks[type] = this.callbacks[type] || [];
    const x = this.callbacks[type].filter((item: any) => item.id === id);
    console.log(x);
    if (x.length === 1) {
      return;
    }
    this.callbacks[type].push({ callback, id });
  }
}
