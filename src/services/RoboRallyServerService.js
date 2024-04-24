import axios from "axios"

const ipAdress = "localhost"
//const ipAdress = "192.168.80.33"
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

    add(city,name,duration,eliminated) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/add`,
            data: {
                "city": city,
                "name": name,               
                "eliminated":eliminated,
                "duration":duration

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


    getAllCompetitorsByDuration() {

        return axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/getAllCompetitorsByDuration`,
          
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


 
    ready(codes) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/ready?codes=${codes}`,
          
        })
    }

    start(codes) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/start?codes=${codes}`,
          
        })
    }

    finish(codes) {

        return axios({
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/DefCompetitorsController/finish?codes=${codes}`,
          
        })
    }

    getLogFileNames(id) {
        return axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/LogController/getLogFileNames`,
          
        })
    }

    getLogFile(logFileName) {
        return axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ipAdress}:${port}/LogController/getLogFile?logFileName=${logFileName}`,
          
        })
    }

}
