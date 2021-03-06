const express = require("express");
const db = require("./data/db");
const router = express.Router();

router.get("/", (req, res, next) => {
  db.find().then((posts) => {
    if (!posts) {
      res.status(404).json({ message: "Posts not found" }).end();
    }
    if (posts) {
      res.status(200).json(posts).end();
    } else {
      res
        .status(500)
        .json({ message: "Something is wrong with the router" })
        .end();
    }
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = db
    .findById(id)

    .then((post) => {
      if (!post) {
        res.status(404).json({ message: "Post not found" }).end();
      }
      if (post) {
        res.status(200).json(post).end();
      } else {
        res.status(500).json({ message: "something went wrong" }).end();
      }
    });
});

router.get("/:id/comments", (req, res) => {
  const id = Number(req.params.id);
  const comments = db.findPostComments(id)
  .then((post)=>{
    if (!comments) {
        res.status(404).json({ message: "Post not found" }).end();
      }
      if (comments) {
        res.status(200).json(comments).end();
      } else {
        res.status(500).json({ message: "backend fucked up" });
      }
  })

  
});

//POST REQ

//
router.post("/", (req, res) => {
  const content = req.body;

  if (content.title === "" || content.contents === "") {
    res.status(400).json({ message: "Please fill out all fields" }).end();
  }
  if (content) {
    db.insert(content)
    .then((content)=>{
    res.status(201).json(content).end();
    })
    
  } else {
    res.status(500).json({ message: "Nope" }).end();
  }
});

// /:id/comments
router.post("/:id/comments", (req, res) => {
  const comment = req.body;
  const id = Number(req.params.id);
  comment.post_id = id;

  db.insertComment(comment)
  .then((post)=>{
    if (!post) {
        res.status(404).json({ message: "Not found" }).end();
      }
      if (comment.text === "") {
        res.status(400).json({ message: "Please fill out all fields" }).end();
      }
      if (comment) {
        
        
        res.status(201).json(post).end();
      } else {
        res.status(500).json({ message: "Nope" }).end();
      }
    });
  })



router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const update = req.body;

  db.findById(id)
  .then((post)=>{
    if (!post) {
        res.status(404).json({ message: "Not found" }).end();
      }
      if (update.title === "" || update.content === "") {
        res.status(400).json({ message: "all fields must be filled" }).end();
      }
      if (update && post) {
        db.update(id, update);
        res.status(200).json(update).end();
      } else {
        res.status(500).json({ message: "Now you fucked up" }).end();
      }
    });
  })



//DELETE REQ

// /:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
db.findById(id)
db.remove(id)
.then((post)=>{
    if (!post) {
        res.status(404).json({ message: "Not found" }).end();
      }
      if (post) {
        ;
        res.status(204).json({ message: "Post removed" }).end();
      } else {
        res.status(500).json({ message: "Nope" });
      }
    });
})

  
console.log("ARGLE BARGLE")
module.exports = router;
