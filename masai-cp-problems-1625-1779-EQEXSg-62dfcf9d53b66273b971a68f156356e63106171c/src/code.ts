export enum DatabaseModel {
  users = "users",
  videos = "videos",
  notifications = "notifications",
}

export abstract class Model {
  public readonly model: DatabaseModel;
  public readonly id: number;

  protected constructor(model: DatabaseModel) {
    this.model = model;
    this.id = Math.floor(Math.random() * 1000);
  }
}

export class UserModel extends Model {
  public readonly name: string;
  public readonly email: string;
  public readonly type: "Consumer" | "Creator";

  constructor(name: string, email: string, type: "Consumer" | "Creator") {
    super(DatabaseModel.users);
    this.name = name;
    this.email = email;
    this.type = type;
    const database = Database.connect();
    database.create(this.model, this);
  }
}

export class ConsumerModel extends UserModel {
  public isPremium: boolean;
  public subscribedChannels: number[];

  constructor(name: string, email: string) {
    super(name, email, "Consumer");
    this.isPremium = false;
    this.subscribedChannels = [];
  }

  public subscribe(creator: CreatorModel): void {
    this.subscribedChannels.push(creator.id);
    const database = Database.connect();
    const notification = new NotificationModel(
      `New video from ${creator.name}`,
      `A new video has been uploaded by ${creator.name}`,
      this.id
    );
    database.create(DatabaseModel.notifications, notification);
  }
}

export class CreatorModel extends UserModel {
  public noOfSubscribers: number;

  constructor(name: string, email: string) {
    super(name, email, "Creator");
    this.noOfSubscribers = 0;
  }
}

export class VideoModel extends Model {
  public link: string;
  public title: string;
  public categories: string[];
  public views: number;
  public likes: number;
  public dislikes: number;
  public userID: number;

  constructor(
    link: string,
    title: string,
    categories: string[],
    userID: number
  ) {
    super(DatabaseModel.videos);
    this.link = link;
    this.title = title;
    this.categories = categories;
    this.views = 0;
    this.likes = 0;
    this.dislikes = 0;
    this.userID = userID;
    const database = Database.connect();
    database.create(this.model, this);
  }
}

export class NotificationModel extends Model {
  public title: string;
  public description: string;
  public userID: number;
  public hasRead: boolean;

  constructor(title: string, description: string, userID: number) {
    super(DatabaseModel.notifications);
    this.title = title;
    this.description = description;
    this.userID = userID;
    this.hasRead = false;
    const database = Database.connect();
    database.create(this.model, this);
  }
}

export class Database {
  private static instance: Database;
  private users: UserModel[];
  private videos: VideoModel[];
  private notifications: NotificationModel[];

  private constructor() {
    this.users = [];
    this.videos = [];
    this.notifications = [];
  }

  public static connect(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public get Users(): UserModel[] {
    return this.users;
  }

  public get Videos(): VideoModel[] {
    return this.videos;
  }

  public get Notifications(): NotificationModel[] {
    return this.notifications;
  }

  public create(model: DatabaseModel, data: any): void {
    switch (model) {
      case DatabaseModel.users:
        this.users.push(data);
        break;
      case DatabaseModel.videos:
        this.videos.push(data);
        break;
      case DatabaseModel.notifications:
        this.notifications.push(data);
        break;
      default:
        throw new Error("Invalid model type.");
    }
  }

  public upsert(model: DatabaseModel, data: any): void {
    switch (model) {
      case DatabaseModel.users:
        this.upsertData(this.users, data);
        break;
      case DatabaseModel.videos:
        this.upsertData(this.videos, data);
        break;
      case DatabaseModel.notifications:
        this.upsertData(this.notifications, data);
        break;
      default:
        throw new Error("Invalid model type.");
    }
  }

  private upsertData(data: any[], newData: any): void {
    const index = data.findIndex((item) => item.id === newData.id);
    if (index !== -1) {
      data[index] = newData;
    } else {
      data.push(newData);
    }
  }

  public delete(model: DatabaseModel, id: number): void {
    switch (model) {
      case DatabaseModel.users:
        this.deleteData(this.users, id);
        break;
      case DatabaseModel.videos:
        this.deleteData(this.videos, id);
        break;
      case DatabaseModel.notifications:
        this.deleteData(this.notifications, id);
        break;
      default:
        throw new Error("Invalid model type.");
    }
  }

  private deleteData(data: any[], id: number): void {
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.splice(index, 1);
    }
  }
}
