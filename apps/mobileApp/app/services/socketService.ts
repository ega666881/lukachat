import { CreateChat, NewMessage } from "@luka/websocket";
import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;

  private listeners: Record<string, ((data: any) => void)[]> = {};

  connect(userId: string) {
    if (this.socket?.connected) {
      console.log("⚠️ Сокет уже подключен");
      return;
    }

    this.socket = io(process.env.EXPO_PUBLIC_API_URL, {
      transports: ["websocket"],
      query: {
        userId,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    this.socket.on("connect", () => {
      this.isConnected = true;
      this.emitLocal("connect", {});
    });

    this.socket.on("disconnect", () => {
      this.isConnected = false;
      console.log("❌ Отключено от WS");
    });

    this.socket.on(NewMessage.ExchangeName, (data: NewMessage.Message) => {
      this.emitLocal(NewMessage.ExchangeName, data);
    });

    this.socket.on(CreateChat.ExchangeName, (data: CreateChat.Message) => {
      this.emitLocal(CreateChat.ExchangeName, data);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  emit(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("⚠️ Сокет не подключен");
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback?: (data: any) => void) {
    this.socket?.off(event, callback);
  }

  getSocket() {
    return this.socket;
  }

  private emitLocal(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb(data));
    }
  }

  get isConnectedStatus() {
    return this.isConnected;
  }
}

export const socketService = new SocketService();
