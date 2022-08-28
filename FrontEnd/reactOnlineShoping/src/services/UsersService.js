import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/users";

class UsersService{
    getUserById(id){
        return axios.get(API_BASE_URL + '/' + id);
    }
}

export default new UsersService();