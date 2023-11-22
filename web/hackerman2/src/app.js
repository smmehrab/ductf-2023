const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    if (req.body.username === 'zuko' && req.body.password === 'liverpool') {
        res.json({ success: true, flag: 'duCTF{h4ck3rm4n_1n_4_b4$364_h00d13}' });
    } else {
        res.json({ success: false });
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
