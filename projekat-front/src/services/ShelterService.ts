import {AnimalsWithBreeds} from "../models/AnimalsWithBreeds.ts";
import axios from "axios";
import {Shelter} from "../models/Shelter.ts";
import {GlobalChartEntry} from "../models/GlobalChartEntry";

export class ShelterService {
    private api_host = "http://localhost:8080";

    public getAnimalsWithBreeds() : Promise<AnimalsWithBreeds> {
        return axios({
            method: 'GET',
            url: `${this.api_host}/api/shelter/animalsBreeds`,
        }).then((animals) => animals.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public registerShelter(shelterInfo : Shelter) : Promise<string> {
        return axios({
            method: 'POST',
            url: `${this.api_host}/api/shelter/register`,
            data: shelterInfo
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public checkShelter() : Promise<boolean> {
        return axios({
            method: 'GET',
            url: `${this.api_host}/api/shelter/exists`,
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public getGlobalChart() : Promise<GlobalChartEntry[]> {
        return axios({
            method: 'GET',
            url: `${this.api_host}/api/questionnaire/global-chart`,
        }).then((chart) => chart.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public getNotifications() : Promise<any> {
        return axios({
            method: 'GET',
            url: `${this.api_host}/api/shelter/notifications`,
        }).then((notifications) => notifications.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}