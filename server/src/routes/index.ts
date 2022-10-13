import express from 'express';
import postController from '../controllers/postController';

const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/blog');
});

export default router;
