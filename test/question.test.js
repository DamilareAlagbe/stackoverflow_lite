let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const sandbox = require("sinon").createSandbox();
const models = require("../models");
const { questionschema } = require("../validation");

//assertion style
chai.should();
chai.use(chaiHttp);

const questionModel = {
  id: "4",
  question: "how are you?",
  user_id: 2,
};

const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0NDQwMTA5fQ.18vkUgwpoe901S-n9SWUhwpeY_AZYDdl9aAXigcd--M"
  
const invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY0MjgxOTc2fQ.jjbCHR7LiZyWs8OfERXHotSj_Zaz3lRgc8ndo4bWXP0";
describe("question Api", () => {
  // ** post a question route
  
  describe("POST /questions", () => {
    const questionEntry = {
      question: "how are you?",
    };

    before("set up", () => {
     const validateStub = sandbox.stub(questionschema,'validateAsync')
      const questiondb = sandbox.stub(models.question, "create");
      questiondb.returns(questionModel);
    });

    after("remove stub", () => {
      sandbox.restore();
    });

    it("it should post a new question", async () => {
      let response = await chai
        .request(server)
        .post("/api/v1/questions")
        .set("x-auth-token", validToken)
        .send(questionEntry);
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("id").eq("4");
      response.body.should.have.property("question").eq("how are you?");
      response.body.should.have.property("user_id").eq(2);
    });
  });
// get all questions

describe("GET /questions", () => {
    const questionEntry = [];

    before("set up", () => {
      const questiondb = sandbox.stub(models.question, "findAll");
      questiondb.returns(questionEntry);
    });

    after("remove stub", () => {
      sandbox.restore();
    });

    it("it should get all questions", async () => {
      let response = await chai
        .request(server)
        .get("/api/v1/questions/").set('x-auth-token', validToken)
        .send(questionEntry);
      response.should.have.status(200);
      response.body.should.be.an("array");
    });

});

// get question by id
describe("GET /questions/:id", () => {
    before("set up", () => {
      const userdb = sandbox.stub(models.question, "findByPk");
      userdb.withArgs(questionModel.id).returns(questionModel);
    });
  
    after("remove stub", () => {
      sandbox.restore();
    });
  
    it("it should get a  question by id", async () => {
      let response = await chai
        .request(server)
        .get("/api/v1/questions/" + questionModel.id).set('x-auth-token',validToken)
        .send();
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("id").eq("4");
      response.body.should.have.property("question").eq("how are you?");
      response.body.should.have.property("user_id").eq(2);
    });
  });

// delete question
describe("DELETE /question", () => {
    const invalidId = '0';
    const validId = '2';
    const validUserId = 2;
  
    before("Setting stubs", () => {
      const deleteQuestionStub = sandbox.stub(models.question, "destroy");
  
      deleteQuestionStub
        .withArgs({
          where: { id: validId, user_id: validUserId },
        })
        .returns(1);
      deleteQuestionStub.returns(0);
    });
  
    after("Removing stubs", () => {
      sandbox.restore();
    });
  
    // should fail if param id is invalid
    // should return 200 if id is valid
  
    it("should fail if param id is invalid", async () => {
      let response = await chai
        .request(server)
        .delete("/api/v1/questions/" + invalidId)
        .set("x-auth-token", validToken)
        .send();
  
      response.should.have.status(400);
    });
  
    it("should fail if owner id is invalid", async () => {
      let response = await chai
        .request(server)
        .delete("/api/v1/questions/" + invalidId)
        .set("x-auth-token", invalidId)
        .send();
  
      response.should.have.status(400);
    });
  
    it("should pass if owner id is valid", async () => {
      let response = await chai
        .request(server)
        .delete("/api/v1/questions/" + validId)
        .set("x-auth-token", validToken)
        .send();
  
      response.should.have.status(200);
    });

  });
})