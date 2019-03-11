const expect = require("chai").expect;
const calc = require("../calc");
const fetch = require("node-fetch");
const PORT = 1111;
const URL = `http://localhost:${PORT}/api/calc/`;
let server;

describe("Calculator API", function () {

    describe("Testing the basic Calc API", function () {
        it("Add 4 + 3 should return 7", function () {
            const result = calc.add(4, 3);
            expect(result).to.be.equal(7);
        })
        it("Minus 4 - 2 should return 2", function () {
            const result = calc.minus(4, 2);
            expect(result).to.be.equal(2);
        })
        it("Divide 6 / 2 should return 3", function () {
            const result = calc.divide(6, 2);
            expect(result).to.be.equal(3);
        })
        it("Multiply 7 * 2 should return 14", function () {
            const result = calc.multiply(7, 2);
            expect(result).to.be.equal(14);
        })
    })
    describe("Testing the REST Calc API", function () {
        before(function (done) {
            calc.calcServer(PORT, function (s) {
                server = s;
                done();
            })
            console.log("before");
        })
        after(function () {
            server.close();
            console.log("after");
        })
        it("Add 4 + 3 should return 7", async function () {
            const res = await fetch(URL + "add/4/3").then(r => r.text());
            expect(res).to.be.equal('7');
        })
        it("Minus 4 - 2 should return 2", async function () {
            const res = await fetch(URL + "minus/4/2").then(r => r.text());
            expect(res).to.be.equal('2');
        })
        it("Divide 6 / 2 should return 3", async function () {
            const res = await fetch(URL + "divide/6/2").then(r => r.text());
            expect(res).to.be.equal('3');
        })
        it("Multiply 7 * 2 should return 14", async function () {
            const res = await fetch(URL + "multiply/7/2").then(r => r.text());
            expect(res).to.be.equal('14');
        })
    })
})

