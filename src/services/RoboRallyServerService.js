import axios from "axios"

const ipAdress = "localhost"
const port = "8080"

export default class RoboRallyServerService {


    login(username,password) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/AssUsersController/login`,
            data: {
                "username": username,
                "password": password
            }
        })
    }

 

}
