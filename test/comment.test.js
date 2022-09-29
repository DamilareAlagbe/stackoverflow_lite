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
        .post(`/api/v1/answer/${commentModel.answer_id}/comment`)
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
        .post(`/api/v1/answer/${commentModel.answer_id}/comment`)
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
        .get(`/api/v1/answer/${commentModel.answer_id}/comment`)
        .set("x-auth-token", invalidToken)
        .send(allComment);
      response.should.have.status(400);
    });

    it("should get all comments to an answer ", async () => {
      let response = await chai
        .request(server)
        .get(`/api/v1/answer/${commentModel.answer_id}/comment`)
        .set("x-auth-token", validToken)
        .send(allComment);

      response.should.have.status(200);
      response.body.should.be.an("array");
    });
  });
  
  // delete comment
  describe("DELETE /comment", () => {
    const validId = "2";
    const validUserId = 2;

    before("Setting stubs", () => {
      let id = "3";
      const deletecommentStub = sandbox.stub(models.comment, "destroy");

      deletecommentStub
      .withArgs({
        where: { id: validId, user_id: validUserId },
      })
        .returns(1);
      deletecommentStub.returns(0);
    });

    after("Removing stubs", () => {
      sandbox.restore();
    });


    it("should fail if token is invalid", async () => {
      let response = await chai
        .request(server)
        .delete("/api/v1/comment/" + validId)
        .set("x-auth-token", invalidToken)
        .send('invalid token');

      response.should.have.status(400);
    });

    it("should pass if token is valid", async () => {
      let response = await chai
        .request(server)
        .delete("/api/v1/comment/" + validId)
        .set("x-auth-token", validToken)
        .send('comment deleted');

      response.should.have.status(200);
    });
  });
});
