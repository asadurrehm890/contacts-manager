const asyncHandler=require("express-async-handler")
const Contact=require("../models/ContactModel")


const getContacts=asyncHandler(async(req, res)=>{
	const contacts=await Contact.find({user_id:req.user.id})
	res.status(200).json(contacts)
})

const createContact=asyncHandler(async(req, res)=>{
	
	const {name, email, phone}=req.body
	if(name==null || email==null || phone==null){
		res.status(400)
		throw new Error("All Fields are Mandatary")
		
	}
	const contact=await Contact.create({
		name, email, phone, user_id:req.user.id
	})
	res.status(200).json(contact)
})

const singleContact=asyncHandler(async(req, res)=>{
	const contact=await Contact.findById(req.params.id)
	if(!contact){
		res.status(400)
		throw new Error("Contact Not Found")
	}
	res.status(200).json(contact)
})

const updateContact=asyncHandler(async(req, res)=>{
	
	const contact=await Contact.findById(req.params.id)
	if(!contact){
		res.status(400)
		throw new Error("Contact Not Found")
	}
	
	if(contact.user.id.toString() !== req.user.id){
		res.status(403);
		throw new Error("user won't have permission to update other user contacts")
	}
	
	const updatedContact=await Contact.findByIdAndUpdate(
	   req.params.id,
	   req.body,
	   {new:true}
	)
	res.status(200).json(updatedContact)
})

const deleteContact=asyncHandler(async(req, res)=>{
	const contact=await Contact.findById(req.params.id)
	if(!contact){
		res.status(400)
		throw new Error("Contact Not Found")
	}
	
	if(contact.user.id.toString() !== req.user.id){
		res.status(403);
		throw new Error("user won't have permission to update other user contacts")
	}
	await Contact.deleteOne({_id:req.params.id})
	res.status(200).json(contact)
})


module.exports={
	getContacts,
	createContact,
	singleContact,
	updateContact,
	deleteContact
	
}