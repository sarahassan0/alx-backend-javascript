const expect = require('chai').expect;
const request = require('request');

describe('GET /', () => {
  it('should return a string', (done) => {
    request.get('http://localhost:7865', (err, res, body) => {
      if (err) throw err;
      expect(body).to.be.equal('Welcome to the payment system');
      expect(res.statusCode).to.be.equal(200);
      expect(typeof body).to.be.equal('string');
      done();
    });
  });
});

describe('GET /cart/:id', () => {
  it('should return a string', (done) => {
    request.get('http://localhost:7865/cart/12', (err, res, body) => {
      if (err) throw err;
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  it('should return a string', (done) => {
    request.get('http://localhost:7865/cart/12', (err, res, body) => {
      expect(body).to.be.equal('Payment methods for cart 12');
      done();
    });
  });

  it('should return a string', (done) => {
    request.get('http://localhost:7865/cart/TutTrue', (err, res, body) => {
      if (err) throw err;
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});

describe('GET /available_payments', () => {
  it('should return an object', (done) => {
    request.get(
      'http://localhost:7865/available_payments',
      (err, res, body) => {
        if (err) throw err;
        expect(res.statusCode).to.be.equal(200);
        expect(body).to.be.deep.equal(
          JSON.stringify({
            payment_methods: {
              credit_cards: true,
              paypal: false,
            },
          }),
        );
        done();
      },
    );
  });
});

describe('POST /login', () => {
  it('should return a string', (done) => {
    request.post(
      { url: 'http://localhost:7865/login', json: { userName: 'Sarah' } },
      (err, res, body) => {
        if (err) throw err;
        expect(res.statusCode).to.be.equal(200);
        expect(body).to.be.equal('Welcome Sarah');
        done();
      },
    );
  });
});
