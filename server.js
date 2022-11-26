const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json())

var nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    port:'465',
    host:"smtp.gmail.com",
    auth:{
        host:"snehashwin3@gmail.com",
        pass:"urnlhtzgeqnjezgb"
    },
    secure:true
})
app.post("/send-email",(req,res)=>{
    const to = req.body.to
    const url = req.body.url
    const maildata = {
        from : "snehashwin3@gmail.com",
        to : to,
        subject:"join the video chat with me",
        html : `<p>hey there , </p><p>come join me for a video chat here - ${url}</p>`
    }

    transporter.sendMail(maildata,(error,info)=>{
       if(error){
          return console.log(error)
       }
       res.status(200).send({message:"invitation sent!",message_id:info.messageId}) 
    })
})

server.listen(process.env.PORT || 3030);