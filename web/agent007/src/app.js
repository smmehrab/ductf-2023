const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    const userAgent = req.get('User-Agent');
    if (userAgent && userAgent === '007') {
        res.send('Congratulations Agent 007!\nduCTF{u$3r_4g3nt_1$_n0t_4_s3cur3_w4y_t0_4uth3nt1c4t3}');
    } else {
        res.send('I never miss.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
