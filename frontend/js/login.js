document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;
        try {
            const res = await fetch('https://rentify2-o-1.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok && data.user.role === role) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                if (role === 'user') {
                    window.location.href = 'user_home.html';
                } else {
                    window.location.href = 'seller_products.html';
                }
            } else {
                alert(data.message || 'Login failed or role mismatch');
            }
        } catch (err) {
            alert('Server error. Please try again later.');
        }
    });
}); 
