const myIp = process.env.MY_IP;
const port = process.env.PORT;
export const isDev = process.env.NODE_ENV === 'development';

export const service = isDev
    ? `http://${myIp}:${port}`
    : 'https://sagoverse.herokuapp.com';
