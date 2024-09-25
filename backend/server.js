import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
    }
});

const allUsers = {};

io.on("connection", (socket) => {
    // Store the new user with online status
    allUsers[socket.id] = {
        socket: socket,
        online: true,
    };

    // Handle request to play event
    socket.on('request_to_play', (data) => {
        const currentUser = allUsers[socket.id];
        currentUser.playerName = data.playerName; // Store player name

        let opponentPlayer;

        // Look for an available opponent
        for (const key in allUsers) {
            const user = allUsers[key];
            if (user.online && !user.playing && socket.id !== key) {
                opponentPlayer = user;
                break;
            }
        }

        console.log(opponentPlayer);

        // Log whether an opponent was found
        if (opponentPlayer) {
            // Notify both players about the opponent
            opponentPlayer.socket.emit("OpponentFound", {
                opponentName: currentUser.playerName
            });

            currentUser.socket.emit("OpponentFound", {
                opponentName: opponentPlayer.playerName
            });

            // Mark both players as playing
            currentUser.playing = true;
            opponentPlayer.playing = true;

        } else {
            currentUser.socket.emit("OpponentNotFound");
        }
    });

    // Handle disconnection
    socket.on('disconnect', function () {
        const currentUser = allUsers[socket.id];
        if (currentUser) {
            currentUser.online = false; // Mark the user as offline
        }
    });
});

httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
});
