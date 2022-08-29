import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/products";

class ProductServices{
    getAllProducts(stringSearch){
        var text = "";
        if(stringSearch!==""){
            text="?productName="+stringSearch;
        }

        return axios.get(PRODUCT_API_BASE_URL+text);
    }

    getStoreProduct(stringSearch){
        var text = "";
        if(stringSearch!==""){
            text="?productName="+stringSearch;
        }
        return axios.get('http://localhost:8080/api/productStore'+text);
    }

    addNewProduct(product){
        return axios.post(PRODUCT_API_BASE_URL, product);
    }

    getProductById(product){
        return axios.get(PRODUCT_API_BASE_URL + '/' + product);
    }

    updateProduct(productId, product){
        return axios.put(PRODUCT_API_BASE_URL+ '/' + productId, product);
    }

    deleteProduct(product){
        return axios.delete(PRODUCT_API_BASE_URL + '/' + product);
    }

    getProductByStore(product){
        return axios.get(PRODUCT_API_BASE_URL + '/getAmount?storeId=' + product);
    }
}

export default new ProductServices();