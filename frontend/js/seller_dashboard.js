document.addEventListener('DOMContentLoaded', function() {
    // Show seller info
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'seller') {
        window.location.href = 'login.html';
        return;
    }

    // Fetch seller profile from backend
    async function fetchProfile() {
        try {
            const res = await fetch('https://rentify2-o-1.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, password: '' }) // password not needed, just for demo
            });
            const data = await res.json();
            if (data.user) {
                document.getElementById('name').value = data.user.name;
                document.getElementById('contact').value = data.user.contact || '';
                document.getElementById('address').value = data.user.address || '';
                if (data.user.profilePic) {
                    document.getElementById('profilePicPreview').src = 'http://localhost:5000/uploads/' + data.user.profilePic;
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
                fetchProfile();
            } else {
                alert(data.message || 'Update failed');
            }
        } catch (err) {
            alert('Server error. Please try again later.');
        }
    });

    // Product upload
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(uploadForm);
        try {
            const res = await fetch('https://rentify2-o-1.onrender.com/api/products', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                alert('Product added!');
                uploadForm.reset();
                fetchProducts();
            } else {
                alert(data.message || 'Upload failed');
            }
        } catch (err) {
            alert('Server error. Please try again later.');
        }
    });

    // Fetch and display seller's products
    async function fetchProducts() {
        try {
            const res = await fetch('https://rentify2-o-1.onrender.com/user', {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            });
            const products = await res.json();
            window.allProducts = products;
            renderProducts(products);
        } catch (err) {
            document.getElementById('productList').innerHTML = '<p>Could not load products.</p>';
        }
    }

    // Render products
    function renderProducts(products) {
        const list = document.getElementById('productList');
        if (!products.length) {
            list.innerHTML = '<p>No products found.</p>';
            return;
        }
        list.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="https://rentify2-o-1.onrender.com/uploads/${product.image}" alt="Product Image">
                <h4>${product.title}</h4>
                <p><b>Location:</b> ${product.location}</p>
                <p><b>Contact:</b> ${product.contact}</p>
                <p><b>Price:</b> ${product.price} ৳/month</p>
                <p><b>Duration:</b> ${product.duration} month(s)</p>
                <button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>
            </div>
        `).join('');
    }

    // Delete product
    window.deleteProduct = async function(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await fetch(`https://rentify2-o-1.onrender.com/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            });
            const data = await res.json();
            if (res.ok) {
                fetchProducts();
            } else {
                alert(data.message || 'Delete failed');
            }
        } catch (err) {
            alert('Server error. Please try again later.');
        }
    };

    // Search products
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const filtered = window.allProducts.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.location.toLowerCase().includes(query) ||
            p.contact.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });

    // Initial fetch
    fetchProducts();
}); 
