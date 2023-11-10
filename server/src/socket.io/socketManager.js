const socketIo = require('socket.io');
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

    io.on("connection", (socket) => {
        console.log("New client connected " + socket.id);
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            removeUser(socket.id)
        });

        socket.on('newCustomer', (id_customer) => {
            addUser(id_customer, socket.id)
            console.log("🚀 ~ file: socketManager.js:9 ~ socketManager ~ listCustomerOnline:", users)
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
        socket.on('receiverComment', ({ id_receiver }) => {
            const receiver = getUser(id_receiver)
            if (receiver) {
                io.to(receiver.socketId).emit('sendComment', '');
            }
        });
    });

    return io;
};

export default socketManager;