import axios from "axios";

const STORE_API_BASE_URL = "http://localhost:8080/api/customerOrder";

class CustomerOrderService{
    getAllComments(stringSearch){
        var text = "";
        if(stringSearch!==""){
            text="?productId="+stringSearch;
        }
        return axios.get(STORE_API_BASE_URL+text);
    }

    addNewComment(store){
        return axios.post(STORE_API_BASE_URL, store);
    }

    getCommentById(store){
        return axios.get(STORE_API_BASE_URL + '/' + store);
    }

    updateComment(billId, store){
        return axios.put(STORE_API_BASE_URL+ '/' + billId, store);
    }

    deleteComment(store){
        return axios.delete(STORE_API_BASE_URL + '/' + store);
    }
}

export default new CustomerOrderService();