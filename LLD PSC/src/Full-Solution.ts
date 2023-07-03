export const SubcriptionPrice = 199;

export enum DatabaseModel {
  users = "users",
  videos = "videos",
  notifications = "notifications",
}

interface IModel {
  id: number;
  model: DatabaseModel;
}
interface User extends IModel {
  name: string;
  email: string;
  type: "Consumer" | "Creator";
  isPremium?: boolean;
  noOfSubscribers?: number;
  subscibedChannels?: number[];
}

interface Video extends IModel {
  link: string;
  title: string;
  categories: string[];
  views: number;
  likes: number;
  dislikes: number;
  userID: number;
}
interface Notification extends IModel {
  title: string;
  description: string;
  userID: number;
  hasRead: boolean;
}

type DatabaseModelMaping =
  | {
      model: DatabaseModel.users;
      type: User;
    }
  | {
      model: DatabaseModel.videos;
      type: Video;
    }
  | {
      model: DatabaseModel.notifications;
      type: Notification;
    };

export abstract class Model {
  model: DatabaseModel;
  id: number;
  constructor(model: DatabaseModel) {
    this.model = model;
    this.id = Math.random();
  }
}








export abstract class UserModel extends Model {
  name: string;
  email: string;
  type: "Consumer" | "Creator";
  constructor(name: string, email: string, type: "Consumer" | "Creator") {
    super(DatabaseModel.users);
    this.id = Math.random();
    this.name = name;
    this.email = email;
    this.type = type;
  }
}
export class ConsumerModel extends UserModel implements User {
  isPremium: boolean;
  subscibedChannels?: number[];
  constructor(name: string, email: string) {
    super(name, email, "Consumer");
    this.isPremium = false;
    this.subscibedChannels = [];
    Database.Instance.create({
      model: DatabaseModel.users,
      type: {
        id: this.id,
        model: this.model,
        email: this.email,
        name: this.name,
        isPremium: this.isPremium,
        type: this.type,
        subscibedChannels: this.subscibedChannels,
      },
    });
  }

  viewNotifications() {
    const notifications = Database.Instance.Notifications.filter((element) => {
      if (element.userID === this.id && element.hasRead === false) {
        return true;
      }
    });

    notifications.forEach((element) => {
      Database.Instance.upsert({
        model: DatabaseModel.notifications,
        type: {
          ...element,
          hasRead: true,
        },
      });
    });

    return notifications;
  }

  subscribe(channelID: number) {
    this.subscibedChannels?.push(channelID);
    Database.Instance.upsert({
      model: DatabaseModel.users,
      type: {
        id: this.id,
        model: this.model,
        name: this.name,
        email: this.email,
        isPremium: this.isPremium,
        subscibedChannels: this.subscibedChannels,
        type: this.type,
      },
    });
  }
}

export class CreatorModel extends UserModel implements User {
  noOfSubscribers: number;
  constructor(name: string, email: string) {
    super(name, email, "Creator");
    this.noOfSubscribers = 0;
    Database.Instance.create({
      model: DatabaseModel.users,
      type: {
        id: this.id,
        model: this.model,
        email: this.email,
        name: this.name,
        noOfSubscribers: this.noOfSubscribers,
        type: this.type,
      },
    });
  }

  uploadVideo(link: string, title: string, categories: string[]) {
    const video = new VideoModel(link, title, categories, this.id);
    Database.Instance.Users.forEach((element) => {
      if (!element.subscibedChannels?.includes(this.id)) return;
      new NotificationModel(
        title,
        `Your subcribed youtuber ${this.name} have uploaded a new video`,
        element.id
      );
    });
  }
}
export class VideoModel extends Model implements Video {
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
    this.views = 0;
    this.dislikes = 0;
    this.likes = 0;
    this.userID = userID;
    Database.Instance.create({
      model: DatabaseModel.videos,
      type: {
        id: this.id,
        model: this.model,
        link: this.link,
        likes: this.likes,
        dislikes: this.dislikes,
        views: this.views,
        userID: this.userID,
        title: this.title,
        categories: this.categories,
      },
    });
  }

  likeVideo() {
    Database.Instance.upsert({
      model: DatabaseModel.videos,
      type: {
        link: this.link,
        title: this.title,
        categories: this.categories,
        views: this.views,
        dislikes: this.dislikes,
        userID: this.userID,
        id: this.id,
        model: this.model,
        likes: this.likes + 1,
      },
    });
    this.likes++;
  }
  dislikeVideo() {
    Database.Instance.upsert({
      model: DatabaseModel.videos,
      type: {
        link: this.link,
        title: this.title,
        categories: this.categories,
        views: this.views,
        dislikes: this.dislikes + 1,
        userID: this.userID,
        id: this.id,
        model: this.model,
        likes: this.likes,
      },
    });
    this.dislikes = this.dislikes + 1;
  }
}

export class NotificationModel extends Model implements Notification {
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

    Database.Instance.create({
      model: DatabaseModel.notifications,
      type: {
        id: this.id,
        title: this.title,
        description: this.description,
        userID: this.userID,
        model: this.model,
        hasRead: false,
      },
    });
  }
}

export class Database {
  static isConnected: boolean = false;
  private static instance: Database;

  private users: User[];
  private videos: Video[];
  private notifications: Notification[];

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

  static get Instance() {
    return Database.instance;
  }
  static connect() {
    if (Database.isConnected === false) {
      Database.instance = new Database();
      Database.isConnected = true;
    }
    return Database.instance;
  }

  create({ model, type }: DatabaseModelMaping) {
    if (model === DatabaseModel.users) {
      Database.Instance[model].push(type);
      return Database.Instance[model];
    } else if (model === DatabaseModel.videos) {
      Database.Instance[model].push(type);
      return Database.Instance[model];
    } else if (model === DatabaseModel.notifications) {
      Database.Instance[model].push(type);
      return Database.Instance[model];
    }
  }

  upsert({ model, type }: DatabaseModelMaping) {
    if (model === DatabaseModel.users) {
      Database.Instance[model] = Database.Instance[model].map((element) => {
        if (element.id === type.id) return type;
        return element;
      });
      return Database.Instance[model];
    } else if (model === DatabaseModel.videos) {
      Database.Instance[model] = Database.Instance[model].map((element) => {
        if (element.id === type.id) return type;
        return element;
      });
      return Database.Instance[model];
    } else if (model === DatabaseModel.notifications) {
      Database.Instance[model] = Database.Instance[model].map((element) => {
        if (element.id === type.id) return type;
        return element;
      });
      return Database.Instance[model];
    }
  }
  delete({ model, type }: DatabaseModelMaping) {
    if (model === DatabaseModel.users) {
      Database.Instance[model] = Database.Instance[model].filter((element) => {
        if (element.id === type.id) return false;
        return true;
      });
      return Database.Instance[model];
    } else if (model === DatabaseModel.videos) {
      Database.Instance[model] = Database.Instance[model].filter((element) => {
        if (element.id === type.id) return false;
        return true;
      });
      return Database.Instance[model];
    } else if (model === DatabaseModel.notifications) {
      Database.Instance[model] = Database.Instance[model].filter((element) => {
        if (element.id === type.id) return false;
        return true;
      });
      return Database.Instance[model];
    }
  }
}
