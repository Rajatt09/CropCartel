import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Product } from "./models/product.model.js";
import http from "http"
import {Server} from "socket.io"
const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

app.use(cookieParser());

//routes import

const server = http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST']
    }
});

io.on('connection',(socket)=>{ // the socket obj conatins information about the client upon the connection of the server with the client
    //console.log("A new user has connected ",socket.id)
    try {
      socket.on("send_message",async(message)=>{
      const {_id_user,_id_item,currentPrice} = message;
      //console.log("Product Id:",_id_product)
      const item= await Product.findByIdAndUpdate(_id_item,{buyer:_id_user,currentPrice:currentPrice},{new:true});
      console.log("Inside Backend",item);
      socket.broadcast.emit("receive_message",item); // whenever a server recieves a message then send it to all thr clients
      })
    } catch (error) {
      console.log("Error in Web Socket Connection:",error);
    }
})

import userRouter from "./routes/user.routes.js";

//routes declaration

app.use("/api/v1/users", userRouter);

server.listen(8001,()=>{
  console.log("WebSocket Listening on:",8001);
})

export { app };
