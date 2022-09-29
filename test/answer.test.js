let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const sandbox = require("sinon").createSandbox();
const models = require("../models");
const { answerschema } = require("../validation");

//assertion style
chai.should();
chai.use(chaiHttp);

const answerModel = {
  answer: "nice one!",
  id: 1,
  user_id: 2,
  question_id: 2,
  upvote: 0,
  downvote: 0,
};

const questionModel = {
  question: "how are you?",
  id: 2,
  user_id: 1,
};

const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0NDQwMTA5fQ.18vkUgwpoe901S-n9SWUhwpeY_AZYDdl9aAXigcd--M";

describe("answer Api", () => {
  // ** post a question route
  //
  describe("POST /answer", () => {
    const answerEntry = {
      answer: "nice one!",
    };

    before("set up", () => {
      const validateStub = sandbox.stub(answerschema, "validateAsync");
      const answerdb = sandbox.stub(models.answer, "create");
      answerdb.returns(answerModel);
    });

    after("remove stub", () => {
      sandbox.restore();
    });

    it("it should post a new answer", async () => {
      let response = await chai
        .request(server)
        .post(`/api/v1/questions/${answerModel.question_id}/answer`)
        .set("x-auth-token", validToken)
        .send(answerEntry);
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("id").eq(1);
      response.body.should.have.property("answer").eq("nice one!");
      response.body.should.have.property("user_id").eq(2);
    });
  });

  //get all answers to a question
  describe("Get /answer", () => {
    const answerEntry = [];

    before("set up", () => {
      const answerdb = sandbox.stub(models.answer, "findAll");
      answerdb
        .withArgs({ where: { question_id: answerModel.question_id } })
        .returns(answerEntry);
    });

    after("remove stub", () => {
      sandbox.restore();
    });

    it("should get all answer to a question", async () => {
      let response = await chai
        .request(server)
        .get(`/api/v1/questions/${answerModel.question_id}/answer`)
        .set("x-auth-token", validToken)
        .send(answerEntry);
      response.should.have.status(200);
      response.should.be.a("object");
    });
  });

  //upvote an answer
  describe("put /answer/upvote", () => {
    let id = "1";
    const answerEntry = [1];

    before("set up", () => {
      const answerdb = sandbox.stub(models.answer, "findOne");
      answerdb
        .withArgs({ attributes: ["upvote"], where: { id } })
        .returns(answerModel);
      const resultVote = sandbox.stub(models.answer, "update");
      resultVote
        .withArgs({ upvote: answerModel.upvote + 1 }, { where: { id } })
        .returns(answerEntry);
    });

    after("remove stub", () => {
      sandbox.restore();
    });

    it("should upvote an answer", async () => {
      let response = await chai
        .request(server)
        .put("/api/v1/answer/1/upvote")
        .set("x-auth-token", validToken)
        .send(answerModel);
      response.should.have.status(200);
    });
  });

  // downvote an answer
  describe("put /answer/downvote", () => {
    let id = "1";
    const answerEntry = [1];

    before("set up", () => {
      const answerdb = sandbox.stub(models.answer, "findOne");
      answerdb
        .withArgs({ attributes: ["downvote"], where: { id } })
        .returns(answerModel);
      const resultVote = sandbox.stub(models.answer, "update");
      resultVote
        .withArgs({ downvote: answerModel.downvote + 1 }, { where: { id } })
        .returns(answerEntry);
    });

    after("remove stub", () => {
      sandbox.restore();
    });

    it("should upvote an answer", async () => {
      let response = await chai
        .request(server)
        .put("/api/v1/answer/1/downvote")
        .set("x-auth-token", validToken)
        .send(answerModel);
      response.should.have.status(200);
    });
  });

  // accept an answer
  describe("put /answer/accept", () => {
    const answerEntry = [1];
    let answer_id = "1";
    let user_id = 2;

    before("set up", () => {
      const answerdb = sandbox.stub(models.answer, "findByPk");
      answerdb.withArgs(answer_id).returns(answerModel);
      const questiondb = sandbox.stub(models.question, "findOne");
      questiondb
        .withArgs({ where: { id: answerModel.question_id, user_id } })
        .returns(questionModel);
      const resultVote = sandbox.stub(models.answer, "update");
      resultVote
        .withArgs({ accepted_answer: true }, { where: { id: answer_id } })
        .returns(answerEntry);
    });

    after("remove stub", () => {
      sandbox.restore();
    });

    it("should accept an answer", async () => {
      let response = await chai
        .request(server)
        .put("/api/v1/answer/1/accept")
        .set("x-auth-token", validToken)
        .send(answerModel);
      response.should.have.status(204);
    });
  });
});
