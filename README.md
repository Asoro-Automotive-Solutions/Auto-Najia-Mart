# Auto Naija Market - Frontend

Welcome to the **Auto Naija Market** frontend group repository!

This project is scaffolded with **React**, **React Router**, and **Tailwind CSS** on top of **Vite**, ready for team collaboration across multiple screens.

---

## 🛠️ Tech Stack

- **React 19**
- **React Router DOM (v7)**
- **Tailwind CSS (v4)** via `@tailwindcss/vite`
- **Vite 8**
- **Lucide React** (icons)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd auto-naija-market
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```text
auto-naija-market/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, logos, SVG files
│   ├── components/      # Reusable UI components (Buttons, Cards, Inputs, Modals)
│   ├── context/         # React Context providers (Auth, Cart, UI state)
│   ├── layouts/         # Shared screen layouts (Navbar, Sidebar, Footer)
│   ├── pages/           # Screen views (Home, Listings, Seller screens, etc.)
│   ├── App.css          # Optional global styles
│   ├── App.jsx          # App root & React Router route definitions
│   ├── index.css        # Tailwind CSS entrypoint (@import "tailwindcss")
│   └── main.jsx         # React application entrypoint
├── package.json
└── vite.config.js
```

---

## 🤝 Team Collaboration Guidelines

1. **Branching**:
   - `main`: Production-ready code.
   - Create a feature branch for your screen or feature:
     ```bash
     git checkout -b feature/your-screen-name
     ```
2. **Commit Messages**:
   - Keep commits clear and descriptive (e.g. `feat: add listing details screen`, `fix: header responsiveness`).
3. **Pull Requests**:
   - Push your feature branch to GitHub and create a Pull Request against `main`.
   - Ensure `npm run build` passes before submitting PRs.
