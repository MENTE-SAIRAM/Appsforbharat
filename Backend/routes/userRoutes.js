import express from 'express';
import { register, login, getallUsers } from '../controllers/usercontroller.js';
import validate from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../validations/userValidation.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getallusers', getallUsers);
export default router;
