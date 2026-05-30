const Auth = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    adminEmail: 'cashierpro32@gmail.com',
    adminPass: '123',

    getUsers() { return JSON.parse(localStorage.getItem('users') || '[]'); },
    saveUsers(u) { localStorage.setItem('users', JSON.stringify(u)); },
    getAdmins() { return JSON.parse(localStorage.getItem('admins') || `["${this.adminEmail}"]`); },
    saveAdmins(a) { localStorage.setItem('admins', JSON.stringify(a)); },
    isLoggedIn() { return !!this.user; },
    isAdmin() { return this.user && this.getAdmins().includes(this.user.email); },

    login(u) {
        this.user = u;
        localStorage.setItem('user', JSON.stringify(u));
        this.updateUI();
    },

    logout() {
        this.user = null;
        localStorage.removeItem('user');
        this.updateUI();
        toast(I18N.t('toast.logoutOk'));
    },

    updateUI() {
        const logged = this.isLoggedIn();
        const admin = this.isAdmin();
        document.getElementById('btnLogin').classList.toggle('hidden', logged);
        document.getElementById('btnRegister').classList.toggle('hidden', logged);
        document.getElementById('btnLogout').classList.toggle('hidden', !logged);
        document.querySelectorAll('.admin-only').forEach(el => el.classList.toggle('hidden', !admin));
        if (logged) {
            document.getElementById('btnLogout').insertAdjacentHTML('beforebegin', `<span class="user-badge">👤 ${this.user.name}</span>`);
        }
    },

    registerEmail(name, email, pass) {
        const users = this.getUsers();
        if (users.find(u => u.email === email)) return toast('Email déjà utilisé', 'err');
        const user = { id: 'u' + Date.now(), name, email, password: pass, provider: 'email', createdAt: new Date().toISOString() };
        users.push(user);
        this.saveUsers(users);
        this.login(user);
        toast(I18N.t('toast.regOk'));
        App.showSection('profile-sec');
    },

    registerSocial(provider, email, name) {
        const users = this.getUsers();
        let user = users.find(u => u.email === email);
        if (!user) {
            user = { id: 'u' + Date.now(), name, email, provider, createdAt: new Date().toISOString() };
            users.push(user);
            this.saveUsers(users);
        }
        this.login(user);
        toast(I18N.t('toast.regOk'));
        App.showSection('profile-sec');
    },

    attemptLogin(email, pass) {
        if (email === this.adminEmail && pass === this.adminPass) {
            let users = this.getUsers();
            let user = users.find(u => u.email === email);
            if (!user) {
                user = { id: 'admin1', name: 'Admin Principal', email, password: pass, provider: 'email', status: 'admin', profileComplete: true, createdAt: new Date().toISOString() };
                users.push(user);
                this.saveUsers(users);
            }
            this.login(user);
            toast('✅ Admin connecté !');
            return true;
        }
        const user = this.getUsers().find(u => u.email === email && u.password === pass);
        if (user) { this.login(user); toast(I18N.t('toast.loginOk')); return true; }
        toast(I18N.t('toast.loginErr'), 'err');
        return false;
    }
};
