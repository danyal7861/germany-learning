import db from './db.js';
import bcrypt from 'bcryptjs';

const User = {
    create: (user) => {
        const { name, email, password } = user;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        return db.promise().query(query, [name, email, hashedPassword]);
    },
    findByEmail: (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        return db.promise().query(query, [email]);
    },
    findById: (id) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        return db.promise().query(query, [id]);
    }
};

export default User;