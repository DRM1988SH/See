const I18N = {
    lang: localStorage.getItem('lang') || 'fr',
    data: {
        fr: {
            brand: "Horizons d'Avenir",
            nav: { home: "Accueil", jobs: "Emplois", training: "Formations", videos: "Vidéos", posters: "Affiches", legal: "Droit", admin: "🔧 Admin" },
            login: "Connexion", register: "Inscription", logout: "Déconnexion",
            home: { title: "Bienvenue sur Horizons d'Avenir", sub: "Plateforme d'insertion professionnelle pour réfugiés et migrants en France.", card1: "Emplois", card1d: "Offres dans votre ville", card2: "Formations", card2d: "Coursera, LinkedIn, Pôle Emploi", card3: "Droits", card3d: "Vos droits en France et en Europe" },
            reg: { title: "Créer votre compte", or: "ou par email", name: "Nom complet", pass: "Mot de passe (6+ caractères)", btn: "S'inscrire" },
            prof: { title: "Compléter votre profil", save: "✓ Enregistrer le profil" },
            jobs: { title: "Offres d'Emploi", search: "🔍 Rechercher un emploi...", no: "Aucune offre trouvée.", apply: "Postuler", pub: "Publié le" },
            train: { title: "Formations et Apprentissage", c: "Cours gratuits pour réfugiés", l: "Compétences professionnelles", p: "Formations officielles France" },
            vid: { title: "Vidéos Éducatives", no: "Aucune vidéo disponible." },
            post: { title: "Affiches Informatives" },
            legal: { title: "Cadre Juridique" },
            footer: { links: "Liens Rapides", legal: "Légal" },
            toast: { loginReq: "⚠️ Veuillez vous connecter d'abord", profReq: "⚠️ Veuillez compléter votre profil", regOk: "✅ Compte créé avec succès !", profOk: "✅ Profil enregistré !", loginOk: "✅ Connecté avec succès !", loginErr: "❌ Email ou mot de passe incorrect", logoutOk: "👋 Déconnecté", apply: "✅ Candidature envoyée pour : ", jobAdd: "✅ Offre ajoutée !", jobDel: "🗑️ Offre supprimée", vidAdd: "✅ Vidéo ajoutée !", vidDel: "🗑️ Vidéo supprimée", vol: "✅ Inscription bénévole pour : ", lang: "🌐 Langue : Français" }
        },
        en: {
            brand: "Horizons d'Avenir",
            nav: { home: "Home", jobs: "Jobs", training: "Training", videos: "Videos", posters: "Posters", legal: "Law", admin: "🔧 Admin" },
            login: "Login", register: "Register", logout: "Logout",
            home: { title: "Welcome to Horizons d'Avenir", sub: "Professional integration platform for refugees and migrants in France.", card1: "Jobs", card1d: "Offers in your city", card2: "Training", card2d: "Coursera, LinkedIn, Pôle Emploi", card3: "Rights", card3d: "Your rights in France and Europe" },
            reg: { title: "Create your account", or: "or by email", name: "Full name", pass: "Password (6+ characters)", btn: "Register" },
            prof: { title: "Complete your profile", save: "✓ Save profile" },
            jobs: { title: "Job Offers", search: "🔍 Search jobs...", no: "No jobs found.", apply: "Apply", pub: "Published" },
            train: { title: "Training & Learning", c: "Free courses for refugees", l: "Professional skills", p: "Official French training" },
            vid: { title: "Educational Videos", no: "No videos available." },
            post: { title: "Informative Posters" },
            legal: { title: "Legal Framework" },
            footer: { links: "Quick Links", legal: "Legal" },
            toast: { loginReq: "⚠️ Please login first", profReq: "⚠️ Please complete your profile", regOk: "✅ Account created!", profOk: "✅ Profile saved!", loginOk: "✅ Logged in!", loginErr: "❌ Wrong email or password", logoutOk: "👋 Logged out", apply: "✅ Applied for: ", jobAdd: "✅ Job added!", jobDel: "🗑️ Job deleted", vidAdd: "✅ Video added!", vidDel: "🗑️ Video deleted", vol: "✅ Volunteer for: ", lang: "🌐 Language: English" }
        },
        ar: {
            brand: "آفاق المستقبل",
            nav: { home: "الرئيسية", jobs: "الوظائف", training: "التدريبات", videos: "الفيديوهات", posters: "الملصقات", legal: "القانون", admin: "🔧 الإدارة" },
            login: "تسجيل الدخول", register: "إنشاء حساب", logout: "تسجيل الخروج",
            home: { title: "مرحباً بكم في آفاق المستقبل", sub: "منصة الإدماج المهني للاجئين والمهاجرين في فرنسا.", card1: "الوظائف", card1d: "عروض في مدينتك", card2: "التدريبات", card2d: "كورسيرا، لينكدإن، بول إمبلوا", card3: "الحقوق", card3d: "حقوقك في فرنسا وأوروبا" },
            reg: { title: "إنشاء حسابك", or: "أو عبر البريد الإلكتروني", name: "الاسم الكامل", pass: "كلمة المرور (6+ أحرف)", btn: "تسجيل" },
            prof: { title: "أكمل ملفك الشخصي", save: "✓ حفظ الملف" },
            jobs: { title: "عروض العمل", search: "🔍 ابحث عن وظيفة...", no: "لا توجد عروض عمل.", apply: "تقديم", pub: "نُشر بتاريخ" },
            train: { title: "التدريبات والتعلم", c: "دورات مجانية للاجئين", l: "مهارات مهنية", p: "تدريبات رسمية في فرنسا" },
            vid: { title: "فيديوهات تعليمية", no: "لا توجد فيديوهات." },
            post: { title: "ملصقات توعوية" },
            legal: { title: "الإطار القانوني" },
            footer: { links: "روابط سريعة", legal: "قانوني" },
            toast: { loginReq: "⚠️ يرجى تسجيل الدخول أولاً", profReq: "⚠️ يرجى إكمال ملفك الشخصي", regOk: "✅ تم إنشاء الحساب!", profOk: "✅ تم حفظ الملف!", loginOk: "✅ تم تسجيل الدخول!", loginErr: "❌ بريد إلكتروني أو كلمة مرور خاطئة", logoutOk: "👋 تم تسجيل الخروج", apply: "✅ تم التقديم على: ", jobAdd: "✅ تمت إضافة الوظيفة!", jobDel: "🗑️ تم حذف الوظيفة", vidAdd: "✅ تمت إضافة الفيديو!", vidDel: "🗑️ تم حذف الفيديو", vol: "✅ تطوع في: ", lang: "🌐 اللغة: العربية" }
        }
    },
    t(k) { let v = this.data[this.lang]; for (let p of k.split('.')) { if (v && v[p] !== undefined) v = v[p]; else return k; } return v; },
    apply() {
        document.documentElement.lang = this.lang;
        document.body.classList.toggle('rtl', this.lang === 'ar');
        document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = this.t(el.dataset.i18n));
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = this.t(el.dataset.i18nPlaceholder));
        document.getElementById('langSwitch').value = this.lang;
    },
    switch(l) { this.lang = l; localStorage.setItem('lang', l); this.apply(); App.renderAll(); toast(this.t('toast.lang')); }
};
