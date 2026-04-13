// WebSocket with Mocha and Chai testing

const WebSocket = require('ws');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../app/app');
const { expect } = chai;

chai.use(chaiHttp);

describe('WebSocket API', function () {
    let ws;

    before((done) => {
        server.listen(8080, done);
    });

    after((done) => {
        server.close(done);
    });

    it('should respond to HTTP GET request', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('WebSocket server is running');
                done();
            });
    });

    it('should send and receive WebSocket messages', function (done) {
        ws = new WebSocket('ws://localhost:8080');

        ws.on('open', () => {
            ws.send('Test Message');
        });

        ws.on('message', (message) => {
            expect(message.toString()).to.equal('Echo: Test Message');
            ws.close();
            done();
        });
    });
});