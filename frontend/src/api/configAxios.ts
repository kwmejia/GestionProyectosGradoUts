import axios from 'axios';

const baseURL: string = "http://localhost:9091/development";

const clientHTTP = axios.create({ baseURL });
const token = 'ReactANDNodeJS4ever';
clientHTTP.defaults.headers.common['X-API'] = token;

export default clientHTTP;