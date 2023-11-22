const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
const secret = 'place your jwt secret here';
const flag = 'duCTF{3x4m$_4r3_0v3r4t3d_4nyw4y}';

const users = [
    { username: 'ductf', password: 'ebar_pl_e_khela_hobe', role: 'user' }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile('login.html', { root: path.join(__dirname, 'public') });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const tokenData = { username: user.username, role: user.role };
        const weakToken = jwt.sign(tokenData, secret);
        res.cookie('token', weakToken, { httpOnly: true });
        res.redirect('/flag');
    } else {
        res.send('Invalid credentials.');
    }
});

app.get('/flag', (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.send('Invalid token.');
        } else {
            if (decoded.role === 'admin') {
                res.send(`Congratulations! Here is the flag: ${flag}`);
            } else {
                res.send('Sorry, FLAG only for admins.');
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
