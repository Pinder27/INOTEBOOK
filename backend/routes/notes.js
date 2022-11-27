const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

router.post(
  "/addnote",
  fetchUser,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Enter a valid description").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

router.delete("/deletenotes/:id", fetchUser, async (req, res) => {
    try {
        //await Note.delete({title: req.body.title})
        let note = await Note.findById( req.params.id );
       
        if(!note){return res.status(404).send("not found")};
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("user not match")};

            await Note.findByIdAndDelete(req.params.id);
           
      
          res.send("note deleted");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  });

  router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const {title,description,tag} = req.body;
        const newnote = {}
        if(title){newnote.title = title}
        if(description){newnote.description = description}
        if(tag){newnote.tag = tag}

       let note = await Note.findById( req.params.id );
        if(!note){return res.status(404).send("not found")};
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("user not match")};
        
        note = await Note.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true})
      res.json({note});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  });

module.exports = router;
