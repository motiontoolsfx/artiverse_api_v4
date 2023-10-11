const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./src/routes/routes");

const port = 3000;
const app = express();

app.set('trust proxy', 1);
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});