import chai from 'chai';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import chaiHttp from 'chai-http';
import server from '../src/server';
import config from '../src/config/config';

const mockgoose = new Mockgoose(mongoose);

chai.should();
chai.use(chaiHttp);

/**
 * Add mockTodo into storage
 */
function addTodoToStorage(name, cb) {
  chai
    .request(server)
    .post('/api/v1/todo')
    .send({ name })
    .end((err, res) => {
      if (cb) {
        cb(err, res);
      }
    });
}

describe('Todos', () => {
  before(done => {
    mongoose.disconnect();
    mockgoose.helper.reset();
    mockgoose.prepareStorage().then(() => {
      mongoose.connect(
        config.db,
        err => {
          done(err);
        }
      );
    });
  });

  describe('/GET todo', () => {
    it('it should get a empty list of todos', done => {
      chai
        .request(server)
        .get('/api/v1/todo')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').with.lengthOf(0);
          done();
        });
    });

    it('it should get a list of todos', done => {
      addTodoToStorage('Mock Todo', (err, res) => {
        chai
          .request(server)
          .get('/api/v1/todo')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array').with.lengthOf(1);
            res.body.should.to.deep.equal([res.body[0]]);
            done();
          });
      });
    });
  });

  describe('/POST todo', () => {
    it('should create a todo with a name property', done => {
      const payload = { name: 'Just another todo' };
      chai
        .request(server)
        .post('/api/v1/todo')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(payload.name);
          res.body.should.have.property('completed').eql(false);
          done();
        });
    });

    it('should not create a todo with a missing name property', done => {
      chai
        .request(server)
        .post('/api/v1/todo')
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });

  describe('/PUT todo/:id', () => {
    let todoMock;

    before(done => {
      addTodoToStorage('Mock Todo Name for Modification', (err, res) => {
        todoMock = res.body;
        done();
      });
    });

    it('should update a todo', done => {
      const update = {
        name: 'Renamed Todo',
        completed: true
      };

      chai
        .request(server)
        .put('/api/v1/todo/' + todoMock._id)
        .send(update)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a 422 status if body is missing', done => {
      chai
        .request(server)
        .put('/api/v1/todo/' + todoMock._id)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('should return a 422 status if id is wrong', done => {
      chai
        .request(server)
        .put('/api/v1/todo/A-WRONG-ID')
        .send({ name: 'Test' })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });

  describe('/DELETE todo/:id', () => {
    let todoMock;

    before(done => {
      addTodoToStorage('Mock Todo Name to delete', (err, res) => {
        todoMock = res.body;
        done();
      });
    });

    it('should delete a todo', done => {
      chai
        .request(server)
        .delete('/api/v1/todo/' + todoMock._id)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a 422 status if id is wrong', done => {
      chai
        .request(server)
        .put('/api/v1/todo/A-WRONG-ID')
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });
});
