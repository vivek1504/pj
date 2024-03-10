const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/v1", rootRouter);
app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})


