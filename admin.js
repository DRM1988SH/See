const Admin = {
    getJobs() { return JSON.parse(localStorage.getItem('jobs') || '[]'); },
    saveJobs(j) { localStorage.setItem('jobs', JSON.stringify(j)); },
    getVideos() { return JSON.parse(localStorage.getItem('videos') || '[]'); },
    saveVideos(v) { localStorage.setItem('videos', JSON.stringify(v)); },
    getPosters() { return JSON.parse(localStorage.getItem('posters') || '[]'); },
    savePosters(p) { localStorage.setItem('posters', JSON.stringify(p)); },

    initData() {
        if (!this.getJobs().length) this.saveJobs([
            { id: 1, title: 'Aide Cuisinier', title_ar: 'مساعد طباخ', title_en: 'Kitchen Assistant', city: 'paris', contract: 'CDI', desc: 'Restaurant cherche aide cuisinier. Formation assurée.', desc_ar: 'مطعم يبحث عن مساعد طباخ.', desc_en: 'Restaurant seeks kitchen assistant.', date: '2024-01-15' },
            { id: 2, title: 'Agent Entretien', title_ar: 'عامل نظافة', title_en: 'Cleaner', city: 'lyon', contract: 'CDD', desc: 'Nettoyage bureaux.', desc_ar: 'تنظيف مكاتب.', desc_en: 'Office cleaning.', date: '2024-02-01' },
            { id: 3, title: 'Manutentionnaire', title_ar: 'عامل مناولة', title_en: 'Handler', city: 'marseille', contract: 'Intérim', desc: 'Entrepôt logistique.', desc_ar: 'مستودع لوجستي.', desc_en: 'Logistics warehouse.', date: '2024-02-15' }
        ]);
        if (!this.getVideos().length) this.saveVideos([
            { id: 1, title: 'Vos droits en France', title_ar: 'حقوقك في فرنسا', title_en: 'Your Rights', cat: 'legal', lang: 'fr' },
            { id: 2, title: 'Rédiger un CV', title_ar: 'كتابة السيرة', title_en: 'Writing CV', cat: 'emploi', lang: 'fr' }
        ]);
        if (!this.getPosters().length) this.savePosters([
            { id: 1, title: 'Connaissez vos droits', title_ar: 'اعرف حقوقك', title_en: 'Know Your Rights', topic: 'Droits' },
            { id: 2, title: 'Numéros urgence', title_ar: 'أرقام الطوارئ', title_en: 'Emergency', topic: 'Urgence' }
        ]);
    },

    render(tab) {
        const c = document.getElementById('adminContent');
        if (tab === 'dashboard') {
            const users = Auth.getUsers(), jobs = this.getJobs(), videos = this.getVideos();
            c.innerHTML = `<div class="cards-3">
                <div class="card"><h2>${users.length}</h2><p>Utilisateurs</p></div>
                <div class="card"><h2>${jobs.length}</h2><p>Offres</p></div>
                <div class="card"><h2>${videos.length}</h2><p>Vidéos</p></div>
            </div>`;
        } else if (tab === 'users') {
            const users = Auth.getUsers();
            c.innerHTML = `<table><tr><th>Nom</th><th>Email</th><th>Statut</th><th>Action</th></tr>
                ${users.map(u => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.status||'-'}</td><td><button class="btn-danger" onclick="Admin.deleteUser('${u.id}')">Supprimer</button></td></tr>`).join('')}</table>`;
        } else if (tab === 'jobs-admin') {
            const jobs = this.getJobs();
            c.innerHTML = `<button class="btn-primary" onclick="Admin.addJob()">+ Ajouter offre</button>
                <table style="margin-top:1rem"><tr><th>Titre</th><th>Ville</th><th>Contrat</th><th>Action</th></tr>
                ${jobs.map(j => `<tr><td>${j.title}</td><td>${j.city}</td><td>${j.contract}</td><td><button class="btn-danger" onclick="Admin.deleteJob(${j.id})">🗑️</button></td></tr>`).join('')}</table>`;
        } else if (tab === 'videos-admin') {
            const videos = this.getVideos();
            c.innerHTML = `<button class="btn-primary" onclick="Admin.addVideo()">+ Ajouter vidéo</button>
                <table style="margin-top:1rem"><tr><th>Titre</th><th>Catégorie</th><th>Action</th></tr>
                ${videos.map(v => `<tr><td>${v.title}</td><td>${v.cat}</td><td><button class="btn-danger" onclick="Admin.deleteVideo(${v.id})">🗑️</button></td></tr>`).join('')}</table>`;
        } else if (tab === 'admins') {
            const admins = Auth.getAdmins();
            c.innerHTML = `<button class="btn-primary" onclick="Admin.addAdmin()">+ Ajouter admin</button>
                <table style="margin-top:1rem"><tr><th>Email</th><th>Action</th></tr>
                ${admins.map(a => `<tr><td>${a}</td><td>${a!=='cashierpro32@gmail.com'?`<button class="btn-danger" onclick="Admin.removeAdmin('${a}')">🗑️</button>`:'<span class="badge badge-p">Principal</span>'}</td></tr>`).join('')}</table>`;
        }
    },

    deleteUser(id) { Auth.saveUsers(Auth.getUsers().filter(u => u.id !== id)); this.render('users'); toast('Utilisateur supprimé'); },
    deleteJob(id) { this.saveJobs(this.getJobs().filter(j => j.id !== id)); this.render('jobs-admin'); App.renderJobs(); toast(I18N.t('toast.jobDel')); },
    deleteVideo(id) { this.saveVideos(this.getVideos().filter(v => v.id !== id)); this.render('videos-admin'); App.renderVideos(); toast(I18N.t('toast.vidDel')); },
    addJob() {
        const title = prompt('Titre du poste:'), city = prompt('Ville:'), contract = prompt('Contrat (CDI/CDD):'), desc = prompt('Description:');
        if (title && city) {
            const jobs = this.getJobs();
            jobs.push({ id: Date.now(), title, city: city.toLowerCase(), contract, desc, date: new Date().toISOString().split('T')[0] });
            this.saveJobs(jobs);
            this.render('jobs-admin');
            App.renderJobs();
            toast(I18N.t('toast.jobAdd'));
        }
    },
    addVideo() {
        const title = prompt('Titre:'), cat = prompt('Catégorie:'), lang = prompt('Langue (fr/en/ar):');
        if (title) { const v = this.getVideos(); v.push({ id: Date.now(), title, cat, lang }); this.saveVideos(v); this.render('videos-admin'); App.renderVideos(); toast(I18N.t('toast.vidAdd')); }
    },
    addAdmin() {
        const email = prompt('Email du nouvel admin:');
        if (email) { const a = Auth.getAdmins(); if (!a.includes(email)) { a.push(email); Auth.saveAdmins(a); this.render('admins'); toast('✅ Admin ajouté'); } else toast('Déjà admin', 'warn'); }
    },
    removeAdmin(email) {
        Auth.saveAdmins(Auth.getAdmins().filter(a => a !== email));
        this.render('admins');
        toast('Admin supprimé');
    }
};
