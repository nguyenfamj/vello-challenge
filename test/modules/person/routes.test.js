import test, { describe } from 'node:test';
import assert from 'node:assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/server.js';
// TODO: (optional) Tests using HTTP requests

chai.use(chaiHttp);

describe('Routes', () => {
  describe('Person route with CRUD operation', () => {
    test('POST /person create new person', () => {
      chai
        .request(server)
        .post('/person')
        .send({
          name: 'Nguyen Pham',
          age: 21,
          address: 'Mikkikatu',
          city: 'Helsinki',
        })
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.status, 'success');
          assert.equal(res.body.data.name, 'Nguyen Pham');
          assert.equal(res.body.data.id, 1);

          id = res.body.data.id;
        });
    });

    test('GET /person get persons with limit and offsets', () => {
      chai
        .request(server)
        .get('/person')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.status, 'success');
          // The mock database has only one record
          assert.equal(res.body.data.length, 1);
        });
    });

    test(`GET /person/:id get person with unique id`, () => {
      chai
        .request(server)
        .get(`/person/1`)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.status, 'success');
          assert.equal(res.body.data.name, 'Nguyen Pham');
        });
    });

    test('PUT /person/:id modify person data', () => {
      chai
        .request(server)
        .put(`/person/1`)
        .send({ age: 30 })
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.status, 'success');
        });
      chai
        .request(server)
        .get(`/person/1`)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.status, 'success');
          assert.equal(res.body.data.name, 'Nguyen Pham');
          assert.equal(res.body.data.age, 30);
        });
    });

    test('DELETE /person/:id delete the person record', () => {
      chai
        .request(server)
        .delete('/person/1')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.status, 'success');
        });
    });
  });
});
