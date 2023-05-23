const conn=require('./db')
const express=require('express')
const bodyParser=require('body-parser')
const session = require('express-session')

const app=express()

app.use(session({
    secret: 'srl7', // Replace with a secret key used for session encryption
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/login.html')
})

app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/register.html')
})

app.get('/home',(req,res)=>{
    res.sendFile(__dirname+'/home.html')
})

app.get('/form',(req,res)=>{
    res.sendFile(__dirname+'/form.html')
})

app.get('/logout', function(req, res){

    req.session.destroy();

    res.redirect("/");

});

app.post('/register',(req,res)=>{
    const name=req.body.name
    const age=req.body.age
    const phone=req.body.phone

    const sql="INSERT INTO mytable (name,age,phone) VALUES(?,?,?)"

    conn.query(sql,[name,age,phone],(error)=>{
        if(error){
            console.log(error)
        }
        else{
            res.redirect('/')
        }
    })
})

app.post('/', (req, res) => {
    const { name, phone} = req.body;
  
    // Query the database for user credentials
    conn.query('SELECT * FROM mytable WHERE name = ?', [name], (err, results) => {
      if (err) {
        throw err;
      }
  
      if (results.length > 0) {
        const user = results[0];
        if (phone === user.phone) {
          // Successful login
          req.session.loggedIn = true;
          res.redirect('/home');
        } else {
          // Invalid password
          res.send('Invalid phone');
        }
      } else {
        // Invalid username
        res.send('Invalid name');
      }
    });
  });

app.post('/form',(req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const age=req.body.age
    const dob=req.body.dob
    const phone=req.body.phone

    const sql="INSERT INTO myform (name,email,age,dob,phone) VALUES(?,?,?,?,?)"

    conn.query(sql,[name,email,age,dob,phone],(error)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send('Applied successfully!')
        }
    })
})

conn.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('mysql connected successfully!')
    }
})

app.listen(4000,()=>{
    console.log('server running on port 4000')
})