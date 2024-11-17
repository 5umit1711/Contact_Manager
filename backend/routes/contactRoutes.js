import express from "express"
import Contacts from "../models/contactModal.js";

const router = express.Router();

router.post("/contacts", async(req, res)=>{
    try {
        const {phoneNumber} = req.body;
        const contact = await Contacts.findOne({phoneNumber});
        if(contact){
            return res.send({
                success: false,
                message: "Contact already exists",
            })
        }

        const newContact = new Contacts(req.body);
        await newContact.save();
        
        res.send({
            success: true,
            message: "Contact saved successfulyy",
        })
    } catch (error) {
        console.log("Error in adding contacts", error);
    }
})

router.get("/contacts", async(req,res)=>{
    try {
        const {userEmail} = req.query;
        const contacts = await Contacts.find({userEmail});

        res.send({
            success: true,
            contacts,
        })
    } catch (error) {
        console.log("Error in fetching contacts", error);
    }
})

router.put("/contacts/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatedContact = await Contacts.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedContact) {
            return res.send({
                success: false,
                message: "Contact not found",
            });
        }

        res.send({
            success: true,
            message: "Contact updated successfully",
            contact: updatedContact,
        });
    } catch (error) {
        console.log("Error in updating contacts", error);
    }
});

router.delete("/contacts/:id", async(req,res)=>{
    try {
        const id = req.params.id;
        const contact = await Contacts.findByIdAndDelete(id);

        res.send({
            success: true,
            message: "Contact deleted successfully",
        })
    } catch (error) {
        console.log("Error in deletion", error);
    }

})

export default router