const config = require("config");
const express = require("express");
const app = express();


if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR : jwtprivatekey is not defined.");
    process.exit(1);
  }



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = server;
