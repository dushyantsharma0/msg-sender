const express = require('express')
const ejs=require('ejs');
const app = express()
const http = require('http')

const server = http.createServer(app)

const io = require('socket.io')(server)

const port = process.env.PORT || 3000
// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/view');
 app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) =>{
   res.sendFile('index.html')
})

var users=[]
 io.on('connection',function(socket){
    console.log('a user connected')
    socket.on('setusername',function(data){
        
       
        if(users.indexOf(data) > -1){
           socket.emit('errorsend',`${data} this user is already connected`)
        }else{
            console.log(data,'user connected')
            users.push(data)
            socket.emit('senduser',{username:data})
        }
    })
    socket.on('msg',function (data ) {  
        io.sockets.emit('newmsg',data)
    })
    socket.on('disconnect',function(){
        console.log('user disconnected')
        
    })
 })
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
}           )