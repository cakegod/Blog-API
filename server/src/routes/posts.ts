import express from 'express';
import postController from '../controllers/postController';

const router = express.Router();

router.get('/', postController.getPosts);
router.post('/', postController.postPost);

router.get('/:slug', postController.getPost);
router.put('/:slug', postController.putPost);
router.delete('/:slug', postController.deletePost);

export default router;
