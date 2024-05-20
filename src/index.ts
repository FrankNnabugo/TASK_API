import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { EnvFile } from "./config";
//import router from "./route";
import { handleError } from "./middleware/error-handler";
import { logger } from "./middleware/logger";
const PORT = EnvFile.PORT;
import taskRouter from "./route/task";
import userRouter from "./route/auth-route";

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
    res.send("hello from server")
});

app.use("/Api/v1/", taskRouter );
app.use("/Api/v1/", userRouter);

app.use(handleError);



const startServer = async () => {
    const httpServer = http.createServer(app);

    const io = new Server(httpServer);

    io.on("connection", (socket: any) => {

        console.log("socket connected");

        socket.on("event", (data: any) => {

            console.log("recieved data", data);

            io.emit("event", data);
        });
    });
    
    httpServer.listen(PORT, () => {
        console.log(`server is listening for request on port ${PORT}`)
    });
}

startServer();