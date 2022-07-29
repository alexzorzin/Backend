const logger = require("../utils/logger");
const passport = require("passport");
const { messages, messagesApi, lastMessage } = require('./messages');
const { products, productsApi, lastProduct } = require('./products');
const nodemailer = require('nodemailer');
// const twilio = require('twilio');

const getRoot = async (req, res) => {
    res.render("pages/signup");
};

const getFailSignUp = async (req, res) => {
    res.render("pages/failSignup");
};

const getLogin = (req, res) => {
    logger.info(`Yendo a login`);
    res.render("pages/login");
};

const getFailLogin = async (req, res) => {
    res.render("pages/failLogin");
};

const getSignUp = async (req, res) => {
    logger.info(`Yendo a register`);
    res.render("pages/signup");
};

const postSignUp = passport.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/failSignup",
});

const postLogin = passport.authenticate("local-login", {
    successRedirect: "/home",
    failureRedirect: "/failLogin",
});

const logout = (req, res) => {
    if (req.user) {
        nameUser = req.user.username;
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
        });
        res.render("pages/logout", { nameUser });
    }
};

let selectedProducts = [];
let totalPrice = [];

const webSocket = (socket) => {
    logger.info('Usuario conectado');
    socket.on('selectedProducts', data => {
        selectedProducts = [];
        selectedProducts.push(data);
    })
    socket.on('totalPrice', data => {
        totalPrice = [];
        totalPrice.push(data);
    })
}

let clientInfo = [];
const checkout = (req, res) => {
    if (req.user) {
        res.render("pages/checkout", {
            nameUser: req.user.username,
            selectedProducts: selectedProducts || [0],
            total: [selectedProducts[0].reduce((acc, el) => acc + (el.price * el.cantidad), 0)] || [0]
        });
    }
    if (req.query.nombre !== undefined) {
        clientInfo.push({
            nombre: `${req.query.nombre}`,
            mail: `${req.query.mail}`
        });

        function createSendMail(mailConfig) {
            const transporter = nodemailer.createTransport(mailConfig);

            return function sendEmail({ to, subject, text, html, attachments }) {
                const mailOptions = { from: mailConfig.auth.user, to, subject, text, html, attachments };
                return transporter.sendMail(mailOptions);
            }
        }

        function createSendMailEthereal() {
            return createSendMail({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'ezequiel67@ethereal.email',
                    pass: 'fwnh2RXbS4EwcgZPtP'
                }
            })
        }

        const sendMail = createSendMailEthereal();

        const cuentaPrueba = 'ezequiel67@ethereal.email';
        const asunto = process.argv[2] || `${clientInfo[0].nombre} - ${clientInfo[0].mail} ha hecho un pedido.`;
        const mensajeHtml = process.argv[3] || `<h1>${JSON.stringify(selectedProducts[0])}</h1>`
        const rutaAdjunto = process.argv[4];
        const adjuntos = [];

        if (rutaAdjunto) {
            adjuntos.push({ path: rutaAdjunto })
        }

        const info = sendMail({
            to: cuentaPrueba,
            subject: asunto,
            html: mensajeHtml,
            attachments: adjuntos
        });

        logger.info(info);


        // //! ENVIO WPP
        // const accountSid = 'ACdbe51c39c0edaf22200bfa3f06ae46dc';
        // const authToken = '4388238b017fe886908e59597c03f093';

        // const client = twilio(accountSid, authToken);

        // const options = {
        //     body: `${JSON.stringify(selectedProducts[0])}`,
        //     mediaUrl: ['https://lanacion.com.ec/wp-content/uploads/2019/12/logos-coderhouse-01.png'],
        //     from: process.argv[2] || 'whatsapp:+14155238886',
        //     to: process.argv[3] || 'whatsapp:+14155238886'
        // };

        // const message = client.messages.create(options);
        // logger.info(message);
    }
};

lastMessage()

lastProduct()

const getHome = async (req, res) => {
    if (req.query.title !== undefined) {
        products[0].push({ "title": `${req.query.title}`, "price": req.query.price, "thumbnail": `${req.query.thumbnail}` });
        productsApi.addElements({ "title": `${req.query.title}`, "price": req.query.price, "thumbnail": `${req.query.thumbnail}` });
        console.log(products[0])
    }
    if (req.query.id !== undefined) {
        messages[0].push({
            author: {
                id: `${req.query.id}`,
                nombre: `${req.query.nombre}`,
                apellido: `${req.query.edad}`,
                edad: `${req.query.id}`,
                alias: `${req.query.alias}`,
                date: `${req.query.date}`,
                avatar: `${req.query.avatar}`,
            },
            text: `${req.query.text}`
        });
        messagesApi.addElements({
            author: {
                id: `${req.query.id}`,
                nombre: `${req.query.nombre}`,
                apellido: `${req.query.edad}`,
                edad: `${req.query.id}`,
                alias: `${req.query.alias}`,
                date: `${req.query.date}`,
                avatar: `${req.query.avatar}`,
            },
            text: `${req.query.text}`
        });
        console.log(messages[0])
    }
    if (req.user) {
        res.render("pages/home", {
            nameUser: req.user.username,
            products: products[0],
            chat: messages
        });
    }
};

module.exports = {
    getRoot,
    getFailSignUp,
    getLogin,
    getFailLogin,
    getSignUp,
    postSignUp,
    postLogin,
    getHome,
    logout,
    checkout,
    webSocket, selectedProducts, totalPrice
}