import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deleteId = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const numberService = {
  getAll: getAll,
  create: create,
  update: update,
  deleteId,
};

export default numberService;
