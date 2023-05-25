export enum DatabaseModel {
  users = "users",
  videos = "videos",
  notifications = "notifications",
}

export abstract class Model {
  protected model: DatabaseModel;
  protected id: number;

  constructor(model: DatabaseModel) {
    if (new.target === Model) {
      throw new Error("Cannot instantiate abstract class Model");
    }
    this.model = model;
    this.id = Math.floor(Math.random() * 1000) + 1;
  }
}

export abstract class UserModel extends Model {
  protected name: string;
  protected email: string;
  protected type: "Consumer" | "Creator";

  constructor(name: string, email: string, type: "Consumer" | "Creator") {
    super(DatabaseModel.users);
    this.name = name;
    this.email = email;
    this.type = type;
    this.updateDatabase();
  }

  protected abstract updateDatabase(): void;
}

export class ConsumerModel extends Model {
  isPremium: boolean;
  subscribedChannels: number[];
  name: string;
  email: string;

  constructor(name: string, email: string) {
    super(DatabaseModel.users);
    this.isPremium = false;
    this.subscribedChannels = [];
    this.name = name;
    this.email = email;
  }
}



export class CreatorModel extends Model {
  private noOfSubscribers: number;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    super(DatabaseModel.users);
    this.noOfSubscribers = 0;
    this.name = name;
    this.email = email;
  }
}





export class VideoModel extends Model {}

export class NotificationModel extends Model {}

export class Database {
  private users: any[];
  private videos: any[];
  private notifications: any[];
  static isConnected: boolean = false;
  static Instance: Database | null = null;
  private constructor() {
    this.users = [];
    this.videos = [];
    this.notifications = [];
  }

  static connect() {
    if (Database.isConnected === true) return Database.Instance;
    Database.Instance = new Database();
    Database.isConnected = true;
    return Database.Instance;
  }

  // Getter methods
  getUsers(): any[] {
    return [...this.users];
  }

  getVideos(): any[] {
    return [...this.videos];
  }

  getNotifications(): any[] {
    return [...this.notifications];
  }

  create(data: any, arrayName: string) {
    switch (arrayName) {
      case "users":
        this.users.push(data);
        break;
      case "videos":
        this.videos.push(data);
        break;
      case "notifications":
        this.notifications.push(data);
        break;
      default:
        throw new Error("Invalid array name");
    }
  }

  upsert(data: any, arrayName: string) {
    switch (arrayName) {
      case "users":
        this.users = this.users.map((user: any) =>
          user.id === data.id ? data : user
        );
        break;
      case "videos":
        this.videos = this.videos.map((video: any) =>
          video.id === data.id ? data : video
        );
        break;
      case "notifications":
        this.notifications = this.notifications.map((notification: any) =>
          notification.id === data.id ? data : notification
        );
        break;
      default:
        throw new Error("Invalid array name");
    }
  }

  delete(id: string, arrayName: string) {
    switch (arrayName) {
      case "users":
        this.users = this.users.filter((user: any) => user.id !== id);
        break;
      case "videos":
        this.videos = this.videos.filter((video: any) => video.id !== id);
        break;
      case "notifications":
        this.notifications = this.notifications.filter(
          (notification: any) => notification.id !== id
        );
        break;
      default:
        throw new Error("Invalid array name");
    }
  }
}
