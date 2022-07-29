const { fork } = require("child_process");

const randomRoutes = (req, res) => {
    let cant = 100000000;
    if (req.query.cant) {
        cant = req.query.cant;
    }
    const random = fork("./helpers/randomize");
    random.send(cant);
    random.on("message", (veces) => {
        res.send(
            `LISTADO DE NÚMEROS Y CUANTAS VECES HAN SALIDO\n<pre>${JSON.stringify(
                veces,
                null,
                2
            )}</pre>`
        );
    });
};

module.exports =  { randomRoutes }
