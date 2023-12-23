const express = require('express')
const postController = require('../controller/postController')

const router = express.Router()

router
  .route('/')
  .post(postController.createPost)
  .get(postController.getAllPosts)

router
  .route('/:postId')
  .get(postController.getOnePost)
  .put(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router
