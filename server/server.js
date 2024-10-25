const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:4200' //specify allowed origin
}));

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' http://localhost:4200 'unsafe-inline' 'unsafe-eval'");
    next();
});

app.get('/api/data', (request, response)=>{
    //define behaviour for get request
});


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4200", 
    }
});

io.on("connection", (socket)=>{
    console.log(`Client with socket id: ${socket.id} connected.`);
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${3000}`);
})
