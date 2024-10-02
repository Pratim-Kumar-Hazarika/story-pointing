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
      // const message1 = {
      //   method: "SUBSCRIBE",
      //   params: ["room1"],
      // };
      // this.ws.send(JSON.stringify(message1));

      this.bufferedMessages.forEach((message) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferedMessages = [];
    };
    this.ws.onmessage = (event) => {
      const messageFromSever = JSON.parse(event.data);
      console.log("=>>>>>>>>", messageFromSever);
      console.log("Callbakcss---------", this.callbacks);
      if (messageFromSever.type === "revealVotes") {
        this.callbacks["revealVotes"].forEach(({ callback }: any) => {
          callback(messageFromSever.data);
        });
      }
      if (
        messageFromSever.type === "totalParticipants" ||
        messageFromSever.type === "voting"
      ) {
        this.callbacks["totalParticipants"].forEach(({ callback }: any) => {
          callback(messageFromSever.data);
        });
      }
      if (messageFromSever.type === "startEstimation") {
        this.callbacks["startEstimation"].forEach(({ callback }: any) => {
          callback(messageFromSever.data);
        });
      }
      if (messageFromSever.type === "resetVotes") {
        this.callbacks["resetVotes"].forEach(({ callback }: any) => {
          callback(messageFromSever.data);
        });
      }
      if (messageFromSever.type === "newEstimation") {
        this.callbacks["newEstimation"].forEach(({ callback }: any) => {
          callback(messageFromSever.data);
        });
      }
    };
  }

  sendMessage(message: any) {
    if (!this.intialized) {
      this.bufferedMessages.push(message);
      return;
    }
    this.ws.send(JSON.stringify(message));
  }
  async registerCallBack(type: string, callback: any, id: string) {
    if (!this.callbacks[type]) {
      this.callbacks[type] = [];
    }
    if (this.callbacks[type].length === 0) {
      this.callbacks[type].push({ callback, id });
    }
  }

  async deRegisterCallback(type: string, id: string) {
    //
  }
}
