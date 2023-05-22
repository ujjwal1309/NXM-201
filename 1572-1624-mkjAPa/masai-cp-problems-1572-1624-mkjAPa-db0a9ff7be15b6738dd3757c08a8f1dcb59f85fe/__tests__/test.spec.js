const cp = require("child_process");
const fs = require("fs");
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
global.score = 1;
global.passed = new Array(7).fill(false);

const FileContentPass = [
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const parkingSpot = new ParkingSlot(5);
  console.log(parkingSpot.addSlots(new Slot("Bike")));`,

  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const parkingSpot = new ParkingSlot(5);
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Car"));
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Bus"));
  console.log(parkingSpot.addSlots(new Slot("Car")));`,

  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const parkingSpot = new ParkingSlot(5);
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Car"));
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Bus"));
  parkingSpot.addSlots(new Slot("Car"));
  console.log(parkingSpot.addSlots(new Slot("Car")));`,

  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const parkingSpot = new ParkingSlot(5);
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Car"));
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Bus"));
  parkingSpot.addSlots(new Slot("Car"))
  console.log(parkingSpot.availableSlot("Bike"));`,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const parkingSpot = new ParkingSlot(5);
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Car"));
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Bus"));
  parkingSpot.addSlots(new Slot("Car"))
  console.log(parkingSpot.availableSlot("Bus"));`,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const parkingSpot = new ParkingSlot(5);
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Car"));
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Bus"));
  parkingSpot.addSlots(new Slot("Car"));
  parkingSpot.bookSlot(new Car(1,"red"));
  console.log(parkingSpot.availableSlot("Car"));`,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const parkingSpot = new ParkingSlot(5);
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Car"));
  parkingSpot.addSlots(new Slot("Bike"));
  parkingSpot.addSlots(new Slot("Bus"));
  parkingSpot.addSlots(new Slot("Car"));
  parkingSpot.bookSlot(new Bus(1,"red"));
  console.log(parkingSpot.availableSlot("Bus"));`,
];

const FileContentFail = [
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const bus = new Bus();`,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const bus = new Bus(10);`,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const bus = new Bus("", "");`,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const bus = new Car("", "");
  `,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const slot = new Slot(10)
  `,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const slot = new Slot("10")`,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const park = new ParkingSlot("")`,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const park = new ParkingSlot(5);
  park.addSlots("")`,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const park = new ParkingSlot(5);
  park.availableSlot(10)
  `,
  `import { Bike , Bus, Car, Slot,ParkingSlot} from "./code";
  const park = new ParkingSlot(5);
  park.bookSlot(10)
  `,
];

describe("TS Testing", () => {
  beforeEach(() => {
    const tsFileExists1 = fs.existsSync(`${__dirname}/../src/index.ts`);
    expect(tsFileExists1).toBe(true);
    const tsFileExists2 = fs.existsSync(`${__dirname}/../src/code.ts`);
    expect(tsFileExists2).toBe(true);
  });
  it("If Everything works fine with correct params-1", async () => {
    try {
      let data = await OnPass(FileContentPass[0]);
      expect(data).toContain("1");
      global.score += 1;
      global.passed[0] = true;
    } catch (error) {
      console.log(error);
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("If Everything works fine with correct params-2", async () => {
    try {
      let data = await OnPass(FileContentPass[1]);
      expect(data).toContain("5");
      global.score += 1;
      global.passed[1] = true;
    } catch (error) {
      console.log(error);
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("If Everything works fine with correct params-3", async () => {
    try {
      let data = await OnPass(FileContentPass[2]);
      expect(data).toContain("5");
      global.score += 1;
      global.passed[2] = true;
    } catch (error) {
      console.log(error);
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("If Everything works fine with correct params-4", async () => {
    try {
      let data = await OnPass(FileContentPass[3]);
      expect(data).toContain("2");
      global.score += 1;
      global.passed[3] = true;
    } catch (error) {
      console.log(error);
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("If Everything works fine with correct params-5", async () => {
    try {
      let data = await OnPass(FileContentPass[4]);
      expect(data).toContain("1");
      global.score += 1;
      global.passed[4] = true;
    } catch (error) {
      console.log(error);
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("If Everything works fine with correct params-6", async () => {
    try {
      let data = await OnPass(FileContentPass[5]);
      expect(data).toContain("1");
      global.score += 1;
      global.passed[5] = true;
    } catch (error) {
      console.log(error);
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("If Everything works fine with correct params-7", async () => {
    try {
      let data = await OnPass(FileContentPass[6]);
      expect(data).toContain("0");
      global.score += 1;
      global.passed[6] = true;
    } catch (error) {
      console.log(error);
      expect(error).toBeFalsy();
    }
  }, 20000);

  it("Bus Params Checking-1", async () => {
    AllPassed(global.passed);
    try {
      let data = await OnFail(FileContentFail[0]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 20000);

  it("Bus Params Checking-2", async () => {
    AllPassed(global.passed);
    try {
      let data = await OnFail(FileContentFail[1]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 20000);

  it("Bus Params Checking-3", async () => {
    AllPassed(global.passed);
    try {
      let data = await OnFail(FileContentFail[2]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("Car Params Checking", async () => {
    AllPassed(global.passed);
    try {
      let data = await OnFail(FileContentFail[3]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("Slot Params Checking", async () => {
    AllPassed(global.passed);
    try {
      let data = await OnFail(FileContentFail[4]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("ParkingSlot Params Checking", async () => {
    AllPassed(global.passed);
    try {
      let data = await OnFail(FileContentFail[5]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("AddSlot Params Checking", async () => {
    AllPassed(global.passed);
    try {
      let data = await OnFail(FileContentFail[6]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("AvailableSlot Params Checking", async () => {
    AllPassed(global.passed);
    try {
      let data = await OnFail(FileContentFail[7]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 20000);
  it("BookSlot Params Checking", async () => {
    AllPassed(global.passed);
    try {
      let data = await OnFail(FileContentFail[8]);
      global.score += 1;
    } catch (error) {
      expect(error).toBeFalsy();
    }
  }, 20000);

  afterAll(() => {
    console.log("Final Score is", global.score);
  });
});

const AllPassed = (arr = []) => {
  for (let i = 0; i < arr.length; i++) {
    expect(arr[i]).toBeTruthy();
  }
};
const OnPass = (FileContent) => {
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

const OnFail = (FileContent) => {
  return new Promise(async (resolve, reject) => {
    let error;
    try {
      await fsPromise(`${__dirname}/../src/index.ts`, FileContent);
      data = await execPromise();
    } catch (err) {
      error = err;
      resolve(err);
    }
    if (error) resolve(error);
    expect(error).toBeTruthy();
  });
};
