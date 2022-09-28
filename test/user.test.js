let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const sandbox = require("sinon").createSandbox();
const models = require("../models");

//assertion style
chai.should();
chai.use(chaiHttp);

const userModel = {
  id: 6,
  first_name: "Alagbe",
  last_name: "Damilare",
  email: "emmanuel@gmail.com",
  password: "$2b$10$0I4iBrcRCwsg93vNnek41OXkzuqKXseWEwbFWeYtUDVaaen.xSb6u",
};
describe("user Api", () => {
  // ** test the sign up route
  //

  describe("POST /Api/v1/users/signup", () => {
    const user = {
      first_name: "Alagbe",
      last_name: "Damilare",
      email: "emmanuel@gmail.com",
      password: "dami123",
    };

    before("set up", () => {
      const userdb = sandbox.stub(models.user, "create");
      const userFindone = sandbox.stub(models.user, "findOne");
      userdb.returns(userModel);
      userFindone.withArgs({ where: { email: user.email } }).returns(null);
      userFindone.returns(userModel);
    });

    after("remove stub", () => {
      sandbox.restore();
    });

    it("it should post a new user", async () => {
      let response = await chai
        .request(server)
        .post("/Api/v1/users/signup")
        .send(user);
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("id").eq(6);
      response.body.should.have.property("first_name").eq("Alagbe");
      response.body.should.have.property("last_name").eq("Damilare");
      response.body.should.have.property("email").eq("emmanuel@gmail.com");
    });
  });

  
  // ** test the login route
describe("POST /Api/v1/users/login", () => {
    const user = {
      email: "emmanuel@gmail.com",
      password: "dami123",
    };
  
    before("set up", () => {
      const userFindone = sandbox.stub(models.user, "findOne");
      user.id = 6;
      userFindone.withArgs({ where: { email: user.email } }).returns(userModel);
      userFindone.returns(null);
    });
  
    after("remove stub", () => {
      sandbox.restore();
    });
  
    it("it should login a user", async () => {
      let response = await chai.request(server).post("/Api/v1/users/login").send(user);
      response.should.have.status(200);
      response.body.should.be.a("object");
      response.body.should.have.property("id").eq(6);
      response.body.should.have.property("email").eq("emmanuel@gmail.com");
    });
  });
  
});
