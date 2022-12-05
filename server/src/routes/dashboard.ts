import express from 'express';
import dashboardController from 'src/controllers/dashboardController';


const router = express.Router();

router.get('/', dashboardController.getPosts);


export default router;
