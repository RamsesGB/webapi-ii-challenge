// const router = require('express').Router(); 1 line version of line 3 & 5
const express = require('express');

const router = express.Router();

const Posts = require('../data/db.js');

router.use(express.json());

// Endpoints
// The C in CRUD
router.post('/', (req, res) => {
  const { title, contents } = req.body;

  if(!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post." })
  } else {
    Posts.insert(req.body)
      .then(posts => {
        res.status(201).json(posts);
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

router.post('/:id/comments', (req, res) => {
  const { text } = req.body;
  const { id } = req.params;

  if(!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." })
  } else {
    Posts.insertComment(text)
      .then(comment => {
        if(comment) {
          res.status(201).json(comment);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          })
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        })
      });
  }
});

// The R in CRUD
router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.params.id)
  .then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  })
  .catch(() => {
    res.status(500).json({
      error: "The comments information could not be retrieved." 
    });
  });
});

// The D in CRUD
router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
  .then(deleted => {
    if(deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      })
    }
  })
  .catch(() => {
    res.status(500).json({ 
      error: "The post could not be removed"
    });
  });
});

// The U in CRUD
router.put('/:id', (req, res) => {
  const { title, contents } = req.body;

  if(!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post." })
  } else {
    Posts.update(req.params.id, req.body)
      .then(post => {
        if(post) {
          res.status(200).json(post)
        } else {
          res.status(404).json({
            errorMessage: "The post with the specified ID does not exist."
          })
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  }
});




module.exports = router;