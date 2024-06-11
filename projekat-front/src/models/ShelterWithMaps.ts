import {Animal} from "./Animal.ts";

export interface ShelterWithMaps {
    name : string,
    address: string,
    moneyAvailable: number,
    capacity: number,
    animals: Animal[],
    foodAvailableForAnimals: { [key: string]: number},
    prices: { [key: string]: number}
}