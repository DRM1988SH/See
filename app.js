const App = {
    init() {
        Admin.initData();
        I18N.apply();
        Auth.updateUI();
        this.renderAll();
        this.setupEvents();
        if (Auth.isLoggedIn()) document.getElementById('register-sec').classList.add('hidden');
        console.log('✅ Horizons d\'Avenir - Production Ready');
    },

    setupEvents() {
        document.getElementById('langSwitch').addEventListener('change', e => I18N.switch(e.target.value));
        document.getElementById('btnLogin').addEventListener('click', () => {
            const email = prompt('Email:'), pass = prompt('Mot de passe:');
            if (email && pass) Auth.attemptLogin(email, pass);
        });
        document.getElementById('btnRegister').addEventListener('click', () => this.showSection('register-sec'));
        document.getElementById('btnLogout').addEventListener('click', () => { Auth.logout(); this.showSection('home'); });
        document.getElementById('emailRegister').addEventListener('submit', e => {
            e.preventDefault();
            Auth.registerEmail(document.getElementById('regName').value, document.getElementById('regEmail').value, document.getElementById('regPass').value);
        });
        document.getElementById('profileForm').addEventListener('submit', e => {
            e.preventDefault();
            Auth.user.status = document.getElementById('profStatus').value;
            Auth.user.city = document.getElementById('profCity').value;
            Auth.user.profileComplete = true;
            localStorage.setItem('user', JSON.stringify(Auth.user));
            Auth.updateUI();
            this.showSection('jobs');
            toast(I18N.t('toast.profOk'));
        });
        document.getElementById('googleSignup').addEventListener('click', () => window.open('https://accounts.google.com/signin', 'googleAuth', 'width=500,height=600'));
        document.getElementById('facebookSignup').addEventListener('click', () => window.open('https://facebook.com/login', 'fbAuth', 'width=500,height=600'));
        document.getElementById('phoneSignup').addEventListener('click', () => {
            const phone = prompt('Téléphone (+33):'), name = prompt('Nom:');
            if (phone && name) Auth.registerSocial('phone', phone, name);
        });
        document.getElementById('jobSearch').addEventListener('input', () => this.renderJobs());
        document.getElementById('jobCity').addEventListener('change', () => this.renderJobs());
        document.getElementById('jobContract').addEventListener('change', () => this.renderJobs());
        document.querySelectorAll('.admin-tabs button').forEach(b => b.addEventListener('click', function() {
            document.querySelectorAll('.admin-tabs button').forEach(x => x.classList.remove('active'));
            this.classList.add('active');
            Admin.render(this.dataset.atab);
        }));
        document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href').replace('#', '');
            if (id === 'admin' && !Auth.isAdmin()) return toast('Accès réservé admin', 'warn');
            App.showSection(id);
        }));
    },

    showSection(id) {
        document.querySelectorAll('main > section').forEach(s => s.classList.add('hidden'));
        const sec = document.getElementById(id);
        if (sec) { sec.classList.remove('hidden'); if (id === 'admin') Admin.render('dashboard'); }
    },

    renderAll() {
        this.renderJobs();
        this.renderVideos();
        this.renderPosters();
        this.populateCities();
    },

    renderJobs() {
        const container = document.getElementById('jobsList');
        let jobs = Admin.getJobs();
        const city = document.getElementById('jobCity').value;
        const contract = document.getElementById('jobContract').value;
        const search = document.getElementById('jobSearch').value.toLowerCase();
        if (city) jobs = jobs.filter(j => j.city === city);
        if (contract) jobs = jobs.filter(j => j.contract === contract);
        if (search) jobs = jobs.filter(j => j.title.toLowerCase().includes(search) || j.desc.toLowerCase().includes(search));
        if (!jobs.length) { container.innerHTML = `<p>${I18N.t('jobs.no')}</p>`; return; }
        container.innerHTML = jobs.map(j => `
            <div class="job-card">
                <h4>${j['title_' + I18N.lang] || j.title}</h4>
                <span class="badge badge-p">📍 ${j.city}</span>
                <span class="badge badge-s">📄 ${j.contract}</span>
                <p>${j['desc_' + I18N.lang] || j.desc}</p>
                <small>${I18N.t('jobs.pub')}: ${j.date}</small>
                <br><button class="btn-primary" onclick="App.applyJob(${j.id})">${I18N.t('jobs.apply')}</button>
            </div>`).join('');
    },

    renderVideos() {
        const container = document.getElementById('videosList');
        const videos = Admin.getVideos();
        if (!videos.length) { container.innerHTML = `<p>${I18N.t('vid.no')}</p>`; return; }
        container.innerHTML = videos.map(v => `
            <div class="card" style="cursor:pointer"><i class="fas fa-play-circle" style="font-size:3rem;color:#764ba2"></i>
                <h4>${v['title_' + I18N.lang] || v.title}</h4><p>${v.cat} | 🌐 ${v.lang.toUpperCase()}</p></div>`).join('');
    },

    renderPosters() {
        document.getElementById('postersList').innerHTML = Admin.getPosters().map(p => `
            <div class="card" style="cursor:pointer"><i class="fas fa-image" style="font-size:3rem;color:#f5576c"></i>
                <h4>${p['title_' + I18N.lang] || p.title}</h4><span class="badge badge-p">${p.topic}</span></div>`).join('');
    },

    populateCities() {
        const select = document.getElementById('jobCity');
        const cities = [...new Set(Admin.getJobs().map(j => j.city))];
        select.innerHTML = '<option value="">Toutes les villes</option>' + cities.map(c => `<option value="${c}">${c}</option>`).join('');
    },

    applyJob(id) {
        if (!Auth.isLoggedIn()) return toast(I18N.t('toast.loginReq'), 'warn');
        if (!Auth.user.profileComplete) return toast(I18N.t('toast.profReq'), 'warn');
        const job = Admin.getJobs().find(j => j.id === id);
        if (job) toast(`${I18N.t('toast.apply')}${job.title}`);
    }
};

function toast(msg, type = 'ok') {
    const t = document.createElement('div');
    t.className = `toast-msg toast-${type}`;
    t.textContent = msg;
    document.getElementById('toast').appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => App.init());
