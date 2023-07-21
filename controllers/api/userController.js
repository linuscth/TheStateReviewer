const { User } = require('../../models');

// User registration controller
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

// User login controller
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !user.checkPassword(password)) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.logged_in = true;
            res.status(200).json(user);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

// User logout controller
const logoutUser = (req, res) => {
    try {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { createUser, loginUser, logoutUser };