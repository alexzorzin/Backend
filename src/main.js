const express = require('express');
const app = express();
const config = require('./options/config');
const session = require('express-session');
const logger = require('./utils/logger');
const passport = require("passport");
const { webSocket } = require('./utils/functions')
const { passportLogin, passportSignUp, passportSerialize, passportDeserialize } = require('./utils/passport');
const routes = require('./routes/routes')
const connectarDb = require('./utils/connectdb')

passportLogin()
passportSignUp()
passportSerialize()
passportDeserialize()
connectarDb()

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/public"));

app.use(
  session(config.configSession)
);

app.use("/", routes);

app.use(passport.initialize());
app.use(passport.session());

const port = 8080;
const server = app.listen(process.env.PORT || port, () => {
    logger.info(
        `Server abierto en el puerto ${port}`
    );
});

server.on('error', error => logger.error(`Error al abrir el server: ${error}`));

const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', webSocket)