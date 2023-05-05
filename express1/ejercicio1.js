const http = require ('http');

const server = http.createServer((req,res) =>{
    res.end ("mi primer hola mundo desde back")
})

server.listen(8080,()=>{
    console.log("Listening on por 8080")
})