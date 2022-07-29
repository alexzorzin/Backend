const express = require("express");
const { Router } = express;
const router = new Router();
const logger = require('../utils/logger');
const passport = require("passport");
const compression = require("compression");
const {
    getRoot,
    getFailSignUp,
    getLogin,
    getFailLogin,
    getSignUp,
    postSignUp,
    postLogin,
    getHome,
    logout,
    checkout
} = require('../utils/functions');
const { getInfo } = require('../controllers/info');
const { randomRoutes } = require('../controllers/random');
const authorize = require("../auth/index");

router.use(passport.session());
router.use(passport.initialize());

router.get("/", getRoot);
router.get("/failSignup", getFailSignUp);
router.get("/login", getLogin);
router.get("/failLogin", getFailLogin);
router.get("/signup", getSignUp);

router.post("/signup", postSignUp);
router.post("/login", postLogin);

router.get("/info", compression(), getInfo);

router.get("/api/random", randomRoutes);

router.get("/home", authorize, getHome);

router.post("/logout", authorize, logout);

router.get("/checkout", authorize, checkout)

router.get("*", (req, res) => {
    res.send("Ruta no existente");
    logger.warn("Ruta no existente");
});

module.exports = router;