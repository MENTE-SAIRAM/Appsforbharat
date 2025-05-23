import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addUser, getUserById,} from '../repositories/userRepository.js';
import { getAllUsers } from '../repositories/userRepository.js';
export const register = async (req, res) => {
  const { user_id, password, isAdmin } = req.body;

  const existingUser = await getUserById(user_id);
  if (existingUser)
    return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    user_id,
    password: hashedPassword,
    isAdmin: isAdmin === true
  };
  await addUser(user);

  return res.status(201).json({ message: 'User registered' });
};


export const login = async (req, res) => {
  const { user_id, password } = req.body;
  const user = await getUserById(user_id);

  if (!user)
    return res.status(400).json({ message: 'User does not exist' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
  { user_id: user.user_id, isAdmin: user.is_admin },
  'sairam',
  { expiresIn: '1h' }
);

  return res.json({ message: 'Login successful', token });
};
export const getallUsers=(req,res)=>{
 return res.json(getAllUsers());
}