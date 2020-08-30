const express = require('express')
const db = require('./data/db')
const server = express()

//POST REQ

// api/posts

// creates post
// if missing content - cancel req and return error 400 (see README for text)
// if valid - return post and status 201
// if error while saving, error 500

// api/posts/:id/comments
//creates comment for specific post
// 404 if comment id doesn't exist
// 400 if missing text
// 500 error while saving
// 201 if all ok

//GET REQ

// /api/
// returns all posts in db
// if retrieval error, 500
// cancel req

// api/posts/:id
//returns specific post
// id not found: 404
// retrieval error: 500

// PUT REQ

// api/posts/:id
// updates post with specific id
// returns modified post
// missing title/contents 400 bad request
// Not found : 404
// retrieval error: 500
// retrieved : 200 ok

//DELETE REQ

// api/posts/:id
// removes specific post
// returns deleted post object
// 404 not found
// 500 could not delete




server.use('/', (req, res) => res.send('API up and running!'));
server.listen(9000, () => console.log('API running on port 9000'));