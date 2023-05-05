document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/DataUsers')
    .then(response => response.json()) 
    .then(users => {
        const user = users.find(u => u.Username === username && u.Password === password);

        if (user) {
        window.location.href = 'http://localhost:3000/pages/index.html';
        } else {
        alert('Invalid username or password.');
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        alert('An error occurred while logging in. Please try again later.');
    });
});