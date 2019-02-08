 import axios from 'axios';

 export const setAxiosToken = token => {
   if (token)
     axios.defaults.headers.common['Authorization'] = token;
   else
     delete axios.defaults.headers.common['Authorization'];
 }

 export const resetJSON = (timeout = 100) => {
   axios.defaults.headers.common['Content-Type'] = "multipart/form-data";
   setTimeout(() => {
     axios.defaults.headers.common['Content-Type'] = "application/json";
   }, timeout);
 }

 
 const PRODUCTION = true; 
 export const PROXY = PRODUCTION ? "https://eyedntify.herokuapp.com" :"http://localhost:5000";