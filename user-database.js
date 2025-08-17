// User Database Management System
class UserDatabase {
    constructor() {
        this.initializeDatabase();
    }

    initializeDatabase() {
        // Initialize admin user if not exists
        const users = this.getUsers();
        if (users.length === 0) {
            const adminUser = {
                id: this.generateId(),
                email: 'admin@lifeinvader.com',
                password: 'admin123', // In production, this should be hashed
                firstName: 'Admin',
                lastName: 'User',
                status: 'active',
                role: 'admin',
                createdAt: new Date().toISOString(),
                approvedAt: new Date().toISOString(),
                approvedBy: 'system'
            };
            this.saveUsers([adminUser]);
        }
    }

    generateId() {
        return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('lifeinvader_users') || '[]');
    }

    saveUsers(users) {
        localStorage.setItem('lifeinvader_users', JSON.stringify(users));
    }

    getUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    getUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    }

    createUser(userData) {
        const users = this.getUsers();
        
        // Check if email already exists
        if (this.getUserByEmail(userData.email)) {
            throw new Error('Email already exists');
        }

        const newUser = {
            id: this.generateId(),
            email: userData.email,
            password: userData.password, // In production, hash this
            firstName: userData.firstName,
            lastName: userData.lastName,
            status: 'pending', // New users start as pending
            role: 'user',
            createdAt: new Date().toISOString(),
            approvedAt: null,
            approvedBy: null,
            blockedAt: null,
            blockedBy: null,
            lastLogin: null
        };

        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    }

    updateUserStatus(userId, status, adminId = null) {
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        const user = users[userIndex];
        const now = new Date().toISOString();

        switch (status) {
            case 'active':
                user.status = 'active';
                user.approvedAt = now;
                user.approvedBy = adminId;
                user.blockedAt = null;
                user.blockedBy = null;
                break;
            case 'blocked':
                user.status = 'blocked';
                user.blockedAt = now;
                user.blockedBy = adminId;
                break;
            case 'pending':
                user.status = 'pending';
                user.approvedAt = null;
                user.approvedBy = null;
                user.blockedAt = null;
                user.blockedBy = null;
                break;
        }

        users[userIndex] = user;
        this.saveUsers(users);
        return user;
    }

    authenticateUser(email, password) {
        const user = this.getUserByEmail(email);
        
        if (!user) {
            throw new Error('Invalid email or password');
        }

        if (user.password !== password) {
            throw new Error('Invalid email or password');
        }

        if (user.status === 'blocked') {
            throw new Error('Your account has been blocked. Please contact support.');
        }

        if (user.status === 'pending') {
            throw new Error('Your account is pending approval. Please wait for admin approval.');
        }

        // Update last login
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex].lastLogin = new Date().toISOString();
        this.saveUsers(users);

        return user;
    }

    getUserStats() {
        const users = this.getUsers();
        return {
            total: users.length,
            active: users.filter(u => u.status === 'active').length,
            pending: users.filter(u => u.status === 'pending').length,
            blocked: users.filter(u => u.status === 'blocked').length
        };
    }

    getPendingUsers() {
        const users = this.getUsers();
        return users.filter(user => user.status === 'pending');
    }

    getBlockedUsers() {
        const users = this.getUsers();
        return users.filter(user => user.status === 'blocked');
    }
}

// Create global instance
window.UserDB = new UserDatabase();