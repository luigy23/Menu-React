import io from 'socket.io-client';

const apisocket = process.env.REACT_APP_SOCKET;
const ioSocket = io(apisocket)
export { ioSocket }