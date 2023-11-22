function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username === 'abdbd' && password === 'ami_ace_kori') {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login successful! Flag: ' + data.flag);
            } else {
                alert('Login failed. Try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Invalid username or password');
    }
}
