async function testLogin() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'monasri9c.vhs@gmail.com',
                password: 'admin123'
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login Successful:', data);
        } else {
            console.error('Login Failed:', data);
        }
    } catch (error) {
        console.error('Request Error:', error);
    }
}

testLogin();
