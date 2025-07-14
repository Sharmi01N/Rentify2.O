document.addEventListener('DOMContentLoaded', function() {
    // Show user name
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'user') {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('userName').textContent = user.name;

    // Logout
    window.logout = function() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    };

    // Fetch and display all products
    async function fetchProducts() {
        try {
            const res = await fetch('https://rentify2-o-1.onrender.com/api/products');
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
                <p style="font-size:0.9rem;color:#888;">Posted by: ${product.owner?.name || 'Seller'}</p>
            </div>
        `).join('');
    }

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
        window.location.href = 'user_dashboard.html';
    });

    // Complaint form
    document.getElementById('complaintForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const message = document.getElementById('complaintMessage').value;
        try {
            const res = await fetch('https://rentify2-o-1.onrender.com/api/complaints', {
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
                document.getElementById('complaintForm').reset();
            } else {
                alert(data.message || 'Failed to send complaint');
            }
        } catch (err) {
            alert('Server error. Please try again later.');
        }
    });

    // Initial fetch
    fetchProducts();
}); 
