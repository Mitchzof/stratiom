//Dependencies
import {
  express, Template, http, fs
} from './imports';

//import config from './config';

//Server initialization
const server = express();

server.use(express.static('dist/public'));

//Listen to all incoming requests
server.get('*', (req, res) => {
  res.send(Template());
});

//HTTP server
var httpServer = http.createServer(server);
httpServer.listen(3000);
