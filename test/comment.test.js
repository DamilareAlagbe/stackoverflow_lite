let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const sandbox = require("sinon").createSandbox();
const models = require("../models");
const { commentschema } = require("../validation");

//assertion style
chai.should();
chai.use(chaiHttp);

const commentModel = {
  id: 1,
  comment: "A good job",
  user_id: 7,
  answer_id: 2,
};
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY0MTM4OTc4fQ.VHPWsLQYyUzta-4zxba8xvJ7Mt-fRakm2CjnCqDfCrI";

const invalidToken = "sjnuhiuwhuwhudhuuduggadyugyhjdqbjbjqdgy";

describe("Comment Api", () => {
  describe("POST /comment", () => {
    before("add stub", () => {
      validatedb = sandbox.stub(commentschema, "validateAsync");
      commentdb = sandbox.stub(models.comment, "create");
      commentdb.returns(commentModel);
    });

    after("remove stub", () => {
      sandbox.restore();
    });
    it("should fail if invalid token is passed ", async () => {
      let response = await chai
        .request(server)
        .post(`Api/v1/answer/${commentModel.answer_id}/comment`)
        .set("x-auth-token", invalidToken)
        .send();

      response.should.have.status(400);
    });

    it("should add a new comment", async () => {
      let commentSample = {
        comment: "This is a good one",
      };
      let response = await chai
        .request(server)
        .post(`Api/v1/answer/${commentModel.answer_id}/comment`)
        .set("x-auth-token", validToken)
        .send(commentSample);
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("comment").eq("A good job");
    });
  });

  // get comments
  describe("GET /comment", () => {
    let allComment = [];

    before("add stub", () => {
      answerId = "2";
      commentdb = sandbox.stub(models.comment, "findAll");
      commentdb.withArgs({ where: { answer_id: answerId } });
      commentdb.returns(allComment);
    });

    after("remove stub", () => {
      sandbox.restore();
    });

    it("should fail if invalid token is passed ", async () => {
      let response = await chai
        .request(server)
        .get(`Api/v1/answer/${commentModel.answer_id}/comment`)
        .set("x-auth-token", invalidToken)
        .send(allComment);
      response.should.have.status(400);
    });

    it("should get all comments to an answer ", async () => {
      let response = await chai
        .request(server)
        .get(`Api/v1/answer/${commentModel.answer_id}/comment`)
        .set("x-auth-token", validToken)
        .send(allComment);

      response.should.have.status(200);
      response.body.should.be.an("array");
    });
  });
  
  // delete comment
  describe("DELETE /comment", () => {
    const id = 3;
    const validId = "2";
    const invalidId = 100;

    before("Setting stubs", () => {
      let id = "3";
      const deletecommentStub = sandbox.stub(models.question, "destroy");

      deletecommentStub
        .withArgs({
          where: { id: id },
        })
        .returns(1);
      deletecommentStub.returns(0);
    });

    after("Removing stubs", () => {
      sandbox.restore();
    });

    // should fail if param id is invalid
    // should return 200 if id is valid

    it("should fail if param id is invalid", async () => {
      let response = await chai
        .request(server)
        .delete("Api/v1/comment/" + invalidId)
        .set("x-auth-token", validToken)
        .send();

      response.should.have.status(400);
    });

    it("should fail if token is invalid", async () => {
      let response = await chai
        .request(server)
        .delete("Api/v1/comment/" + validId)
        .set("x-auth-token", invalidToken)
        .send();

      response.should.have.status(400);
    });

    it("should pass if token is valid", async () => {
      let response = await chai
        .request(server)
        .delete("Api/v1/comment/" + validId)
        .set("x-auth-token", validToken)
        .send();

      response.should.have.status(200);
    });
  });
});
