const io = require("socket.io")(8900,{
    cors:{
    origin: true,
    }
    // origin: true,
})
let users =[];
const addUser = (userId,socketId)=>{
    !users.some(user=>user.userId===userId)&&users.push({userId,socketId})
}
const removeUser = (socketId)=>{
    users = users.filter(user=>user.socketId !== socketId)
}
// 
const getUser = (userId) =>{
    return users.find(user=>user.userId === userId)
}


io.on("connection",(socket) =>{
    console.log("a user connected");
    // take user id socket id
    socket.on("addUser",userId=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users)
    })
    // send and get message
    socket.on("sendMessage",({senderId,receiverId,text,messageId})=>{
        const user = getUser(receiverId);
      
       if(user){
        io.to(user.socketId).emit("getMessage",{
          senderId,
          text,
          messageId
         }) 
        //  user.unreadMessages.push(messageId);
         io.to(user.socketId).emit("getNotification",{
          senderId,
          text,
          messageId,
          isRead: false,
          date: new Date()
         }) 

       }
    })
 
    // disconnect
    socket.on("disconnect",()=>{
        console.log("a user discounnected");
        removeUser(socket.id)
        io.emit("getUsers",users)

    })
})

