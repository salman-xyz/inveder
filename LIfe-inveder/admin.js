// Admin Panel Core JavaScript
// Authentication and Shared Functionality

// Authentication functions
function isAuthenticated() {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) return false;
    
    try {
        const session = JSON.parse(adminSession);
        const currentTime = Date.now();
        
        // Check if session is expired (24 hours)
        if (currentTime - session.timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('adminSession');
            return false;
        }
        
        return session.authenticated === true;
    } catch (e) {
        return false;
    }
}

function setAuthenticated() {
    const session = {
        authenticated: true,
        timestamp: Date.now(),
        user: 'admin'
    };
    localStorage.setItem('adminSession', JSON.stringify(session));
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminSession');
        window.location.href = 'admin-login.html';
    }
}

// Notification system
function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// Navigation functions
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href && link.href.includes(currentPath.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

// Form validation
function validateForm(formData, requiredFields) {
    const errors = [];
    
    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].toString().trim() === '') {
            errors.push(`${field} is required`);
        }
    });
    
    return errors;
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Table functions
function sortTable(table, column, direction = 'asc') {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const sortedRows = rows.sort((a, b) => {
        const aText = a.cells[column].textContent.trim();
        const bText = b.cells[column].textContent.trim();
        
        // Try to parse as numbers first
        const aNum = parseFloat(aText);
        const bNum = parseFloat(bText);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // Sort as text
        return direction === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
    });
    
    // Clear tbody and append sorted rows
    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
}

function filterTable(table, searchTerm, columns = null) {
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cells = Array.from(row.cells);
        const searchColumns = columns ? columns.map(i => cells[i]) : cells;
        
        const found = searchColumns.some(cell => 
            cell.textContent.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        row.style.display = found ? '' : 'none';
    });
}

