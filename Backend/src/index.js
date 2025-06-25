import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import { app } from "./app.js";
import { Server } from "socket.io";

dotenv.config();

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        console.log("Database connected");

        const server = app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

        // Initialize Socket.IO
        const io = new Server(server, {
            pingTimeout: 60000,
            cors: {
                origin: "*", // Consider restricting in production
            },
        });

        // Socket.IO Events
        io.on("connection", (socket) => {
            console.log("Socket connected:", socket.id);

            // Setup user socket room
            socket.on("setup", (userData) => {
                console.log("User setup:", userData.username);
                socket.join(userData._id);
                socket.emit("connected");
            });

            // Join chat room
            socket.on("join chat", (room) => {
                console.log(`Joining chat room: ${room}`);
                socket.join(room);
            });

            // Receive and broadcast new message
            socket.on("new message", (newMessage) => {
                const chat = newMessage.chatId;
                if (!chat.users) return console.log("Chat.users not defined");

                chat.users.forEach((user) => {
                    if (user._id === newMessage.sender._id) return;
                    socket.to(user._id).emit("message recieved", newMessage);
                    console.log(`Message sent to user: ${user._id}`);
                });
            });

            // Clean disconnect
            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });
