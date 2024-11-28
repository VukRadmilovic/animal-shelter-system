import dayjs from "dayjs";
import { Animal } from "./animals";

export interface PetRecommendationCounter {
  animalBreed: string;
  recommendationCount: number;
}

export interface Notification {
  text: string;
  timestamp: string;
}

export interface Report {
  adoptionCount: number;
  shelteredCount: number;
}

export interface ShelterWithMaps {
  name: string;
  address: string;
  moneyAvailable: number;
  capacity: number;
  animals: Animal[];
  foodAvailableForAnimals: { [key: string]: number };
  prices: { [key: string]: number };
}
export interface Shelter {
  name: string;
  address: string;
  moneyAvailable: number;
  capacity: number;
  animals: Animal[];
  foodAvailableForAnimals: FoodAvailableForAnimal[];
  prices: Price[];
}

export interface FoodAvailableForAnimal {
  portionCount: number;
  animalType: string;
}

export interface Price {
  animalType: string;
  pricePerPortion: number;
}

export interface Week {
  start: dayjs.Dayjs | undefined;
  end: dayjs.Dayjs | undefined;
}
