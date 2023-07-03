import {
  DatabaseModel,
  Database,
  ConsumerModel,
  CreatorModel,
  VideoModel,
  NotificationModel,
} from "../code";
import fs from "fs";
import cp from "child_process";

const Database2: any = Database;
const ConsumerModel2: any = ConsumerModel;
const CreatorModel2: any = CreatorModel;

declare global {
  var score: number;
  var features: number;
}
global.score = 1;
global.features = 0;
describe("Youtube app Features testing", () => {
  it("The instance of Database should be created with the connect method and it should allow to create only one isnatnce of the Database", () => {
    const db = Database2.connect();
    expect(db instanceof Database).toBe(true);
    expect(db).toBe(Database2.Instance);
    const db2 = Database2.connect();
    expect(db).toBe(db2);
    global.score += 2;
    global.features++;
  }); // 2

  it("Check all the different properties of the Database class", () => {
    expect(Database2.Instance).toHaveProperty("users");
    expect(Database2.Instance).toHaveProperty("videos");
    expect(Database2.Instance).toHaveProperty("notifications");
    expect(Database2.Instance).toHaveProperty("create");
    expect(Database2.Instance).toHaveProperty("upsert");
    expect(Database2.Instance).toHaveProperty("delete");
    expect(Database2.Instance).toHaveProperty("Users");
    expect(Database2.Instance).toHaveProperty("Videos");
    expect(Database2.Instance).toHaveProperty("Notifications");
    global.score += 2;
    global.features++;
  }); // 2

  it("Create an instance of CreatorModel and check it's properties", () => {
    expect(Database2.Instance.Users.length).toBe(0);
    const creator = new CreatorModel2("s", "s@gmail.com");
    expect(creator).toHaveProperty("id");
    expect(creator).toHaveProperty("model");
    expect(creator.name).toBe("s");
    expect(creator.email).toBe("s@gmail.com");
    expect(creator.noOfSubscribers).toBe(0);

    expect(Database2.Instance.Users.length).toBe(1);
    global.score += 2;
    global.features++;
  }); // 2

  it("Create an instance of the ConsumerModel and check it's properties", () => {
    expect(Database2.Instance.Users.length).toBe(1);
    const consumer = new ConsumerModel2("t", "t@gmail.com");
    expect(consumer).toHaveProperty("id");
    expect(consumer).toHaveProperty("model");
    expect(consumer.name).toBe("t");
    expect(consumer.email).toBe("t@gmail.com");
    expect(consumer.isPremium).toBe(false);
    expect(Database2.Instance.Users.length).toBe(2);
    global.score += 2;
    global.features++;
  }); // 2

  it("Check the upload Video method method", () => {
    expect(Database2.Instance.Videos.length).toBe(0);
    const creator = new CreatorModel2("u", "u@gmail.com");
    creator.uploadVideo("link", "link", []);
    expect(Database2.Instance.Videos.length).toBe(1);
    global.score += 2;
    global.features++;
  }); // 2

  it("Upload video and check the notifications of all the subscribers", () => {
    expect(Database2.Instance.Notifications.length).toBe(0);
    const creator = new CreatorModel2("u", "u@gmail.com");
    const consumer1 = new ConsumerModel2("v", "v@gmail.com");
    const consumer2 = new ConsumerModel2("w", "w@gmail.com");

    consumer1.subscribe(creator.id);
    consumer2.subscribe(creator.id);
    creator.uploadVideo("link", "test", []);
    expect(Database2.Instance.Notifications.length).toBe(2);
    expect(
      Database2.Instance.Notifications[
        Database2.Instance.Notifications.length - 2
      ].userID
    ).toBe(consumer1.id);
    expect(
      Database2.Instance.Notifications[
        Database2.Instance.Notifications.length - 1
      ].userID
    ).toBe(consumer2.id);
    global.score += 3;
    global.features++;
  }); // 3

  it("Check the viewNotifications function of the Consumer", () => {
    const creator = new CreatorModel2("a", "a@gmail.com");
    const consumer = new ConsumerModel2("b", "b@gmail.com");
    consumer.subscribe(creator.id);
    expect(
      Database2.Instance.Notifications.filter(
        (element: any) => element.userID === consumer.id
      ).length
    ).toBe(0);
    creator.uploadVideo("v1", "v1", []);
    expect(
      Database2.Instance.Notifications.filter(
        (element: any) => element.userID === consumer.id
      ).length
    ).toBe(1);
    expect(
      Database2.Instance.Notifications.filter(
        (element: any) => element.userID === consumer.id
      )[0].hasRead
    ).toBe(false);

    expect(consumer.viewNotifications().length).toBe(1);
    expect(
      Database2.Instance.Notifications.filter(
        (element: any) => element.userID === consumer.id
      )[0].hasRead
    ).toBe(true);
    global.score += 3;
    global.features++;
  }); // 3
});

