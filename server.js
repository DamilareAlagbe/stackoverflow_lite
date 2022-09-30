const config = require("config");
const express = require("express");
const user = require("./routes/user");
const question = require("./routes/question");
const answer = require("./routes/answer");
const comment = require("./routes/comment");
const app = express();

const dotenv = require("dotenv").config();


if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR : jwtprivatekey is not defined.");
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", user);
app.use("/api/v1/questions", question);
app.use("/api/v1", answer);
app.use("/api/v1", comment);


require('./startup/prod')(app);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = server;
