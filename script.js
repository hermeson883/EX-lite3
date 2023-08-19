const sqlite = require('sqlite3')
const express = require('express')
const app = express()
const path = require('path')
const root = path.join(__dirname, 'public')
const db_path = './data/lamp.db'

const db = new sqlite.Database(db_path,sqlite.OPEN_READWRITE, (err) => {
    if(err){
        console.log("it's over :(", err)
    }
})

app.use(express.urlencoded({extended: false}))


app.use(express.static(root, {
    extensions: ['html', 'js', 'css'],
}))

app.post('/postForm', (req, resp) => {
    const infos = {
        name: req.body.name,
        email: req.body.email
    }
    console.log( infos.name, infos.email)

    const query = 'INSERT INTO users(name, email) VALUES (?,?)'
        
    db.each(query, [infos.name, infos.email], (err, resp) => {
        if(err){
            console.log(err)
        }
        console.log(resp)
    })

    db.each('SELECT * FROM users', (err, rows) => {
        if(err){
            console.error(err)
        }
        console.table(rows)
    })
})

app.listen(3000, () => {
    console.log('We are back!!! and listen to http://localhost:3000')
})

