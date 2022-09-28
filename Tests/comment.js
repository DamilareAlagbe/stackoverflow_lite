let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const sandbox = require("sinon").createSandbox();
const models = require("../models");
const { commentschema } = require("../validation");


//assertion style
chai.should();
chai.use(chaiHttp);

const commentModel ={
    id : 1,
    comment : 'A good job',
    user_id : 7,
    answer_id : 2,
  }  
const validToken =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY0MTM4OTc4fQ.VHPWsLQYyUzta-4zxba8xvJ7Mt-fRakm2CjnCqDfCrI";

const invalidToken = "sjnuhiuwhuwhudhuuduggadyugyhjdqbjbjqdgy"


describe('Comment Api', ()=>{
    describe('POST /comment', ()=>{
before('add stub', ()=>{
   validatedb = sandbox.stub(commentschema,'validateAsync')
   commentdb =  sandbox.stub(models.comment,'create')
   commentdb.returns(commentModel)
})

after('remove stub', ()=> {
    sandbox.restore()
})
it("should fail if invalid token is passed ", async () => {
    let response = await chai
      .request(server)
      .post(`/answer/${commentModel.answer_id}/comment`)
      .set("x-auth-token", invalidToken)
      .send();

    response.should.have.status(400);
  });

it('should add a new comment', async ()=>{
    let commentSample = {
        comment : 'This is a good one'
    }
    let response = await chai
    .request(server)
    .post(`/answer/${commentModel.answer_id}/comment`).set('x-auth-token',validToken)
    .send(commentSample) 
    response.should.have.status(200)
    response.body.should.be.a('object')
    response.body.should.have.property('comment').eq('A good job')

})
    })

    // get a comment
    describe('GET /comment', ()=>{
        let allComment = []
    
            before('add stub', ()=>{
               answerId = '2'
               commentdb =  sandbox.stub(models.comment,'findAll')
               commentdb.withArgs({where : {answer_id :answerId}})
               commentdb.returns(allComment)
            })
            
            after('remove stub', ()=> {
                sandbox.restore()
            })
    
            it("should fail if invalid token is passed ", async () => {
                let response = await chai
                  .request(server)
                  .get(`/answer/${commentModel.answer_id}/comment`)
                  .set("x-auth-token", invalidToken)
                  .send(allComment);
                response.should.have.status(400);
              });
            

            it("should get all comments to an answer ", async () => {
                let response = await chai
                  .request(server)
                  .get(`/answer/${commentModel.answer_id}/comment`)
                  .set("x-auth-token", validToken)
                  .send(allComment);
            
                response.should.have.status(200)
                response.body.should.be.an('array')
              });
            
           
                })
})
