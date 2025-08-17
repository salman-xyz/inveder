// User Status Checker - Runs on all user pages to check account status
class UserStatusChecker {
    constructor() {
        this.checkInterval = 30000; // Check every 30 seconds
        this.init();
    }

    init() {
        // Only run on user pages (not admin pages)
        if (window.location.pathname.includes('admin-')) {
            return;
        }

        this.startStatusChecking();
    }

    startStatusChecking() {
        // Check immediately
        this.checkUserStatus();
        
        // Then check periodically
        setInterval(() => {
            this.checkUserStatus();
        }, this.checkInterval);
    }

    checkUserStatus() {
        const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
        
        if (!userSession.isLoggedIn || !userSession.userId) {
            return;
        }

        try {
            const user = window.UserDB.getUserById(userSession.userId);
            
            if (!user) {
                this.handleAccountIssue('Your account no longer exists. Please contact support.');
                return;
            }

            switch (user.status) {
                case 'blocked':
                    this.handleAccountIssue('Your account has been blocked. Please contact support.');
                    break;
                case 'pending':
                    this.handleAccountIssue('Your account is pending approval. Please wait for admin approval.');
                    break;
                case 'active':
                    // Account is fine, continue
                    break;
                default:
                    this.handleAccountIssue('Your account status is invalid. Please contact support.');
            }
        } catch (error) {
            console.error('Error checking user status:', error);
        }
    }

    handleAccountIssue(message) {
        // Clear session data
        localStorage.removeItem('userSession');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        
        // Show message and redirect
        alert(message);
        window.location.href = 'landing.html';
    }
}

// Initialize status checker on page load
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.UserDB !== 'undefined') {
        new UserStatusChecker();
    }
});