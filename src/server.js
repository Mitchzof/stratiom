//Dependencies
import {
  express, React, renderToString, StaticRouter, Template, routes, preload,
  reducer, createStore, Provider, matchPath, App, bodyParser, http, https,
  session, redis, connectRedis, loginSuccess, loginError
} from './imports';

//import config from './config';

//Server initialization
const server = express();

//Redis Store
/*let RedisStore = connectRedis(session);
let options = {
  host: 'localhost',
  port: 6379
}

//Express-session config
let sess = {
  store: new RedisStore(options),
  secret: 'tempsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}
if (process.env.NODE_ENV === 'production') {
  sess.cookie.secure = true;
}
server.use(session(sess));*/

//Set bodyparser and static folder
server.use(bodyParser.json());
server.use(express.static('dist/public'));

//Https redirect for production
if (process.env.NODE_ENV === 'production') {
  server.use ((req, res, next) => {
    (req.secure) ? next() : res.redirect('https://' + req.headers.host + req.url);
  });
}

//Listen to all incoming requests
server.get('*', (req, res) => {
  //Default preloading promise to resolve an empty array.
  let promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve([]);
    }, 250);
  });

  //Find the matching route and set the preloading promise if one exists.
  routes.some(route => {
    const match = matchPath(req.path, route);
    if (match) {
      if (route.loadData) {
        promise = route.loadData();
      }
    }
    return match;
  });

  //Resolve promise and load page from server.
  promise.then(data => {
    let context = {};

    //Create store and set initial state/preloaded data
    let store = createStore(reducer);
    store.dispatch(preload(data));
    //(req.session.loggedIn) ? store.dispatch(loginSuccess()) : store.dispatch(loginError('Not logged in'));

    //Render page content
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    const state = store.getState();

    res.send(
      Template(content, state)
    );
  });
});

//HTTP server
var httpServer = http.createServer(server);
httpServer.listen((process.env.NODE_ENV === 'production') ? 80 : 3000);

//HTTPS server
if (process.env.NODE_ENV === 'production') {
  var httpsServer = https.createServer({
      key: privateKey,
      cert: certificate
  }, server);
  httpsServer.listen(443);
}
