const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const postRoutes=require("./routes/postRoutes");

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/v1/post",postRoutes);


app.listen(3000,()=>{
    console.log("app is listening on port 3000");
})
