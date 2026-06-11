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
