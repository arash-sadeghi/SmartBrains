const express=require('express')
const bodyParser = require('body-parser')
const bcrypt=require('bcrypt-nodejs')
const cors=require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
const database={
    users: [
        {
            id:'123',
            name: 'john',
            email: 'x',
            password: 'x',
            entries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name: 'sal',
            email: 'x@x@x x',
            password: 'cooxasd',
            entries: 0,
            joined: new Date()
        },

    ]
}

app.get('/',(req,res)=>{
    res.send(database.users)
})


app.post('/signin',(req,res)=>{
    
    if (req.body.email === database.users[0].email 
        && req.body.password === database.users[0].password){
            res.json(database.users[0])
        }else{
            res.status(400).json('errro logging in')
        }
})


app.post('/register',(req,res)=>{
    const {id,email,name,password}=req.body;
    database.users.push({
        id:'125',
        name: name,
        email: email,
        entries:0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params
    let found = false;
    database.users.forEach(user=>{
        if (user.id===id){
            found = true
            return res.json(user)
        }
    })
    if (!found){
        res.status(404).json(' no such thing bro')
    }
        

})


app.put('/image',(req,res)=>{
    const {id}=req.body
    let found = false;
    database.users.forEach(user=>{
        console.log(">>XXXX id ",id)
        if (user.id===id){
            user.entries++
            found=true;
            res.json(user.entries);
            return 0;
        }
    })
    if (!found){
        res.status(404).json(' no such thing bro')
    }
})


app.listen(3000,()=>{
    console.log('HELOOOOOxOoooOOOOOOo')
})