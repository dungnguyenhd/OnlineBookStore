import { legacy_createStore as createStore } from "redux";
import rootred from "./main";

const store = createStore(
    rootred
);

export default store;