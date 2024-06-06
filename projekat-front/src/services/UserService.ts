import {UserCredentials} from "../models/UserCredentials";
import axios from "axios";
import {User} from "../models/User.ts";
import {NewUser} from "../models/NewUser.ts";

export class UserService {

    private api_host = "http://localhost:8080";
    public loginUser(userCredentials: UserCredentials): Promise<void> {
        return axios({
            method: 'POST',
            url: `${this.api_host}/api/user/login`,
            data: userCredentials
        }).then((response) => {
            const user: User = response.data;
            sessionStorage.setItem("full_name", user.name + " " + user.surname);
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public signOut(): void {
        sessionStorage.removeItem('full_name');
    }

    public registerUser(newUser: NewUser): Promise<void> {
        return axios({
            method: 'POST',
            url: `${this.api_host}/api/user/new`,
            data: newUser,
        }).then(() => {}).catch((err) => {
            console.log(err);
            throw err;
        });
    }

}
