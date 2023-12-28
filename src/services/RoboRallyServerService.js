import axios from "axios"

const ipAdress = "192.168.80.103"
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

    add(city,name,duration,startTime,stopTime,eliminated) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/add`,
            data: {
                "city": city,
                "name": name,               
                "eliminated":eliminated

            }
        })
    }

    getAllCompetitors() {

        return axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/getAllCompetitors`,
          
        })
    }

    deleteById(id) {

        return axios({
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/deleteById?id=${id}`,
          
        })
    }

    update(id,city,name,eliminated) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/update`,
            data: {
                "id":id,
                "city": city,
                "name": name,             
                "eliminated":eliminated

            }
        })
    }

    getById(id) {

        return axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/getById?id=${id}`,
          
        })
    }

    updateStartTimeById(id,startTime) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/updateStartTimeById?id=${id}&startTime=${startTime}`,
          
        })
    }


    updateStopTimeById(id,stopTime) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/updateStopTimeById?id=${id}&stopTime=${stopTime}`,
          
        })
    }

}
