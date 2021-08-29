import axios from 'axios';
import getUser from './GetUser';
import cookie from 'react-cookies';
const prefixUrl = 'https://pnv-ces-classwork.herokuapp.com/api';
export default async function CallAPI(endpoint, method = 'GET', body) {
  const { token } = getUser();
  const header = { Authorization: `Bearer ${token}` };
  try{
    const response=await axios({
      method,
      url: `${prefixUrl}/${endpoint}`,
      data: body,
      headers: header,
    });
    return response;
  }
  catch {
    cookie.remove('user', { path: '/' });
    window.location.assign('/login');
  }
}
