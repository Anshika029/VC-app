const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');

var rname;
var room_Id;
app.use(express.static("public"));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})


app.post('/', function (req, res) {
  rname = req.body.roomName
  console.log(rname);
  if(res.statusCode === 200)
   {
    room_Id=uuidv4();
     res.redirect(`room=${rname}_${room_Id}`);
     console.log(room_Id);
   }
  
 res.end();
})



app.get("/:meet",function(req,res){
    console.log("meedId is passed to meet.ejs");
    res.render("room",{meetId:req.params.meet});
    
})

io.on('connection', function(socket) {
    socket.on('join', function(roomId,user_id,userName) {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected',user_id);
        socket.on('message',function(message){
            io.to(roomId).emit('updateMessage',message,userName)
        })
        socket.on('raise',function(){
          io.to(roomId).emit('handRaise',userName)
        })

        socket.on('shareLink',function(){
          io.to(roomId).emit('gettingLink',room_Id,rname,port)
        })
});
   
    
});


server.listen(port,function(){
    console.log("server is running");
})

;