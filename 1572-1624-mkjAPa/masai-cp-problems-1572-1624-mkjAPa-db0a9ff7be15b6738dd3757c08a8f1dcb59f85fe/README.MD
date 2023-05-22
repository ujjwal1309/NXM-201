# TS LLD Parking Slot:-

## Submission Instructions [Please note]

## Maximum Marks - 17

- The Submission should not contain spaces, for example /js-101 folder/eval will not work
- Do not push node_modules and package_lock.json to github

```
 ✅ able to submit the app - 1 mark ( minimum score )
 ✅ If Everything works fine with correct params-1 - 1 mark.
 ✅ If Everything works fine with correct params-2 - 1 mark.
 ✅ If Everything works fine with correct params-3 - 1 mark.
 ✅ If Everything works fine with correct params-4 - 1 mark.
 ✅ If Everything works fine with correct params-5 - 1 mark.
 ✅ If Everything works fine with correct params-6 - 1 mark.
 ✅ If Everything works fine with correct params-7 - 1 mark.
✅ Bus Params Checking-1 - 1 marks
✅ Bus Params Checking-2 - 1 marks
✅ Bus Params Checking-3 - 1 marks
✅ Slot Params Checking - 1 marks
✅ ParkingSlot Params Checking - 1 marks
✅ AddSlot Params Checking - 1 marks
✅ AvailableSlot Params Checking - 1 marks
✅ BookSlot Params Checking - 1 marks

```

## Installation

- Use node version 16.16.0
- please make sure you do not push package-lock.json
- Download and unzip the boilerplate file and then copy the "contents" of the unzipped file in the Masai Folder.
- Navigate to the Masai Folder, in VS Code.
- Run the following commands inside,
- npm install --engine-strict

## Boilerplate:-

- Do not change the given folder structure
- inside src folder you will code.ts file that is where you need to write the code.
- In src will be a file index.ts. Please make sure this file should be always empty
- you can find the testcase under `__tests__ ` folder.

## Description:-

- Create a class Named `Vehicle`. This class will have 3 params:-

  1.  VehicleType (A Union Type of "Car", "Bike", "Bus"),
  2.  registrationNumber (Number)
  3.  color (String)

- Create 3 classes which will inherit the Vehicle class.:- `Car`, `Bike`, `Bus`.

- The above 3 classes will not have any extra property other than it's parents properties. But the `VehicleType` will have a fixed value.

```
The VehicleType of Bike class will be Bike
```

- Make sure all 3 classes will take 2 params with the below mentioned order:-

  1.  registrationNumber
  2.  color

- There will be `Slot` class which will have 2 properties:-

  1.  type(A Union Type of "Car", "Bike", "Bus")
  2.  isBooked (boolean)

- `Slot` will only take type as params. By default isBooked will be false.

- Make another class `ParkingSlot` which will have 2 properties

  1. maxLimit (Number)
  2. parkingSpots (Array of Slot)

- `ParkingSlot` will take only maxLimit as parameter & parkingSpots will be initialized with an empty array

- `ParkingSlot` will also have 3 methods:-

  1. addSlots
  2. availableSlot
  3. bookSlot

- `addSlots` takes a Slot as parameter, pushes the slot to the `parkingSpots` array if the length of `parkingSpots` is lessThan `maxLimit` and returns the length of the `parkingSpots`.

- `availableSlot` takes a VehicleType as parameter and returns the number of Slot of that type which has isBooked false.

- For a example lets say currently there are 2 Car slot and 3 Bus slot and among the 3 Bus slots one of them has isBooked true.

- In this case if the `availableSlot` method is called with `Bus` it will return 2.

- `bookSlot` takes any of the 3 Classes which inherits `Vehicle` as parameter, checks the `parkingSpots` array and tries to find a slot with same type passed as params.

- If it is able to find out then makes the isBooked true for that Slot and returns true.

- If its not able to find any such slot it returns false

## General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug before itself
- we also request you to not to just submit it last minute
- try to keep one submission at a time
