# Zero Bugs Club (ZBC) - Official Website

**Live Site**: [https://zbcvitc.netlify.app](https://zbcvitc.netlify.app)

---

## 📖 Project Overview

The **Zero Bugs Club (ZBC)** official website is a modern, high-performance single-page application showcasing our student engineering community at VIT Chennai. The website features a dark, minimalist aesthetic with stunning WebGL visual effects, smooth animations, and an intuitive user experience.

### What This Project Does

This website serves as the digital presence for Zero Bugs Club, providing:

- **Community Information**: Learn about ZBC's mission, values, and team structure
- **Domain Showcases**: Explore technical activities across development, UI/UX, cybersecurity, content, and marketing
- **Event Timeline**: Browse past and upcoming technical workshops, hackathons, and guest talks
- **Gallery**: Visual documentation of ZBC events and activities
- **Recruitment Portal**: Dynamic recruitment application system with department-specific questionnaires
- **Contact System**: Direct communication channel via serverless form submission

The website emphasizes **quality engineering**, **clean code practices**, and **production-ready deployments** - core principles of the Zero Bugs Club community.

---

## 🚀 Technology Stack

### Core Framework

- **React** `19.2.0` - Component-based UI library
- **Vite** `7.2.4` - Lightning-fast build tool and dev server
- **React Router DOM** `7.11.0` - Client-side routing for SPA navigation

### Styling & Design

- **Tailwind CSS** `4.1.18` - Utility-first CSS framework with dark theme
- **PostCSS** `8.5.6` + **Autoprefixer** `10.4.23` - CSS processing

### Animations & Visual Effects

- **Framer Motion** `12.23.26` - Declarative animations for page transitions and components
- **OGL** `1.0.11` - Lightweight WebGL library for custom shader effects
- **Three.js** `0.182.0` - 3D graphics library (used in ColorBends component)

### UI Components & Icons

- **Lucide React** `0.562.0` - Beautiful, consistent icon library

### Forms & Communication

- **Web3Forms** - Serverless contact form backend (no backend code required)

### Development Tools

- **ESLint** `9.39.1` - Code quality and consistency
- **@vitejs/plugin-react** `5.1.1` - Fast Refresh for React development

---

## 📦 Quick Start Guide

### Prerequisites

Ensure you have the following installed:

- **Node.js** `v16.0.0` or higher ([Download](https://nodejs.org/))
- **npm** `v7.0.0` or higher (comes with Node.js)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Zero-Bugs-Club/zbc-website.git
   cd zbc-website
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`
4. **Build for production**

   ```bash
   npm run build
   ```

   Optimized static files will be generated in the `dist/` directory
5. **Preview production build**

   ```bash
   npm run preview
   ```

---

## 🎨 Key Features

### 1. **Immersive Visual Effects**

Custom WebGL shaders create stunning background animations:

- **ColorBends**: Fluid, organic color flows using Three.js shaders
- **LightRays**: Dynamic volumetric lighting using OGL
- **Spotlight**: Interactive mouse-following highlight effect
- **Grain**: Subtle film grain texture overlay

### 2. **Smooth Page Transitions**

Framer Motion powers seamless animations between routes with fade and slide effects.

### 3. **Dynamic Recruitment System**

- Feature flag controlled recruitment (`recruitment.config.js`)
- Department-specific questionnaires with validation
- Custom form validation with inline error display
- Auto-redirect when recruitment is closed

### 4. **Responsive Design**

Mobile-first approach with Tailwind breakpoints:

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

### 5. **Glitch Text Effects**

Custom CSS animations for cyberpunk-style glitch effects on headings.

### 6. **Contact Sidebar**

Slide-in contact form with Web3Forms integration for serverless email delivery.

### 7. **Department Member Profiles**

- Department pages under `/about/<dept-name>`
- Dynamic member cards powered by `about.config.js`
- Individual contribution profiles under `/about/<dept-name>/<member-name>`

---

## 📂 Project Structure

```
zbc-website/
├── public/                      # Static assets
│   ├── _redirects              # Netlify SPA routing config
│   ├── logo.png                # Club logo (original)
│   └── logo_new.png            # Club logo (updated)
├── src/
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # Visual effect components
│   │   │   ├── ColorBends.jsx  # WebGL fluid color shader
│   │   │   ├── LightRays.jsx   # WebGL volumetric lighting
│   │   │   ├── Spotlight.jsx   # Mouse-following spotlight
│   │   │   └── Grain.jsx       # Film grain overlay
│   │   ├── About.jsx           # About section component
│   │   ├── Activities.jsx      # Activities section component
│   │   ├── ContactSidebar.jsx  # Slide-in contact form
│   │   ├── Footer.jsx          # Site footer with social links
│   │   ├── Gallery.jsx         # Gallery grid component
│   │   ├── Hero.jsx            # Landing hero section
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── Timeline.jsx        # Events timeline component
│   ├── pages/                  # Route page components
│   │   ├── Home.jsx            # Landing page
│   │   ├── AboutPage.jsx       # About ZBC page with team
│   │   ├── DepartmentPage.jsx  # Department member listing page
│   │   ├── DomainsPage.jsx     # Domain activities page
│   │   ├── EventsPage.jsx      # Events timeline page
│   │   ├── GalleryPage.jsx     # Gallery page
│   │   ├── MemberProfilePage.jsx # Member contribution profile page
│   │   └── RecruitmentPage.jsx # Recruitment application form
│   ├── config/
│   │   ├── about.config.js     # About departments + member profile data
│   │   └── recruitment.config.js # Feature flag + recruitment data
│   ├── App.jsx                 # Root component with routing
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles + custom animations
├── AGENTS.md                   # AI agent instructions (READ FIRST)
├── BEHAVIOUR_CONTRACTS.md      # Technical function documentation
├── CONTRIBUTION.md             # Contribution guidelines
├── README.md                   # This file
├── index.html                  # HTML entry point
├── maintenance.html            # Maintenance mode page
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite build configuration
└── eslint.config.js            # ESLint rules
```

---

## 🔧 Available Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build optimized production bundle        |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint to check code quality         |

---

## 🌐 Deployment

### Netlify Deployment (Current)

The site is automatically deployed to Netlify on every push to the main branch.

**Build Settings:**

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 16.x or higher

**Important**: The `public/_redirects` file ensures proper SPA routing:

```
/* /index.html 200
```

This prevents 404 errors when refreshing non-root routes.

### Manual Deployment to Other Platforms

**Vercel:**

```bash
npm install -g vercel
vercel --prod
```

**GitHub Pages:**

```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```

---

## 🔒 Maintenance Mode

The website includes a standalone maintenance page for pre-launch or update periods.

### Activate Maintenance Mode

```bash
# Backup current index
mv index.html app.html

# Activate maintenance page
mv maintenance.html index.html

# Deploy
git add .
git commit -m "Activate maintenance mode"
git push
```

### Deactivate Maintenance Mode

```bash
# Restore app
mv index.html maintenance.html
mv app.html index.html

# Deploy
git add .
git commit -m "Site live"
git push
```

The maintenance page is a self-contained HTML file with zero dependencies.

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTION.md](./CONTRIBUTION.md) for:

- Setup instructions
- Code style guidelines
- PR submission requirements (before/after screenshots, technical summary)
- Development workflow

### Quick Contribution Checklist

- [ ] Read `CONTRIBUTION.md` completely
- [ ] Follow existing code patterns from `BEHAVIOUR_CONTRACTS.md`
- [ ] Include before/after screenshots in PR
- [ ] Write technical summary of changes
- [ ] Update documentation files if needed
- [ ] Test on mobile and desktop
- [ ] Run `npm run lint` before committing

---

## 📞 Contact & Links

- **Email**: zbcvitc@gmail.com
- **GitHub**: [Zero-Bugs-Club](https://github.com/Zero-Bugs-Club)
- **LinkedIn**: [ZBC VIT Chennai](https://www.linkedin.com/in/zbc-vitc-905075301)
- **Instagram**: [@zbcvitc](https://www.instagram.com/zbcvitc)

---

## 📄 License

This project is private and maintained by Zero Bugs Club, VIT Chennai.

---

## 🙏 Credits

**Built with ❤️ by the Zero Bugs Club Development Team**

Special acknowledgments:

- **Kishal** - Initial development and architecture
- **ZBC Dev Team** - Ongoing maintenance and features
- **VIT Chennai** - Community support

---

## 📚 Additional Documentation

For detailed technical information and AI agent protocols:

| File                             | Purpose                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| **AGENTS.md**              | AI agent instructions and workflow protocols*(Read this first if you're an AI agent)* |
| **BEHAVIOUR_CONTRACTS.md** | Complete technical documentation of all functions and components                        |
| **CONTRIBUTION.md**        | Contribution guidelines, setup, and PR requirements                                     |
| **README.md**              | This file - project overview and quick reference                                        |

---

**Last Updated**: Initial comprehensive documentation
**Version**: 1.0.0
**Status**: Active Development

---

© 2024-2026 Zero Bugs Club, VIT Chennai. All rights reserved.
