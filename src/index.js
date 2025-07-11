import express from "express";
import {dbconnection} from "./DB/db.connection.js";
import User from "./DB/Models/user.model.js";
import Blog from "./DB/Models/blog.model.js";
import userController from "./Modules/Users/user.controller.js";
import blogController from "./Modules/Blogs/blog.controller.js";

const app=express();
app.use(express.json())
app.use('/users',userController)
app.use('blogs',blogController)
dbconnection();

app.use((req,res,next)=>{

    res.status(404).json({
        message:"Router not found"
    })
})

app.use((err,req,res,next)=>{
console.log(err);
    res.status(500).json({
        message:"something went wrong"
    })
})
app.listen(3000,()=>{

    console.log("server is running on port 3000");
});
