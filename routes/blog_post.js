const express = require('express')
const router = express.Router()
const knex = require('../knex')

// READ ALL records for this table
router.get('/', (req, res, next) => {
  knex('blog_post')
    .then((blog_post) => {
      res.send(blog_post)
    })
    .catch((err) => {
      next(err)
    })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  //validate all fields
  //vaidate id is a number, escape any special chars that would indicate SQL injection
  knex('blog_post')
  .where('id', req.params.id)
  .then( ( blog_post ) => {
    res.send(blog_post[0])
  })
})
// CREATE ONE record for this table
router.post('/', (req, res, next) => {
console.log('body', req.body);
//want to do some validation and build a new object based on validated body data
let newPost = {
  title: req.body.title,
  content: req.body.content,
}
knex('blog_post')
.insert(newPost)
.returning('*')
.then( (insertedPost ) => {
  console.log('result', insertedPost )
  res.send(insertedPost[0])
})
.catch((error) => {
    next(error)
  })
})

// UPDATE ONE record for this table
router.put('/:id', (req, res, next) => {
  knex('blog_post')
  .where('id', req.params.id)
  .then( (post) => {
  if( post.length > 0 ){
    let updatedPost = post[0]
    if( req.body.title ) updatedPost.title = req.body.title
    if( req.body.content ) updatedPost.content = req.body.content

    knex('blog_post')
    .update(updatedPost)
    .where('id', req.params.id)
    .returning('*')
    .then((resUpdate) => {
      res.send(resUpdate[0])
    })
  } else {
    throw new Error(`Blog Post not found. Unable to update.`)
  }
  })
  .catch((error) => {
    next(error)
  })
})

// DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
  knex('blog_post')
  .where('id', req.params.id)
  .then( (post) => {

    if( post.length > 0 ) {
      knex('blog_post')
      .del()
      .where('id', req.params.id)
      .returning('*')
      .then( (deletedPost) => {
        res.send(deletedPost[0])
      })
    } else {
      throw new Error ('Cannot delete a non-existent blog post')
    }

  })
  .catch((error) => {
    next(error)
  })
})




module.exports = router