// Data export functions
function exportTableToCSV(table, filename = 'data.csv') {
    const rows = Array.from(table.querySelectorAll('tr'));
    const csvContent = rows.map(row => {
        const cells = Array.from(row.cells);
        return cells.map(cell => {
            // Clean cell content and handle commas
            let content = cell.textContent.trim();
            content = content.replace(/"/g, '""'); // Escape quotes
            return `"${content}"`; // Wrap in quotes
        }).join(',');
    }).join('\n');
    
    downloadCSV(csvContent, filename);
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Database simulation functions
class AdminDatabase {
    static getUsers() {
        return JSON.parse(localStorage.getItem('adminUsers') || '[]');
    }
    
    static saveUsers(users) {
        localStorage.setItem('adminUsers', JSON.stringify(users));
    }
    
    static getCars() {
        return JSON.parse(localStorage.getItem('adminCars') || '[]');
    }
    
    static saveCars(cars) {
        localStorage.setItem('adminCars', JSON.stringify(cars));
    }
    
    static getClothing() {
        return JSON.parse(localStorage.getItem('adminClothing') || '[]');
    }
    
    static saveClothing(clothing) {
        localStorage.setItem('adminClothing', JSON.stringify(clothing));
    }
    
    static getItems() {
        return JSON.parse(localStorage.getItem('adminItems') || '[]');
    }
    
    static saveItems(items) {
        localStorage.setItem('adminItems', JSON.stringify(items));
    }
    
    static generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }
    
    static initializeSampleData() {
        // Initialize sample users if none exist
        if (this.getUsers().length === 0) {
            const sampleUsers = [
                {
                    id: this.generateId(),
                    username: 'john_doe',
                    email: 'john@example.com',
                    status: 'active',
                    role: 'user',
                    joinDate: '2024-01-15',
                    lastLogin: '2024-01-20'
                },
                {
                    id: this.generateId(),
                    username: 'jane_smith',
                    email: 'jane@example.com',
                    status: 'active',
                    role: 'user',
                    joinDate: '2024-01-16',
                    lastLogin: '2024-01-19'
                },
                {
                    id: this.generateId(),
                    username: 'spam_user',
                    email: 'spam@example.com',
                    status: 'blocked',
                    role: 'user',
                    joinDate: '2024-01-10',
                    lastLogin: '2024-01-10'
                }
            ];
            this.saveUsers(sampleUsers);
        }
        
        // Initialize sample cars if none exist
        if (this.getCars().length === 0) {
            const sampleCars = [
                {
                    id: this.generateId(),
                    name: 'Adder',
                    brand: 'Truffade',
                    category: 'Sports',
                    price: 1000000,
                    topSpeed: 250,
                    acceleration: 9.5,
                    handling: 8.8,
                    image: 'adder.jpg',
                    description: 'Luxury supercar with exceptional performance'
                },
                {
                    id: this.generateId(),
                    name: 'Zentorno',
                    brand: 'Pegassi',
                    category: 'Super',
                    price: 725000,
                    topSpeed: 240,
                    acceleration: 9.8,
                    handling: 8.5,
                    image: 'zentorno.jpg',
                    description: 'High-performance racing machine'
                }
            ];
            this.saveCars(sampleCars);
        }
        
        // Initialize sample clothing if none exist
        if (this.getClothing().length === 0) {
            const sampleClothing = [
                {
                    id: this.generateId(),
                    name: 'Designer Suit',
                    category: 'Formal',
                    price: 2500,
                    brand: 'Ponsonbys',
                    gender: 'Male',
                    colors: ['Black', 'Navy', 'Charcoal'],
                    image: 'designer-suit.jpg',
                    description: 'Premium formal wear for business occasions'
                },
                {
                    id: this.generateId(),
                    name: 'Street Hoodie',
                    category: 'Casual',
                    price: 150,
                    brand: 'SubUrban',
                    gender: 'Unisex',
                    colors: ['Black', 'White', 'Gray', 'Red'],
                    image: 'street-hoodie.jpg',
                    description: 'Comfortable casual hoodie for everyday wear'
                }
            ];
            this.saveClothing(sampleClothing);
        }
        
        // Initialize sample items if none exist
        if (this.getItems().length === 0) {
            const sampleItems = [
                {
                    id: this.generateId(),
                    name: 'Gold Watch',
                    category: 'Accessories',
                    price: 5000,
                    rarity: 'Rare',
                    type: 'Luxury',
                    image: 'gold-watch.jpg',
                    description: 'Exclusive luxury timepiece'
                },
                {
                    id: this.generateId(),
                    name: 'Diamond Ring',
                    category: 'Jewelry',
                    price: 15000,
                    rarity: 'Legendary',
                    type: 'Premium',
                    image: 'diamond-ring.jpg',
                    description: 'Sparkling diamond engagement ring'
                }
            ];
            this.saveItems(sampleItems);
        }
    }
}

// Image upload handler
function handleImageUpload(input, previewElement) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            showNotification('Please select a valid image file (JPEG, PNG, GIF)', 'error');
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Image size must be less than 5MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            if (previewElement) {
                previewElement.src = e.target.result;
                previewElement.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
}

// Search functionality
function initializeSearch(searchInput, table, columns = null) {
    if (!searchInput || !table) return;
    
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterTable(table, this.value, columns);
        }, 300);
    });
}

// Pagination
function initializePagination(table, itemsPerPage = 10) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    let currentPage = 1;
    const totalPages = Math.ceil(rows.length / itemsPerPage);
    
    function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        rows.forEach((row, index) => {
            row.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
        });
        
        updatePaginationControls();
    }
    
    function updatePaginationControls() {
        const existingControls = table.parentElement.querySelector('.pagination-controls');
        if (existingControls) {
            existingControls.remove();
        }
        
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'pagination-controls';
        paginationDiv.style.cssText = 'display: flex; justify-content: center; align-items: center; gap: 1rem; padding: 1rem; margin-top: 1rem;';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.className = 'btn btn-outline';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        };
        
        // Page info
        const pageInfo = document.createElement('span');
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        pageInfo.style.color = 'var(--admin-text-muted)';
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.className = 'btn btn-outline';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        };
        
        paginationDiv.appendChild(prevBtn);
        paginationDiv.appendChild(pageInfo);
        paginationDiv.appendChild(nextBtn);
        
        table.parentElement.appendChild(paginationDiv);
    }
    
    // Initialize first page
    if (rows.length > itemsPerPage) {
        showPage(1);
    }
}

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('adminTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('adminTheme', newTheme);
}

// Initialize admin panel
function initializeAdmin() {
    // Initialize sample data
    AdminDatabase.initializeSampleData();
    
    // Set active navigation
    setActiveNavLink();
    
    // Initialize theme
    initializeTheme();
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle escape key for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="flex"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
    });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdmin);
} else {
    initializeAdmin();
}
