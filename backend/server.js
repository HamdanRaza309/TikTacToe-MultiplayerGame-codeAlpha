import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: 'http://localhost:5173/'
});

io.on("connection", (socket) => {
    console.log('New User Joind Socket', socket.id);

});

httpServer.listen(3000);