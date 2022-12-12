import express from 'express';
import dashboardController from '../controllers/dashboardController';


const router = express.Router();

router.get('/', dashboardController.getPosts);
router.post('/:slug', dashboardController.updatePost)


export default router;
