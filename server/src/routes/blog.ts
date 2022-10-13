import express from 'express';
import postController from '../controllers/postController';

const router = express.Router();

router.get('/', postController.getPosts);
router.post('/', postController.postPost);

router.get('/:postid', postController.getPost);
router.put('/:postid', postController.putPost);
router.delete('/:postid', postController.deletePost);

export default router;
