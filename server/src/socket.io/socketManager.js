const socketIo = require('socket.io');
import Admin from "../models/Admin";
import Customer from "../models/Customer";
const socketManager = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: true,
        }
    });
    let users = []
    const addUser = (userId, socketId) => {
        !users.some(user => user.userId === userId) && users.push({ userId, socketId, unreadMessages: [] })
    }
    const removeUser = (socketId) => {
        users = users.filter(user => user.socketId !== socketId)
    }
    const getUser = (userId) => {
        return users.find(user => user.userId === userId)
    }
    const getUserSocket = (socketId) => {
        return users.find(user => user.socketId === socketId)
    }

    io.on("connection", async (socket) => {
        socket.on("disconnect", () => {
            removeUser(socket.id)
            io.emit("getUsers", users)
            console.log("🚀 ~ file: socketManager.js:12 ~ addUser ~ addUser:", users)
        });
        socket.on("userUnconnect", async (id) => {
            console.log("userUnconnect")
            removeUser(socket.id)
            await Customer.findByIdAndUpdate(id, { online: false });
        });
        socket.on("adminUnconnect", async (id) => {
            removeUser(socket.id)
            await Admin.findByIdAndUpdate(id, { online: false });
        });

        socket.on('addUser', async (id_customer, type) => {
            console.log("🚀 ~ file: socketManager.js:38 ~ socket.on ~ id_customer:", id_customer)
            if (type === 'customer') {
                await Customer.findByIdAndUpdate(id_customer, { online: true });
            } else {
                await Admin.findByIdAndUpdate(id_customer, { online: true });
            }
            addUser(id_customer, socket.id)
            io.emit("getUsers", users)
            console.log("🚀 ~ file: socketManager.js:12 ~ addUser ~ addUser:", users)

        })
        socket.on('receiverNotify', ({ id_receiver }) => {
            const receiver = getUser(id_receiver)
            if (receiver) {
                io.to(receiver.socketId).emit('sendNotify');
            }
            io.emit('update')
        });
        socket.on('update', () => {
            io.emit('update')
        });
        socket.on("sendMessage", ({ senderId, receiverId, text, messageId }) => {
            console.log("🚀 ~ file: socketManager.js:66 ~ socket.on ~ senderId:", senderId)
            const user = getUser(receiverId);
            console.log("🚀 ~ file: socketManager.js:67 ~ socket.on ~ user:", user)
            if (user) {
                io.to(user.socketId).emit("getMessage", {
                    senderId,
                    text,
                    messageId
                })
                io.to(user.socketId).emit("getNotifyMessage")
                //  user.unreadMessages.push(messageId);
                io.to(user.socketId).emit("getNotification", {
                    senderId,
                    text,
                    messageId,
                    isRead: false,
                    date: new Date()
                })
            }
        })
    });

    return io;
};

export default socketManager;