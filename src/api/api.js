import axios from "axios";
export const getListUser = (page) =>
  axios.get(`https://reqres.in/api/users?page=${page}?`);
export const createUser = (name, job) =>
  axios.post(`https://reqres.in/api/users`, {
    name: { name },
    job: { job },
  });
