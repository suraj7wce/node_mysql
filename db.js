const mysql=require('mysql')

const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'2020btecs00081',
    database:'myschema'
})

module.exports=conn