const FileContent = [
  `import { Database } from "./code";
const db = new Database();`,
  `import { UserModel } from "./code";
new UserModel("s", "e", "Consumer");`,
  `import { Model, DatabaseModel } from "./code";
new Model(DatabaseModel.users);`,
  `import { Database, VideoModel } from "./code";
Database.connect();
new VideoModel(10, true, "", 10);`,
  `import { Database, NotificationModel } from "./code";
Database.connect();
new NotificationModel(true, 10, 10, 10);
`,
  `import { CreatorModel, Database } from "./code";
Database.connect();
new CreatorModel(true, 10);`,
  `import { ConsumerModel, Database } from "./code";
Database.connect();
new ConsumerModel(true, 10);`,
  `import { Database } from "./code";
Database.connect();
Database.users;
Database.notifications;
Database.videos;
`,
];
describe("Youtube App Types testing", () => {
  test("You shouldn't be able to create Instance of the Database class with new keyword", async () => {
    expect(global.features).toBeGreaterThanOrEqual(3);
    try {
      let data = await OnFail(FileContent[0]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 50000);
  test("You shouldn't be able to create an instance of the UserModel class", async () => {
    expect(global.features).toBeGreaterThanOrEqual(3);
    try {
      let data = await OnFail(FileContent[1]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 50000);
  test("You shouldn't be able to create an instance of the Model class", async () => {
    expect(global.features).toBeGreaterThanOrEqual(3);
    try {
      let data = await OnFail(FileContent[2]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 50000);
  test("Types checking of the VideoModel class", async () => {
    expect(global.features).toBeGreaterThanOrEqual(3);
    try {
      let data = await OnFail(FileContent[3]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 50000);
  test("Types checking of the NotificationModel class", async () => {
    expect(global.features).toBeGreaterThanOrEqual(3);
    try {
      let data = await OnFail(FileContent[4]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 50000);
  test("Types checking of the CreatorModel class", async () => {
    expect(global.features).toBeGreaterThanOrEqual(3);
    try {
      let data = await OnFail(FileContent[5]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 50000);
  test("Types checking of the ConsumerModel class", async () => {
    expect(global.features).toBeGreaterThanOrEqual(3);
    try {
      let data = await OnFail(FileContent[6]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 50000);
  test("The database keys like users should not be public", async () => {
    expect(global.features).toBeGreaterThanOrEqual(3);
    try {
      let data = await OnFail(FileContent[7]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 50000);
});
afterAll(() => {
  console.log("Final Score is", global.score);
});

const execPromise = () => {
  return new Promise((resolve, reject) => {
    cp.exec("npx ts-node src/index.ts", (e, data) => {
      if (e) {
        reject({ ...e, isErrorFromExec: true });
      } else {
        resolve(data);
      }
    });
  });
};
const fsPromise = (path = "", content = "") => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        return reject({ err, isErrorFromExec: false });
      }
      resolve("Created File");
    });
  });
};

const OnPass = (FileContent: string) => {
  return new Promise(async (resolve, reject) => {
    let data;
    try {
      await fsPromise(`${__dirname}/../src/index.ts`, FileContent);
      data = await execPromise();
    } catch (error) {
      reject(error);
    }
    resolve(data);
  });
};

const OnFail = (FileContent: string) => {
  return new Promise(async (resolve, reject) => {
    let error;
    try {
      await fsPromise(`${__dirname}/../index.ts`, FileContent);
      await execPromise();
    } catch (err) {
      error = err;
      resolve(err);
    }
    if (error) resolve(error);
    expect(error).toBeTruthy();
  });
};
