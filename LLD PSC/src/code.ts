export enum DatabaseModel {
  users = "users",
  videos = "videos",
  notifications = "notifications",
}

type DatabaseMaping =
  | {
      model: DatabaseModel.users;
      data: IUser;
    }
  | {
      model: DatabaseModel.videos;
      data: IVideo;
    }
  | {
      model: DatabaseModel.notifications;
      data: INotification;
    };

interface IModel {
  id: number;
  model: DatabaseModel;
}
export abstract class Model implements IModel {
  id: number;
  model: DatabaseModel;
  constructor(model: DatabaseModel) {
    this.id = Math.random();
    this.model = model;
  }
}

interface IUser extends IModel {
  name: string;
  email: string;
  type: "Consumer" | "Creator";
}
export abstract class UserModel extends Model implements IUser {
  name: string;
  email: string;
  type: "Consumer" | "Creator";

  constructor(name: string, email: string, type: "Consumer" | "Creator") {
    super(DatabaseModel.users);
    this.name = name;
    this.email = email;
    this.type = type;
  }
}

interface IConsumer extends IUser {
  isPremium: boolean;
  subscibedChannels: number[];
}

export class ConsumerModel extends UserModel implements IConsumer {
  isPremium: boolean;
  subscibedChannels: number[];
  constructor(name: string, email: string) {
    super(name, email, "Consumer"); // ? Constructor of the Parent
    this.isPremium = false;
    this.subscibedChannels = [];
    Database.Instance?.create({
      model: DatabaseModel.users,
      data: {
        id: this.id,
        model: this.model,
        email: this.email,
        type: this.type,
        name: this.name,
      },
    });
  }
}

interface ICreator extends IUser {
  noOfSubscribers: number;
}
export class CreatorModel extends UserModel implements ICreator {
  noOfSubscribers: number;
  constructor(name: string, email: string) {
    super(name, email, "Creator");
    this.noOfSubscribers = 0;
  }
}

interface IVideo extends IModel {
  link: string;
  title: string;
  categories: string[];
  views: number;
  likes: number;
  dislikes: number;
  userID: number; //? The Creator's id
}
export class VideoModel extends Model implements IVideo {
  link: string;
  title: string;
  categories: string[];
  views: number;
  likes: number;
  dislikes: number;
  userID: number;

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
    this.userID = userID;
    this.views = 0;
    this.likes = 0;
    this.dislikes = 0;
  }
}

interface INotification extends IModel {
  title: string;
  description: string;
  userID: number;
  hasRead: boolean;
}

export class NotificationModel extends Model implements INotification {
  title: string;
  description: string;
  userID: number;
  hasRead: boolean;
  constructor(title: string, description: string, userID: number) {
    super(DatabaseModel.notifications);
    this.title = title;
    this.description = description;
    this.userID = userID;
    this.hasRead = false;
  }
}

export class Database {
  private users: IUser[];
  private videos: IVideo[];
  private notifications: INotification[];
  static Instance: Database | null = null;
  private constructor() {
    this.users = [];
    this.videos = [];
    this.notifications = [];
  }
  get Users() {
    return this.users;
  }
  get Videos() {
    return this.videos;
  }

  get Notifications() {
    return this.notifications;
  }

  create({ model, data }: DatabaseMaping) {
    if (model === DatabaseModel.users) {
      this.users.push(data);
    } else if (model === DatabaseModel.videos) {
      this.videos.push(data);
    } else if (model === DatabaseModel.notifications) {
      this.notifications.push(data);
    }
  }

  static connect() {
    if (Database.Instance === null) {
      Database.Instance = new Database();
    }
    return Database.Instance;
  }
}
