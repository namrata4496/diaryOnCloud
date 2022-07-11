const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");

router.get(
  "/fetchallnotes",
  fetchUser,

  async (req, res) => {
    try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
    }catch (error) {
        console.error(error.message);
    res.status(500).send("some error occured");
    }
  }
);

router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "enter a valid name").isLength({ min: 2 }),
    body("description").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const {title,description,tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        
    
    const note = new Notes({
        title,description,tag,user:req.user.id
    })
    const savednotes = await note.save();
    res.json(savednotes)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
}
});


router.put(
    "/updatenotes/:id",
    fetchUser,
  
    async (req, res) => {
      try {

      const { title, description, tag } = req.body;
      const newnote = {};
      if(title) { newnote.title = title}
      if(description) { newnote.description = description}
      if(tag) { newnote.tag = tag}

      let note = await Notes.findById(req.params.id);
      if(!note){ return res.status(404).send("Not found")}

      if(note.user.toString() !== req.user.id){
        return res.status(404).send("Not allowed")
      }
      console.log("aaya")
      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newnote}, {new:true})
      res.json({note});
    
      }catch (error) {
          console.error(error.message);
          res.status(500).send("some error occured");
      }
    }
  );
  

  router.delete(
    "/deletenote/:id",
    fetchUser,
  
    async (req, res) => {
      try {

      let note = await Notes.findById(req.params.id);
      if(!note){ return res.status(404).send("Not found")}

      if(note.user.toString() !== req.user.id){
        return res.status(404).send("Not allowed")
      }
     
      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({success:"deleted"});
    
      }catch (error) {
          console.error(error.message);
          res.status(500).send("some error occured");
      }
    }
  );
  

module.exports = router;
 
