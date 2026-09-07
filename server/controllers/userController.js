import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
};

const verifyPassword = (password, stored) => {
    const [salt, key] = stored.split(':');
    if (!salt || !key || !/^[0-9a-f]+$/i.test(key)) return false;
    const derived = crypto.scryptSync(password, salt, 64).toString('hex');
    const storedKey = Buffer.from(key, 'hex');
    const derivedKey = Buffer.from(derived, 'hex');
    if (storedKey.length !== derivedKey.length) return false;
    return crypto.timingSafeEqual(storedKey, derivedKey);
};

const createToken = (user) => jwt.sign(
    { id: user._id.toString(), email: user.email, type: 'user' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
);

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name?.trim() || !email?.trim() || !password) {
            return res.json({ success: false, message: 'Name, email and password are required.' });
        }
        if (password.length < 6) {
            return res.json({ success: false, message: 'Password must be at least 6 characters.' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) return res.json({ success: false, message: 'An account with this email already exists.' });

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashPassword(password),
        });

        const token = createToken(user);
        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email },
            message: 'Account created successfully.'
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email?.trim() || !password) {
            return res.json({ success: false, message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user || !verifyPassword(password, user.password)) {
            return res.json({ success: false, message: 'Invalid email or password.' });
        }

        const token = createToken(user);
        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email },
            message: 'Signed in successfully.'
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
