import axios from 'axios';
import getUser from '../APIService/GetUser';
const prefixUrl = 'https://pnv-ces-classwork.herokuapp.com/api';
function Call_API(endpoint, method = 'GET', body) {
  const { token } =getUser();
  return axios({
    method,
    url: `${prefixUrl}/${endpoint}`,
    data: body,
    headers: { Authorization: `Bearer ${token}` },
  });
}
export default Call_API;
