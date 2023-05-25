# TS LLD YOUTUBE DATABASE

## Maximum Marks: 25

```
✅ able to submit the app - 1 mark ( minimum score )
✅ The instance of Database should be created with the connect method and it should allow to create only one isnatnce of the Database - 2 marks
✅ Check all the different properties of the Database class - 2 marks
✅ Create an instance of CreatorModel and check it's properties - 2 marks
✅ Create an instance of the ConsumerModel and check it's properties - 2 marks
✅ Check the upload Video method method - 2 marks
✅ Upload video and check the notifications of all the subscribers - 3 marks
✅ Check the viewNotifications function of the Consumer - 3 marks
✅ You shouldn't be able to create Instance of the Database class with new keyword - 1 marks
✅ You shouldn't be able to create an instance of the UserModel class - 1 marks
✅ You shouldn't be able to create an instance of the Model class - 1 marks
✅ Types checking of the VideoModel class - 1 marks
✅ Types checking of the NotificationModel class - 1 marks
✅ Types checking of the CreatorModel class - 1 marks
✅ Types checking of the ConsumerModel class - 1 marks
✅ The database keys like users should not be public - 1 marks
```

## Submission Instructions [Please note]:

- The Submission should not contain spaces, for example /rct-101 folder/eval will not work
- Do not push node_modules and package_lock.json to GitHub

## Getting Started:

- Use node version(LTS) should be v16.16.0
- Don't change/override package.json
- please make sure you do not push package-lock.json
- Run the following commands
  1.  npm install --engine-strict
- **Running the TypeScript Code** :- `ts-node src/<filename.ts>`
- **Testing Your Code Locally**:- `npm run test`
- Make sure before running these command you install all the dependencies

## Folder Structure:-

```
src
├── index.ts
├── code.ts -> all your code goes here
├── __tests__
|  ├── test.spec.ts

```

<h1 style="color:red;">While testing make sure an instance of the database should not be already created. Basically you shouldn't have anything other than the implementation of the classes and all the types/interfaces/enums you are using</h1>

## Problem Statement:

- Here we have to build the database of of the Youtube with Typescript, OOPs concepts and Design Patterns.

- Here in this application we will have total of 7 classes:-

  1.  Model
  2.  UserModel
  3.  ConsumerModel
  4.  CreatorModel
  5.  VideoModel
  6.  NotificationModel
  7.  Database

- Please look at the below image for a better understanding of the inheritance tree of the above classes:- ![image](https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2023-05-18/Screenshot%202023-05-18%20at%2010.39.05%20PM_310569.png)

- In the code there will also be a enum called DatabaseModel which should have 3 keys:-
  1. users = "users",
  2. videos = "videos",
  3. notifications = "notifications",
- This is already given in the template no need to build it.

### Database:-

- This is going to be the central database of you application.

- You shouldn't be allowed to create an instance of this class with the new keyword:- `new Database() 🔴`

- Also you should only be allowed to created only once instance of the class with the a static method called:- `connect`

- All the Database class will have a static property called `Instance` where you will store the instance of the Database class.

- The database will have 3 main properties(You can create any other property but these 3 are must) :-

  1. users
  2. videos
  3. notifications

- All 3 of them should be private.
- You should have 3 public getters:-

  1.  Users -> users
  2.  Videos -> videos
  3.  Notifications -> notifications

- So with these getters you can get all the data but you can't change or update/delete the data

- The Database will have 3 methods for the CRUD operations:-

  1.  create
  2.  upsert
  3.  delete

- All 3 of them takes an Object an a parameter. Using create you can put data into any of the 3 arrays(users,videos,notifications)

### Model:-

- The model class should only be used for inheritance. You should't be allowed to create an instance of this class.

- Model will have 2 properties which are:-

  1.  model: DatabaseModel(enum)
  2.  id: number

- This model class will take only one parameter which is model
- The id can we generated with `Math.random` method

### UserModel:-

- The model class should only be used for inheritance. You should't be allowed to create an instance of this class.

- This class will have total 3 properties and it takes these values as parameters with this order:-
  1.  name: string;
  2.  email: string;
  3.  type: Consumer or Creator;

<h3 style="color:red;">As soon as you create an instance of the below mentioned classes you have to update the database in the appropriate keys</h3>

### CreatorModel:-

- This class will have only one propertiy which is noOfSubscribers:number.

- This class takes 2 parameters with this exact order:-

  1.  name: string
  2.  email: string

- By Default the noOfSubscribers will be 0

### ConsumerModel:-

- This class will have 2 more priperties:-

  1. isPremium: boolean;
  2. subscibedChannels: Array of number;

- This class takes the below parameters in the exact order:-

  1. name: string,
  2. email: string

- By default isPremium will be false and subscibedChannels will be an empty array

- In the subscibedChannels array you will store the Creator Ids which the Consumer has subscribed to.

### VideoModel:-

- This class will have the below properties:-

  1.  link: string;
  2.  title: string;
  3.  categories: string[];
  4.  views: number;
  5.  likes: number;
  6.  dislikes: number;
  7.  userID: number;

- This class takes the below parameters in the exact order:-

  1. link: string,
  2. title: string,
  3. categories: string[],
  4. userID: number

- By default the views, likes and dislikes will be 0.
- The userID will be the Creator's id for whom the video belongs to.

### NotificationModel:-

- The NotificationModel class will have the below properties:-

  1. title: string;
  2. description: string;
  3. userID: number;
  4. hasRead: boolean;

- The NotificationModel class only takes these values as parameters in the exact order:-

  1. title: string,
  2. description: string,
  3. userID: number,

- Here the userID is the id of the user for whom the notication belongs to

### Methods:-

Make sure whenever you use the below methods you update both the classes and the database

#### subscribe(ConsumerModel):-

- This method takes the id of the Creator class as parameter and pushes it to the subscibedChannels array

#### uploadVideo(CreatorModel):-

- This method takes the below parameters in the exact order:-
  1.  link: string,
  2.  title: string,
  3.  categories: string[]
- Create a new Instance of the VideoModel class
- For each Consumer who have subscribed to the Creator make a new notification

#### viewNotifications(ConsumerModel):-

- Return all the notifications of the Consumer which are not already read(hasRead=false).
- As soon as you return them make the hasRead to true

## Some Rules:-

1. Please don't change any of the class names
2. The parameters(if any) should follow the exact order both incase of class constructor and methods
3. All the code should be written in Typescript
4. Don't use `any` type
5. Add comments throughout your code to explain the logic behind each step

## Evaluation Criteria:-

- Correct implementation of all the classes and methods
- Proper handling of edge cases
- Following of Solid Principles
- Following Design Patterns

## General guidelines

- To check whether your implemention is passing the testcases or not use the commands in the getting started part
- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- So we request you to read the problem carefully and debug it before itself
- we also request you not just submit it last minute
  try to keep one submission at a time
