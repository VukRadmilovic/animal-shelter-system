import { UserCredentials } from "../models/users.ts";
import axios from "axios";
import { NewUser } from "../models/users.ts";

export class UserService {
  private api_host = "http://localhost:8080";
  public loginUser(userCredentials: UserCredentials): Promise<void> {
    return axios({
      method: "POST",
      url: `${this.api_host}/api/user/login`,
      data: userCredentials,
    })
      .then((response) => {
        sessionStorage.setItem("full_name", response.data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  public signOut(): void {
    sessionStorage.removeItem("full_name");
  }

  public registerUser(newUser: NewUser): Promise<void> {
    return axios({
      method: "POST",
      url: `${this.api_host}/api/user/new`,
      data: newUser,
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}
