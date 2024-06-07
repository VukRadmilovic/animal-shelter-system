import {Animal} from "./Animal.ts";
import {FoodAvailableForAnimal} from "./FoodAvailableForAnimal.ts";
import {Price} from "./Price.ts";

export interface Shelter {
    name : string,
    address: string,
    moneyAvailable: number,
    capacity: number,
    animals: Animal[],
    foodAvailableForAnimals: FoodAvailableForAnimal[],
    prices: Price[]
}