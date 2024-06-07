import {AnimalsWithBreeds} from "../models/AnimalsWithBreeds.ts";
import axios from "axios";

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
}