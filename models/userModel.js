const mongoos=require('mongoose')


const userSchema=mongoos.Schema({
	username:{
		type:String,
		required:[true, "Please add the user name"]
	},
	email:{
		type:String,
		required:[true, "Please add the user email"],
		unique:[true, "Email Address Already Taken"]
	},
	password:{
		type:String,
		required:[true, "Please add the user password"]
	}
},{
	timestamps:true
})

module.exports=mongoos.model("User", userSchema)