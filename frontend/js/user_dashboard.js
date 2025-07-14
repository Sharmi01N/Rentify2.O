document.addEventListener('DOMContentLoaded', function() {
    // Show user info
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'user') {
        window.location.href = 'login.html';
        return;
    }

    // Fetch user profile from backend
    async function fetchProfile() {
        try {
            const res = await fetch('https://rentify2-o-1.onrender.com/api/auth/profile', {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            });
            const data = await res.json();
            if (data.user) {
                document.getElementById('name').value = data.user.name;
                document.getElementById('contact').value = data.user.contact || '';
                document.getElementById('address').value = data.user.address || '';
                document.getElementById('location').value = data.user.location || '';
                document.getElementById('mobile').value = data.user.mobile || '';
                if (data.user.profilePic) {
                    document.getElementById('profilePicPreview').src = 'https://rentify2-o-1.onrender.com/uploads/' + data.user.profilePic;
                }
            }
        } catch (err) {}
    }

    fetchProfile();

    // Logout
    window.logout = function() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    };

    // Profile picture preview
    document.getElementById('profilePicInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                document.getElementById('profilePicPreview').src = ev.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Profile update
    document.getElementById('profileForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(document.getElementById('profileForm'));
        try {
            const res = await fetch('https://rentify2-o-1.onrender.com/api/auth/profile', {
                method: 'PATCH',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                alert('Profile updated!');
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = 'user_home.html';
            } else {
                alert((data && data.message) ? data.message : 'Update failed');
                console.error('Profile update error:', data);
            }
        } catch (err) {
            alert('Server error. Please try again later.');
            console.error('Profile update error:', err);
        }
    });
}); 
