document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = form.name.value;
        const location = form.location.value;
        const mobile = form.mobile.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, location, mobile, email, password, role })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Registration successful! Please login.');
                window.location.href = 'login.html';
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            alert('Server error. Please try again later.');
        }
    });
}); 