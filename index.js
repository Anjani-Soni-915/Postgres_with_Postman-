const client = require('./connection.js')    //importing that file
const express = require('express');
const app = express();
app.use(express.json());   // seting the formate 

app.listen(3300, ()=>{          //server
    console.log("Sever is now listening at port 3300");
})

client.connect();


// get all users 
app.get('/newt', (req, res)=>{
    client.query(`Select * from newt`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

// app.get('/newt/:id', (req, res)=>{
//     client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
//         if(!err){
//             res.send(result.rows);
//         }
//     });
//     client.end;
// })



// Add new user
app.post('/newt', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into newt(id, firstname, lastname, location) 
                       values('${user.id}', '${user.firstname}', '${user.lastname}', '${user.location}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


// update the user details
app.put('/newt/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update newt
                       set firstname = '${user.firstname}',
                       lastname = '${user.lastname}',
                       location = '${user.location}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

