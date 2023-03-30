const express =require('express')
const dotenv=require('dotenv').config()
const errhandler=require('./middlewares/errHandler')
const connectDB=require("./config/dbConnection")

connectDB();
const app=express()

const port=process.env.PORT || 5000

app.use(express.json())
app.use("/api/contacts", require('./routes/contactRoutes'))
app.use("/api/users", require('./routes/usersRouter'))
app.use(errhandler)

app.listen(port, ()=>{
	console.log(`Server is running on port ${port}`)
})