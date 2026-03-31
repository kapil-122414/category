const express = require("express");
const app = express();
const connectdb = require("./config/bd");
const routes=require('./Routes/Routers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectdb();
const cors = require("cors");
app.use(cors());
const port = 5000;
app.use('/api',routes);
app.use("/uploads", express.static("uploads"));
   

app.get("/api", (req, res) => {
  console.log("hyy");
});

app.listen(port, console.log(`server run ${port}`));
