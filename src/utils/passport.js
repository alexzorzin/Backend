const User = require("../repositories/Users")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const logger = require('./logger');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
// const twilio = require('twilio');

function passportLogin() {
    passport.use(
        "local-login",
        new LocalStrategy((username, password, done) => {
            User.findOne({ username }, (err, user) => {
                if (err) return done(err);
                if (!user) {
                    logger.error("Usuario inexistente");
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    logger.error("Contraseña incorrecta");
                    return done(null, false);
                }
                return done(null, user);
            }).clone();
        })
    );
}

function passportSignUp() {
    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                passReqToCallback: true,
            },
            async (req, username, password, done) => {
                await User.findOne({ username: username }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        logger.error(`El nombre de usuario ${username} ya está tomado`);
                        return done(null, false);
                    }
                    const newUser = {
                        username: req.body.username,
                        password: createHash(password),
                    };
                    User.create(newUser, (err, userWithId) => {
                        if (err) {
                            return done(err);
                        } else {
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
                            const asunto = process.argv[2] || 'nuevo registro';
                            const mensajeHtml = process.argv[3] || `<div>
              <p>usuario:${username}</p>
              <p>contraseña:${password}</p>
              </div>`
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
                            return done(null, userWithId);
                        }
                    });
                }).clone();
            }

        )
    );
}

function passportSerialize() {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
}

function passportDeserialize() {
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

function isValidPassword(user, password) {
    logger.info(`Comparando tu contraseña: ${password} con: ${user.password}`);

    return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = {
    passportLogin, passportSignUp, passportSerialize, passportDeserialize
}