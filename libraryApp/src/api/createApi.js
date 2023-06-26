import axios from 'axios';

const instance =  axios.create({
    baseURL : 'https://5191-2405-201-5c09-a85a-b8d7-1a62-2d9d-5d0d.ngrok-free.app'
});

export default instance;