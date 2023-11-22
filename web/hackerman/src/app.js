const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    if (req.body.username === 'abdbd' && req.body.password === 'ami_ace_kori') {
        res.json({ success: true, flag: 'duCTF{4bdu114h_kh314_p4r3_n4}' });
    } else {
        res.json({ success: false });
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
