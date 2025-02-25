
document.getElementById('LoginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if (username === '' || password === '') {
        alert('Both username and password fields are required.');
        return;
    }

    try {
        const response = await fetch('/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            
            window.location.href = '/dashboard';
        } else {
            
            alert(data.message || 'Login failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while trying to log in.');
    }
});

function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    
    if (username === '' || password === '') {
        alert('Both username and password fields are required.');
        return false;
    }
    
    return true; 
}
