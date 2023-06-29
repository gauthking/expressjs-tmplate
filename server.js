const express = require('express');
require('dotenv').config();

// init express app

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json()); // to parse the requests and responses from client to server and vice versa

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"))


// listen to the current port

app.listen(port, () => {
    console.log(`Server started. Listening to port - ${port}`);
});