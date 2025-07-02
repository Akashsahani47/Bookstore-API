import { readFile, writeFile } from 'fs/promises';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userFile = './data/users.json';

const readUsers = async () => JSON.parse(await readFile(userFile, 'utf-8'));
const writeUsers = async (users) => await writeFile(userFile, JSON.stringify(users, null, 2));

// Register User
export const registerUser = async (req, res) => {
  try {
    const users = await readUsers();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const exists = users.find((u) => u.email === email);
    if (exists) return res.status(409).json({ success: false, message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), name, email, password: hashed };

    users.push(newUser);
    await writeUsers(users);

    res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const users = await readUsers();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, message: 'Login successfully', token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};
