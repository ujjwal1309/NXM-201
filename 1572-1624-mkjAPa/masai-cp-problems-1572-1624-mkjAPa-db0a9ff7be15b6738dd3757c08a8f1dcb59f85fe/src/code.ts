type VehicleType = "Car" | "Bike" | "Bus";

export class Vehicle {
  constructor(
    public VehicleType: VehicleType,
    public registrationNumber: number,
    public color: string
  ) {}
}

export class Bike extends Vehicle {
  constructor(registrationNumber: number, color: string) {
    super("Bike", registrationNumber, color);
  }
}
export class Bus extends Vehicle {
    constructor(registrationNumber: number, color: string) {
        super("Bus", registrationNumber, color);
      }
}
export class Car extends Vehicle {
    constructor(registrationNumber: number, color: string) {
        super("Car", registrationNumber, color);
      }
}

export class Slot {
    isBooked: boolean;

    constructor(public VehicleType: VehicleType) {
      this.isBooked = false;
    }
}

export class ParkingSlot {
    parkingSpots: Slot[];
    constructor(public maxLimit: number) {
        this.parkingSpots = [];
    }

  addSlots(slot: Slot): number {
    if (this.parkingSpots.length < this.maxLimit) {
      this.parkingSpots.push(slot);
    }
    return this.parkingSpots.length;
  }

  
  availableSlot(vehicleType: VehicleType): number {
    let count = 0;
    for (const spot of this.parkingSpots) {
        if (spot.VehicleType === vehicleType && !spot.isBooked) {
        count++;
      }
    }
    return count;
  }

  bookSlot(vehicle: Car | Bike | Bus): boolean {
    for (const spot of this.parkingSpots) {
      if (
        (vehicle instanceof Car && spot.VehicleType === "Car") ||
        (vehicle instanceof Bike && spot.VehicleType === "Bike") ||
        (vehicle instanceof Bus && spot.VehicleType === "Bus")
      ) {
        if (!spot.isBooked) {
          spot.isBooked = true;
          return true;
        }
      }
    }
    return false;
  }
}
