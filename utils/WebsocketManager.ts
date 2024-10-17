const BASE_URL = `wss://${process.env.NEXT_PUBLIC_WS}`;

export class WebsocketManager {
  private ws: WebSocket;
  private static instance: WebsocketManager;
  private callbacks: any = {};
  private id: number;
  private intialized: boolean = false;
  private bufferedMessages: any[] = [];
  private pingInterval: any;
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

      //Send once
      const roomCode = localStorage.getItem("roomCode");
      const moderatorId = localStorage.getItem("moderatorId");

      ///Moderator will have the moderator id
      if (roomCode) {
        const reconnectPayload = {
          method: "SENDMESSAGE",
          data: {
            channelId: roomCode,
            reconnect: true,
            moderatorId: moderatorId ? moderatorId : null,
          },
        };
        this.ws.send(JSON.stringify(reconnectPayload));
      }

      //Start Ping
      this.startPing();
    };
    this.ws.onmessage = (event) => {
      const messageFromSever = JSON.parse(event.data);
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
      if (messageFromSever.type === "onGoingEstimation") {
        this.callbacks["onGoingEstimation"].forEach(({ callback }: any) => {
          callback(messageFromSever.data);
        });
      }
      if (messageFromSever.type === "reconnect") {
        this.callbacks["reconnect"].forEach(({ callback }: any) => {
          callback(messageFromSever.data);
        });
      }
      if (messageFromSever.type === "noActiveRooms") {
        this.callbacks["noActiveRooms"].forEach(({ callback }: any) => {
          callback(messageFromSever.data);
        });
      }
    };
    this.ws.onclose = () => {
      this.stopPing();
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
    if (this.callbacks[type]) {
      this.callbacks[type] = this.callbacks[type].filter(
        (cbObj: any) => cbObj.id !== id,
      );
    }
  }

  ///Ping  to keep the connection Alive
  startPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval); // Clear any existing interval
    }
    this.pingInterval = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.sendMessage({ type: "alive" });
      }
    }, 5000);
  }

  stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
  }
}
