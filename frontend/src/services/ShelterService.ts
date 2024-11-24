import { AnimalsWithBreeds } from "../models/AnimalsWithBreeds.ts";
import axios from "axios";
import { Shelter } from "../models/types.ts";
import { PetRecommendationCounter } from "../models/types.ts";
import { Animal } from "../models/animals.ts";
import { Report } from "../models/types.ts";
import { ShelterWithMaps } from "../models/types.ts";
import { Notification } from "../models/types.ts";
import { AnimalWithBreed } from "../models/animals.ts";

interface AnimalsWithBreeds {
  animals: AnimalWithBreed[];
}

export class ShelterService {
  private api_host = "http://localhost:8080";

  public getAnimalsWithBreeds(): Promise<AnimalsWithBreeds> {
    return axios({
      method: "GET",
      url: `${this.api_host}/api/shelter/animalsBreeds`,
    })
      .then((animals) => animals.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public registerShelter(shelterInfo: Shelter): Promise<string> {
    return axios({
      method: "POST",
      url: `${this.api_host}/api/shelter/register`,
      data: shelterInfo,
    })
      .then((success) => success.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public checkShelter(): Promise<boolean> {
    return axios({
      method: "GET",
      url: `${this.api_host}/api/shelter/exists`,
    })
      .then((success) => success.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public getGlobalChart(): Promise<{
    recommendations: PetRecommendationCounter[];
    top5: PetRecommendationCounter[];
  }> {
    return axios({
      method: "GET",
      url: `${this.api_host}/api/questionnaire/global-chart`,
    })
      .then((chart) => chart.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public getNotifications(): Promise<Notification[]> {
    return axios({
      method: "GET",
      url: `${this.api_host}/api/shelter/notifications`,
    })
      .then((notifications) => notifications.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public getShelter(): Promise<ShelterWithMaps> {
    return axios({
      method: "GET",
      url: `${this.api_host}/api/shelter/`,
    })
      .then((shelter) => shelter.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public depositMoney(amount: number): Promise<void> {
    return axios({
      method: "PUT",
      url: `${this.api_host}/api/shelter/deposit/` + amount,
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public shelterAnimal(animal: Animal): Promise<void> {
    return axios({
      method: "POST",
      url: `${this.api_host}/api/shelter/shelter-animal`,
      data: animal,
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public adoptAnimal(animal: Animal): Promise<void> {
    return axios({
      method: "POST",
      url: `${this.api_host}/api/shelter/adopt-animal`,
      data: animal,
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public getDailyReport(date: string): Promise<Report> {
    return axios({
      method: "GET",
      url: `${this.api_host}/api/shelter/daily-report/` + date,
    })
      .then((report) => report.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public getWeeklyReport(date: string): Promise<Report> {
    return axios({
      method: "GET",
      url: `${this.api_host}/api/shelter/weekly-report/` + date,
    })
      .then((report) => report.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public getMonthlyReport(date: string): Promise<Report> {
    return axios({
      method: "GET",
      url: `${this.api_host}/api/shelter/monthly-report/` + date,
    })
      .then((report) => report.data)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public purchaseFood(animalType: string, quantity: number): Promise<void> {
    return axios({
      method: "POST",
      url: `${this.api_host}/api/shelter/food-purchase`,
      data: {
        animalType: animalType,
        quantity: quantity,
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}
