const express = require("express");
const http = require("http");

/* Basic Calculator API */
function add(n1, n2) {
    return n1 + n2;
}

function minus(n1, n2) {
    return n1 - n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

/* End of Basic Calculator*/

/* REST Calculator API */
function calcServer(port, isStartedCallback) {
    const app = express();
    app.get("/api/calc/add/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(add(n1, n2).toString());
    })
    app.get("/api/calc/minus/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(minus(n1, n2).toString());
    })
    app.get("/api/calc/divide/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(divide(n1, n2).toString());
    })
    app.get("/api/calc/multiply/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(multiply(n1, n2).toString());
    })

    let server = http.createServer(app);
    setTimeout(() => 
    server.listen(port, () => {
        isStartedCallback(server);
    }), 1400)
}

/* End of REST Calculator API */

module.exports = {
    add,
    minus,
    divide,
    multiply,
    calcServer
}