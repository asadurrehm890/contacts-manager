const express = require("express")
const {
	getContacts,
	createContact,
	singleContact,
	updateContact,
	deleteContact
}=require('../controllers/contactController')

const router=express.Router()

const validateToken=require("../middlewares/validateToken")

router.use(validateToken)
router.route("/").get(getContacts).post(createContact)

router.route("/:id").get(singleContact).put(updateContact).delete(deleteContact)

module.exports=router