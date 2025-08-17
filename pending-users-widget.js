// Pending Users Widget for Admin Dashboard
class PendingUsersWidget {
    constructor() {
        this.init();
    }

    init() {
        this.createWidget();
        this.updateWidget();
        
        // Update every 30 seconds
        setInterval(() => {
            this.updateWidget();
        }, 30000);
    }

    createWidget() {
        const widgetHTML = `
            <div class="table-container" id="pendingUsersWidget" style="margin-bottom: 2rem;">
                <div class="table-header">
                    <h3>Pending User Approvals</h3>
                    <span class="status-badge status-pending" id="pendingCount">0 pending</span>
                </div>
                <div id="pendingUsersList" style="max-height: 300px; overflow-y: auto;">
                    <!-- Pending users will be loaded here -->
                </div>
            </div>
        `;

        // Insert widget after the stats grid
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid) {
            statsGrid.insertAdjacentHTML('afterend', widgetHTML);
        }
    }

    updateWidget() {
        const pendingUsers = window.UserDB.getPendingUsers();
        const pendingCount = document.getElementById('pendingCount');
        const pendingList = document.getElementById('pendingUsersList');

        if (!pendingCount || !pendingList) return;

        pendingCount.textContent = `${pendingUsers.length} pending`;

        if (pendingUsers.length === 0) {
            pendingList.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--admin-text-muted);">
                    <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>No pending user approvals</p>
                </div>
            `;
            return;
        }

        const usersHTML = pendingUsers.map(user => {
            const createdDate = new Date(user.createdAt).toLocaleDateString();
            return `
                <div style="padding: 1rem; border-bottom: 1px solid var(--admin-border); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: var(--admin-text);">${user.firstName} ${user.lastName}</strong>
                        <br>
                        <small style="color: var(--admin-text-muted);">${user.email}</small>
                        <br>
                        <small style="color: var(--admin-text-muted);">Registered: ${createdDate}</small>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-success" onclick="quickApproveUser('${user.id}')" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
                            <i class="fas fa-check"></i> Approve
                        </button>
                        <button class="btn btn-danger" onclick="quickRejectUser('${user.id}')" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
                            <i class="fas fa-times"></i> Reject
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        pendingList.innerHTML = usersHTML;
    }
}

// Quick action functions
function quickApproveUser(userId) {
    if (confirm('Approve this user account?')) {
        try {
            const currentUser = JSON.parse(localStorage.getItem('userSession') || '{}');
            window.UserDB.updateUserStatus(userId, 'active', currentUser.userId);
            
            // Update widget and main user list if on users page
            if (window.pendingWidget) {
                window.pendingWidget.updateWidget();
            }
            if (typeof loadUsers === 'function') {
                loadUsers();
                updateUserStats();
            }
            if (typeof updateStats === 'function') {
                updateStats();
            }
            
            showNotification('User approved successfully', 'success');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }
}

function quickRejectUser(userId) {
    if (confirm('Reject and delete this user account? This action cannot be undone.')) {
        try {
            const users = window.UserDB.getUsers();
            const filteredUsers = users.filter(u => u.id !== userId);
            window.UserDB.saveUsers(filteredUsers);
            
            // Update widget and main user list if on users page
            if (window.pendingWidget) {
                window.pendingWidget.updateWidget();
            }
            if (typeof loadUsers === 'function') {
                loadUsers();
                updateUserStats();
            }
            if (typeof updateStats === 'function') {
                updateStats();
            }
            
            showNotification('User rejected and deleted', 'warning');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }
}

// Initialize widget on dashboard
if (window.location.pathname.includes('admin-dashboard.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            window.pendingWidget = new PendingUsersWidget();
        }, 500);
    });
}