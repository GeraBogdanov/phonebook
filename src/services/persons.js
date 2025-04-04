import axios from 'axios';
const baseUrl = '/api/phonebook';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};
const remove = (object) => {
  console.log(object)
  const request = axios.delete(`${baseUrl}/${object}`);
  return request.then((response) => {
    console.log(response);
    return response.data;
  });
};

const update = (object) => {
  console.log(object)
  const request = axios.put(`${baseUrl}/${object.id}`, object);
  return request.then((response) => response.data);
};
export default { getAll, create, remove, update };
