import express from 'express'
import { checkPermission } from '../middleware/checkPermission.js';
import { isAuthenticated } from '../middleware/index.js';
const router = express.Router();

router.get('/records', isAuthenticated, checkPermission('update_record'), (req,res) => {
  res.status(200).json({message: 'Hi you are in records!'})
});

export default router;