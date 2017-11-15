
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Users', () => {
    beforeEach((done) => { 
        User.remove({}, (err) => { 
           done();         
        });     
    });

    describe('/POST user', () => {
        it('it should POST a user and return a userID', (done) => {
        let user = [{
            name: 'Milad',
            email: "milad@s.com",
        }];
        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('userID');
                done();
            });
        });

    });

    describe('/POST/:userid Reminder', () => {
        it('it should POST reminder for an user', (done) => {
        let reminder = [{
            title: 'ITMD562',
            description: "Homework",
        }];
        chai.request(server)
            .post('/users/' + '1234567890' + '/reminders')
            .send(reminder)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });

    });

    describe('/GET users', () => {
        it('it should GET all the Users', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
                });
        });
    });

    describe('/GET/:userid user', () => {
        it('it should GET a single User', (done) => {
            id = '1234567890';
            let user = new User({name: 'nas', email: 'a@a.com', userid: id});
            user.save((err, user) =>{
                chai.request(server)
                .get('/users/' + id)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                done();
                });
            });
        });
    });

    describe('/GET/:userid/reminders Reminders', () => {
        it('it should GET all Reminders for a single User', (done) => {
            id = '1234567890';
            let user = new User({name: 'nas', email: 'a@a.com', userid: id , reminder:[{reminderid: '0987654321', title: 'ITMD562', Description:'homework', created:'10142017'}]});
            user.save((err, user) =>{
                chai.request(server)
                .get('/users/' + id + '/reminders')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
                });
            });
        });
    });

    describe('/GET/:userid/reminders/:reminderid Reminder', () => {
        it('it should GET a Reminders for a single User', (done) => {
            id = '1234567890';
            let user = new User({name: 'nas', email: 'a@a.com', userid: id , reminder:[{reminderid: '0987654321', title: 'ITMD562', Description:'homework', created:'10142017'}]});
            user.save((err, user) =>{
                chai.request(server)
                .get('/users/' + id + '/reminders/' + '0987654321')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
                });
            });
        });
    });

    describe('/DELETE/:userid User', () => {
        it('it should DELETE a user given the userid', (done) => {
          let user = new User({name: "Alex", email: "b@b.com"});
        
          user.save((err, user) => {
                  chai.request(server)
                  .delete('/users/' + '1234567890')
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Cannot find any User with the specified userID.');
                    done();
                  });
            });
        });
    });

    describe('/DELETE/:userid/reminders Reminders', () => {
        it('it should DELETE all reminders of a given user', (done) => {
          let user = new User({name: "Alex", email: "b@b.com"});
          user.save((err, user) => {
                  chai.request(server)
                  .delete('/users/' + '1234567890' + '/reminders')
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('user not found');
                    done();
                  });
            });
        });
    });

    describe('/DELETE/:userid/reminders/:reminderid Reminder', () => {
        it('it should DELETE a reminder of a given user', (done) => {
          let user = new User({name: "Alex", email: "b@b.com"});
          user.save((err, user) => {
                  chai.request(server)
                  .delete('/users/' + '1234567890' + '/reminders/' + '0987654321')
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Not Found.');
                    done();
                  });
            });
        });
    });

    
});