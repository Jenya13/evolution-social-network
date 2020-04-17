const express = require('express');
const router = express.Router();
const {
  addPost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unLikePost,
  addComment,
  deleteComment,
} = require('./../controllers/postController');
const { auth } = require('./../controllers/authController');

router.route('/').get(auth, getPosts).post(auth, addPost);
router.route('/:id').get(auth, getPostById).delete(auth, deletePost);
router.route('/like/:id').patch(auth, likePost);
router.route('/unlike/:id').patch(auth, unLikePost);
router.route('/comment/:id').post(auth, addComment);
router.route('/comment/:id/:comment_id').delete(auth, deleteComment);

module.exports = router;
