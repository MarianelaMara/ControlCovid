import axios from 'axios';

const ENDPOINT_PATH = 'https://reqres.in/api/';

export default {
  login(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + "login", user);
  }
}