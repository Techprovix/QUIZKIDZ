# ⚡ QuizKids

Nigeria's #1 quiz platform for JSS, SSS, WAEC, NECO & JAMB students.

---

## 📁 Project Structure

```
/quizkids
├── index.html              ← Landing page
├── css/
│   ├── main.css            ← Shared global styles
│   └── landing.css         ← Landing page styles
├── js/
│   ├── main.js             ← Shared utilities (auth, particles, toast)
│   └── landing.js          ← Landing page logic (counters, FAQ)
└── pages/
    ├── auth.html           ← Login & Signup
    ├── dashboard.html      ← Student dashboard + analytics
    ├── quiz.html           ← Full quiz engine
    ├── leaderboard.html    ← National leaderboard
    └── admin.html          ← Admin/teacher panel
```

# Push to GitHub first

git init
git add .
git commit -m "Initial QuizKids deployment"
git remote add origin https://github.com/Techprovix/QUIZKIDZ.git
git push -u origin main

# Then in Netlify:

# New site → Import from Git → Select repo → Deploy

````

---

## ▲ Deploy to Vercel

```bash
npm install -g vercel
cd quizkids
vercel

# Follow prompts:
# Project name: quizkids
# Framework: Other (static)
# Root directory: ./
````

---

## 📄 Deploy to GitHub Pages

```bash
# Push to GitHub, then:
# Repository Settings → Pages → Source: main branch / root
# Site available at: https://yourusername.github.io/quizkids
```

---

## 🔐 Firebase Integration (Production)

Replace the localStorage auth in `pages/auth.html` with real Firebase:

```html
<!-- Add to <head> of every page -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
  } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "quizkids.firebaseapp.com",
    projectId: "quizkids",
    storageBucket: "quizkids.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  window.fbAuth = auth;
  window.fbDb = db;
</script>
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /questions/{questionId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    match /leaderboard/{entry} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 🎮 Demo Credentials

For testing without signup:

**Student account** — Sign up with any email on the auth page. All data is stored locally.

**Admin panel** — Go to `/pages/admin.html` (any logged-in user can access in demo mode).

To make a user admin via browser console:

```javascript
const users = JSON.parse(localStorage.getItem("qk_users"));
users[0].isAdmin = true;
localStorage.setItem("qk_users", JSON.stringify(users));
```

---

## 🛠 Customization

### Add More Questions

Edit `js/questions.js` (or the `QUESTIONS` object in `quiz.html`) to add your own.

Format:

```javascript
{
  q: "Your question text here?",
  options: ["A. Option one", "B. Option two", "C. Option three", "D. Option four"],
  answer: 1,  // 0-indexed (0=A, 1=B, 2=C, 3=D)
  exp: "Explanation of why the answer is correct."
}
```

### Change Brand Colors

Edit `css/main.css` → `:root` variables:

```css
:root {
  --brand-primary: #16a34a; /* Main green */
  --brand-accent: #facc15; /* Yellow accent */
}
```

---

## 📦 Tech Stack

| Tech                          | Purpose               |
| ----------------------------- | --------------------- |
| HTML5 + CSS3                  | Structure & styling   |
| Vanilla JS ES6+               | Logic & interactivity |
| Chart.js                      | Analytics charts      |
| Google Fonts (Syne + DM Sans) | Typography            |
| Canvas API                    | Particle background   |
| localStorage                  | Demo data persistence |
| Firebase (optional)           | Production auth + DB  |

---

## 📞 Support

Built with ❤️ for Nigerian students. Made in Nigeria 🇳🇬
