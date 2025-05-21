import express from 'express';
import { register, login, getallUsers } from '../controllers/usercontroller.js';
import validate from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../validations/userValidation.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/getallusers', getallUsers);
export default router;
