import axios from "axios";

const STORE_API_BASE_URL = "http://localhost:8080/api/stores";

class StoreService{
    getAllStores(stringSearch){
        var text = "";
        if(stringSearch!==""){
            text="?storeName="+stringSearch;
        }
        return axios.get(STORE_API_BASE_URL+text);
    }

    addNewStore(store){
        return axios.post(STORE_API_BASE_URL, store);
    }

    getStoreById(store){
        return axios.get(STORE_API_BASE_URL + '/' + store);
    }

    updateStore(billId, store){
        return axios.put(STORE_API_BASE_URL+ '/' + billId, store);
    }

    deleteStore(store){
        return axios.delete(STORE_API_BASE_URL + '/' + store);
    }
}

export default new StoreService();