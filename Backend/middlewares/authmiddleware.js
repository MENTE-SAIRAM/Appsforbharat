import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized: Missing token' });

  const token = authHeader.split(' ')[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token,'sairam');
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authMiddleware;
