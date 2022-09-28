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
  user_id: 7,
};

const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY0MTM4OTc4fQ.VHPWsLQYyUzta-4zxba8xvJ7Mt-fRakm2CjnCqDfCrI";
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
        .post("Api/v1/questions")
        .set("x-auth-token", validToken)
        .send(questionEntry);
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("id").eq("4");
      response.body.should.have.property("question").eq("how are you?");
      response.body.should.have.property("user_id").eq(7);
    });
  });
})