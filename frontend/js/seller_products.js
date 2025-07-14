document.addEventListener('DOMContentLoaded', function() {
    // Show seller info
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'seller') {
        window.location.href = 'login.html';
        return;
    }

    // Logout
    window.logout = function() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    };

    // Product upload
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(uploadForm);
        try {
            const res = await fetch('http://localhost:5000/api/products', {
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
                alert((data && data.message) ? data.message : 'Upload failed');
                console.error('Product upload error:', data);
            }
        } catch (err) {
            alert('Server error. Please try again later.');
            console.error('Product upload error:', err);
        }
    });

    // Complaint form for sellers
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm) {
        complaintForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const message = document.getElementById('complaintMessage').value;
            try {
                const res = await fetch('http://localhost:5000/api/complaints', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({ message })
                });
                const data = await res.json();
                if (res.ok) {
                    alert('Complaint sent to admin!');
                    complaintForm.reset();
                } else {
                    alert(data.message || 'Failed to send complaint');
                }
            } catch (err) {
                alert('Server error. Please try again later.');
            }
        });
    }

    // Fetch and display seller's products
    async function fetchProducts() {
        try {
            const res = await fetch('http://localhost:5000/api/products/my', {
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
                <img src="http://localhost:5000/uploads/${product.image}" alt="Product Image">
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
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
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

    // Search products using only the navbar search bar
    document.getElementById('navbarSearchInput').addEventListener('input', function(e) {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
            renderProducts(window.allProducts);
            return;
        }
        const filtered = window.allProducts.filter(p =>
            (p.title && p.title.toLowerCase().includes(query)) ||
            (p.location && p.location.toLowerCase().includes(query)) ||
            (p.contact && p.contact.toLowerCase().includes(query))
        );
        renderProducts(filtered);
    });

    // Navbar profile pic click → profile edit
    document.getElementById('navbarProfilePic').addEventListener('click', function() {
        window.location.href = 'seller_profile.html';
    });

    // Initial fetch
    fetchProducts();
}); 