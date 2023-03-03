const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {

    let domain = socket.handshake.headers.domain;
    let id = socket.handshake.headers.id;

    socket.join(domain + id);

    socket.on("scroll", (...args) => {
        io.to(args[0].domain + args[0].id).emit("scrollBack", args[0].data)
    });

    socket.on("scrollWheel", (...args) => {
        io.to(args[0].domain + args[0].id).emit("scrollWheelBack", args[0].data)
    });

    socket.on("click", (...args) => {
        io.to(args[0].domain + args[0].id).emit("clickBack", args[0].data)
    });

    socket.on("reload", (...args) => {
        io.to(args[0].domain + args[0].id).emit("reloadBack", "")
    });

});



app.get('/', (req, res) => {
    res.send('');
})

var reqTimer = setTimeout(function wakeUp() {
    request("https://browser-sync.herokuapp.com/", function() {});
    return (reqTimer = setTimeout(wakeUp, 1200000));
}, 1200000);

httpServer.listen(process.env.PORT || 3000);