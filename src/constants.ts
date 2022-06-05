export const isDev = process.env.NODE_ENV === 'development';

export const service = isDev
    ? `http://${process.env.MY_IP}:${process.env.SERVER_PORT}`
    : 'https://sagoverse.herokuapp.com';
