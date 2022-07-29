require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("./ecommerce-ba45b-firebase-adminsdk-wjshn-62acc6ed1f.json");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const MongoStore = require("connect-mongo");
const config = {
  sqlite3: {
      client: 'sqlite3',
      connection: {
          filename: `./DB/ecommerce.sqlite`,
      },
      useNullAsDefault: true
  },
  mariaDB: {
      client: "mysql",
      connection: {
          host: "127.0.0.1",
          user: "root",
          password: "",
          database: "tiendarg"
      }
  },
  mongooseProducts: {
      title: String,
      price: Number,
      thumbnail: String
  },
  mongooseMessages: {
      author: String,
      text: String,
      date: String
  },
  firebase: {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://ecommerce-ba45b.firebaseio.com'
  },
    URL_MONGODB: process.env.URL_MONGODB || "mongodb+srv://aleexz:caca12345@cluster0.wohmi.mongodb.net/process?retryWrites=true&w=majority",
    configSession: {
        store: MongoStore.create({
            mongoUrl:"mongodb+srv://aleexz:caca12345@cluster0.wohmi.mongodb.net/process?retryWrites=true&w=majority",
            mongoOptions: advancedOptions,
        }),
        secret: "secreto",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 600000 },
    }
};
module.exports = config;