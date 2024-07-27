import axios from "axios";

export const $axios = axios.create({
    baseURL: "https://dev-su.eda1.ru/test_task",
});