# CONTRIBUTION.md - Complete Contribution Guide

## 📋 TABLE OF CONTENTS

1. [Introduction](#introduction)
2. [Tech Stack Overview](#tech-stack-overview)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
5. [Development Workflow](#development-workflow)
6. [Project Structure](#project-structure)
7. [Pull Request Requirements](#pull-request-requirements)
8. [Code Style Guidelines](#code-style-guidelines)
9. [Testing Guidelines](#testing-guidelines)
10. [Deployment Process](#deployment-process)
11. [Environment Variables](#environment-variables)
12. [Common Tasks](#common-tasks)
13. [Troubleshooting](#troubleshooting)

---

## INTRODUCTION

Welcome to the Zero Bugs Club (ZBC) website contribution guide! This document contains everything you need to know to contribute to the project, from initial setup to submitting pull requests.

### Before You Start

**MANDATORY READING:**

1. **AGENTS.md** - If you're an AI agent, read this first
2. **BEHAVIOUR_CONTRACTS.md** - Technical documentation of all functions
3. **README.md** - Project overview
4. **This file (CONTRIBUTION.md)** - Contribution guidelines

### What This Project Is

This is the **official website** for Zero Bugs Club (ZBC) at VIT Chennai. It's a single-page application (SPA) built with React, featuring:

- Modern, dark aesthetic with WebGL visual effects
- Dynamic recruitment system
- Event timeline and gallery
- Contact form with serverless backend

---

## TECH STACK OVERVIEW

### Core Technologies

| Technology                 | Version  | Purpose                         |
| -------------------------- | -------- | ------------------------------- |
| **React**            | 19.2.0   | Component-based UI framework    |
| **Vite**             | 7.2.4    | Build tool and dev server       |
| **React Router DOM** | 7.11.0   | Client-side routing             |
| **Tailwind CSS**     | 4.1.18   | Utility-first CSS framework     |
| **Framer Motion**    | 12.23.26 | Animation library               |
| **Three.js**         | 0.182.0  | 3D graphics for ColorBends      |
| **OGL**              | 1.0.11   | Lightweight WebGL for LightRays |
| **Lucide React**     | 0.562.0  | Icon library                    |

### Development Dependencies

| Package                        | Version | Purpose                  |
| ------------------------------ | ------- | ------------------------ |
| **ESLint**               | 9.39.1  | Code linting and quality |
| **PostCSS**              | 8.5.6   | CSS processing           |
| **Autoprefixer**         | 10.4.23 | CSS vendor prefixes      |
| **@vitejs/plugin-react** | 5.1.1   | React Fast Refresh       |

### External Services

- **Web3Forms**: Serverless contact form backend
- **Google Fonts**: Inter font family
- **Netlify**: Hosting and deployment

---

## PREREQUISITES

### Required Software

1. **Node.js**: Version 16.0.0 or higher

   - Download: https://nodejs.org/
   - Verify: `node --version`
2. **npm**: Version 7.0.0 or higher (comes with Node.js)

   - Verify: `npm --version`
3. **Git**: For version control

   - Download: https://git-scm.com/
   - Verify: `git --version`

### Recommended Tools

- **VS Code**: Code editor with React/Tailwind extensions
- **Chrome/Firefox DevTools**: For debugging
- **Git GUI** (optional): GitKraken, SourceTree, or GitHub Desktop

### Knowledge Requirements

- **React Fundamentals**: Hooks (useState, useEffect, useRef)
- **JavaScript ES6+**: Arrow functions, destructuring, async/await
- **CSS**: Basic understanding (Tailwind abstracts most of it)
- **Git**: Basic commands (clone, commit, push, pull)

---

## SETUP INSTRUCTIONS

### 1. Clone the Repository

```bash
# Via HTTPS
git clone https://github.com/Zero-Bugs-Club/zbc-website.git

# Via SSH (if configured)
git clone git@github.com:Zero-Bugs-Club/zbc-website.git

# Navigate to project directory
cd zbc-website
```

### 2. Install Dependencies

```bash
npm install
```

**What this does:**

- Downloads all packages listed in `package.json`
- Creates `node_modules/` directory
- Generates `package-lock.json` (if not present)

**Expected output:**

```
added 234 packages, and audited 235 packages in 15s
```

### 3. Start Development Server

```bash
npm run dev
```

**What this does:**

- Starts Vite development server
- Opens at `http://localhost:5173`
- Enables Hot Module Replacement (HMR) - changes reflect instantly

**Expected output:**

```
VITE v7.2.4  ready in 543 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. Verify Installation

Open browser to `http://localhost:5173` and verify:

- [ ] Page loads without errors
- [ ] Navigation works (try clicking links)
- [ ] WebGL effects render (ColorBends, LightRays)
- [ ] Mobile menu works (resize browser)
- [ ] No console errors in DevTools

---

## DEVELOPMENT WORKFLOW

### Branch Strategy

**Main Branch:** `main` (production-ready code)

**Feature Branches:** Create from `main`

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

**Branch Naming Convention:**

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation only
- `refactor/component-name` - Code refactoring
- `style/styling-changes` - CSS/styling updates

**Examples:**

- `feature/add-blog-page`
- `fix/contact-form-validation`
- `docs/update-readme`
- `refactor/simplify-navbar`

### Development Cycle

1. **Create branch** from main
2. **Make changes** to code
3. **Test locally** (verify in browser)
4. **Run linter** (`npm run lint`)
5. **Commit changes** with descriptive message
6. **Push branch** to GitHub
7. **Create Pull Request** with screenshots and summary
8. **Address review feedback** (if any)
9. **Merge** after approval

### Git Commit Messages

**Format:**

```
<type>: <short description>

<detailed description (optional)>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting (no code change)
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```bash
git commit -m "feat: add recruitment form validation"
git commit -m "fix: navbar scroll position on mobile"
git commit -m "docs: update BEHAVIOUR_CONTRACTS.md with new function"
```

---

## PROJECT STRUCTURE

### Directory Layout

```
zbc-website/
├── public/                      # Static assets (served as-is)
│   ├── _redirects              # Netlify routing config
│   ├── logo.png                # Club logo (original)
│   ├── logo_new.png            # Club logo (updated)
│   └── vite.svg                # Vite default icon
│
├── src/                        # Source code
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Visual effect components
│   │   │   ├── ColorBends.jsx  # WebGL fluid color effect
│   │   │   ├── ColorBends.css  # ColorBends styles
│   │   │   ├── LightRays.jsx   # WebGL light rays effect
│   │   │   ├── LightRays.css   # LightRays styles
│   │   │   ├── Spotlight.jsx   # Mouse spotlight effect
│   │   │   └── Grain.jsx       # Film grain overlay
│   │   │
│   │   ├── About.jsx           # About section (unused, legacy)
│   │   ├── Activities.jsx      # Activities section (unused, legacy)
│   │   ├── ContactSidebar.jsx  # Slide-in contact form
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Gallery.jsx         # Gallery component (unused, legacy)
│   │   ├── Hero.jsx            # Landing hero section
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── Timeline.jsx        # Timeline component (unused, legacy)
│   │
│   ├── pages/                  # Page components (routes)
│   │   ├── Home.jsx            # Landing page (/)
│   │   ├── AboutPage.jsx       # About ZBC (/about)
│   │   ├── DepartmentPage.jsx  # Department members (/about/:deptName)
│   │   ├── DomainsPage.jsx     # Domains/Activities (/domains)
│   │   ├── EventsPage.jsx      # Events timeline (/events)
│   │   ├── GalleryPage.jsx     # Photo gallery (/gallery)
│   │   ├── MemberProfilePage.jsx # Member profile (/about/:deptName/:memberName)
│   │   └── RecruitmentPage.jsx # Recruitment form (/recruitment)
│   │
│   ├── config/                 # Configuration files
│   │   ├── about.config.js     # About department + member profile data
│   │   └── recruitment.config.js # Recruitment feature flag + questions
│   │
│   ├── assets/                 # Additional assets
│   │   └── react.svg           # React logo (default)
│   │
│   ├── App.jsx                 # Root component (routing)
│   ├── App.css                 # App-specific styles (mostly unused)
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles + animations
│
├── .gitignore                  # Git ignore patterns
├── AGENTS.md                   # AI agent instructions
├── BEHAVIOUR_CONTRACTS.md      # Technical documentation
├── CONTRIBUTION.md             # This file
├── README.md                   # Project overview
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── maintenance.html            # Maintenance mode page
├── package.json                # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.js              # Vite build configuration
```

### File Organization Rules

**Components:**

- One component per file
- File name matches component name (PascalCase)
- Co-locate CSS if component-specific

**Pages:**

- Go in `src/pages/`
- Represent route components
- Wrapped with Framer Motion for transitions

**Configuration:**

- Go in `src/config/`
- Export as named or default export
- Document structure in BEHAVIOUR_CONTRACTS.md
- Use config files for scalable route content such as about departments and members

**Static Assets:**

- Images, fonts → `public/`
- Will be served from root URL

---

## PULL REQUEST REQUIREMENTS

### Before Opening a PR

**Checklist:**

- [ ] Code follows existing patterns (check BEHAVIOUR_CONTRACTS.md)
- [ ] Linter passes (`npm run lint`)
- [ ] Changes tested in browser (desktop + mobile)
- [ ] No console errors
- [ ] Documentation updated (if applicable)
- [ ] Branch is up to date with main

### PR Title Format

```
<type>: <short description>
```

**Examples:**

- `feat: Add blog page`
- `fix: Contact form validation error`
- `docs: Update contribution guidelines`

### PR Description Template

```markdown
## Summary
Brief description of what this PR does.

## Changes Made
- Bullet point list of specific changes
- Be technical and specific
- Reference file names

## Screenshots

### Before
[Screenshot of original state]

### After
[Screenshot of new state]

## Technical Details
Explain complex logic, algorithms, or architectural decisions.
Reference BEHAVIOUR_CONTRACTS.md sections if applicable.

## Testing Done
- [ ] Tested on Desktop Chrome
- [ ] Tested on Mobile (responsive)
- [ ] Tested all affected routes
- [ ] No console errors
- [ ] WebGL effects working (if applicable)

## Related Issues
Closes #123 (if applicable)
```

### Screenshot Requirements

**MANDATORY:** Include before and after screenshots for:

- UI changes
- Layout modifications
- New components
- Styling updates
- Visual effect changes

**Format:**

- PNG or JPEG
- Full-screen or focused on changed area
- Desktop AND mobile views (if responsive change)

**How to capture:**

- Browser DevTools (F12) → Device toolbar (Ctrl+Shift+M)
- Capture at breakpoints: 375px (mobile), 768px (tablet), 1920px (desktop)

### Technical Summary Requirements

**Must include:**

1. **What changed** (files modified)
2. **Why it changed** (problem being solved)
3. **How it works** (technical approach)
4. **Side effects** (what else might be affected)

**Example Good Summary:**

```
Modified `RecruitmentPage.jsx` to add real-time email validation.

WHY: Users were submitting forms with invalid emails, causing silent failures.

HOW: Added `validateEmail()` helper that uses regex to check format on blur.
Updates `errors.vitEmail` state if invalid. Clears error on valid input.

SIDE EFFECTS: Added new error state key, updated BEHAVIOUR_CONTRACTS.md
with validateEmail() contract.
```

### Documentation Update Requirements

**When to update BEHAVIOUR_CONTRACTS.md:**

- New function created → Add function contract
- Function logic changed → Update contract
- New component created → Add component contract
- State management changed → Update state management section

**When to update CONTRIBUTION.md:**

- New npm package added → Update tech stack table
- New script added → Update scripts section
- Setup process changed → Update setup instructions
- New environment variable → Update env vars section

**When to update README.md:**

- New feature added → Update features list
- Project description changed → Update overview
- New route added → Update project structure

---

## CODE STYLE GUIDELINES

### JavaScript/JSX

**Use Functional Components:**

```javascript
// ✅ Good
const MyComponent = () => {
  return <div>Hello</div>;
};

// ❌ Avoid
class MyComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}
```

**Use Hooks for State:**

```javascript
// ✅ Good
const [count, setCount] = useState(0);

// ❌ Avoid
this.state = { count: 0 };
```

**Destructure Props:**

```javascript
// ✅ Good
const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

// ❌ Avoid
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
```

**Use Arrow Functions:**

```javascript
// ✅ Good
const handleClick = () => {
  console.log('Clicked');
};

// ❌ Avoid
function handleClick() {
  console.log('Clicked');
}
```

### Naming Conventions

| Type        | Convention                    | Example                            |
| ----------- | ----------------------------- | ---------------------------------- |
| Components  | PascalCase                    | `NavBar`, `ContactForm`        |
| Functions   | camelCase                     | `handleSubmit`, `validateForm` |
| Variables   | camelCase                     | `userName`, `isLoading`        |
| Constants   | camelCase or UPPER_SNAKE_CASE | `maxLength`, `API_URL`         |
| CSS Classes | kebab-case (Tailwind)         | `bg-black`, `text-white`       |
| File Names  | PascalCase for components     | `Navbar.jsx`, `Hero.jsx`       |

### Tailwind CSS Guidelines

**Use Tailwind Utilities:**

```jsx
// ✅ Good
<div className="flex items-center gap-4 px-6 py-3 bg-black text-white">

// ❌ Avoid custom CSS when Tailwind exists
<div style={{ display: 'flex', padding: '12px 24px' }}>
```

**Class Order (Recommended):**

1. Layout: `flex`, `grid`, `block`
2. Sizing: `w-full`, `h-screen`
3. Spacing: `px-4`, `my-6`, `gap-2`
4. Typography: `text-xl`, `font-bold`
5. Colors: `bg-black`, `text-white`
6. Effects: `shadow-lg`, `opacity-50`
7. Transitions: `transition-all`, `duration-300`
8. Responsive: `md:flex-row`, `lg:text-2xl`
9. State: `hover:bg-gray-800`, `focus:outline-none`

**Responsive Breakpoints:**

```jsx
// Mobile first approach
<div className="text-sm md:text-base lg:text-lg">
  // sm (640px), md (768px), lg (1024px), xl (1280px)
</div>
```

**Custom Colors (from config):**

```jsx
bg-background  // #0a0a0a
bg-surface     // #171717
text-primary   // #ffffff
text-secondary // #a3a3a3
```

### Component Structure

```javascript
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'lucide-react';

// 1. Component function
const MyComponent = ({ prop1, prop2 }) => {
  // 2. State declarations
  const [state, setState] = useState(initialValue);
  
  // 3. Refs
  const myRef = useRef(null);
  
  // 4. Effects
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  // 5. Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // 6. Helper functions
  const helperFunction = () => {
    // Helper logic
  };
  
  // 7. JSX return
  return (
    <div>
      {/* Component markup */}
    </div>
  );
};

// 8. Export
export default MyComponent;
```

### ESLint Rules

Run linter before committing:

```bash
npm run lint
```

**Key Rules:**

- No unused variables (uppercase component constants and the Framer Motion `motion` JSX namespace are ignored)
- Consistent spacing and indentation
- Proper import ordering
- React hooks dependency arrays complete

**Auto-fix (some issues):**

```bash
npm run lint -- --fix
```

---

## TESTING GUIDELINES

### Manual Testing Checklist

**For Every PR:**

- [ ] Test on Chrome/Firefox
- [ ] Test on mobile size (375px width)
- [ ] Test on tablet size (768px width)
- [ ] Test on desktop size (1920px width)
- [ ] Check browser console for errors
- [ ] Verify animations work smoothly
- [ ] Test navigation between pages
- [ ] Verify WebGL effects render

**For Form Changes:**

- [ ] Test validation (empty fields)
- [ ] Test validation (invalid formats)
- [ ] Test successful submission
- [ ] Test error messages display
- [ ] Test error clearing on input

**For Route Changes:**

- [ ] Test direct URL access
- [ ] Test page refresh
- [ ] Test browser back/forward
- [ ] Verify scroll-to-top works

### Performance Testing

**Check:**

- [ ] Page loads under 3 seconds (dev mode)
- [ ] WebGL effects don't cause lag
- [ ] No memory leaks (DevTools Memory tab)
- [ ] Images optimized (< 200KB each)

### Accessibility Testing

**Basic Checks:**

- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Keyboard navigation works (Tab key)
- [ ] Focus indicators visible
- [ ] Contrast ratios sufficient (text on background)

---

## DEPLOYMENT PROCESS

### Production Deployment (Netlify)

**Automatic Deployment:**

- Every push to `main` branch triggers deployment
- Build command: `npm run build`
- Publish directory: `dist/`
- Build time: ~1-2 minutes

**Manual Deployment:**

```bash
# Build locally
npm run build

# Deploy via Netlify CLI (if installed)
netlify deploy --prod --dir=dist
```

### Build Process

**What happens during build:**

1. Vite bundles all JavaScript/JSX into optimized chunks
2. Tailwind processes CSS and removes unused classes
3. Assets get hashed filenames (cache busting)
4. Output goes to `dist/` directory

**Build output structure:**

```
dist/
├── index.html
├── assets/
│   ├── index-abc123.js    (main bundle, hashed)
│   ├── index-def456.css   (styles, hashed)
│   └── logo-xyz789.png    (assets, hashed)
└── _redirects             (SPA routing config)
```

### Preview Deployment

**For Pull Requests:**

- Netlify automatically creates preview deployments
- Unique URL for each PR
- Test before merging to main

**Access preview:**

- Check PR comments for Netlify bot link
- Format: `https://deploy-preview-123--zbcvitc.netlify.app`

### Rollback Procedure

**If deployment breaks:**

1. Go to Netlify dashboard
2. Select "Deploys" tab
3. Find last working deploy
4. Click "Publish deploy"

**Or revert via Git:**

```bash
git revert <commit-hash>
git push origin main
```

---

## ENVIRONMENT VARIABLES

### Current Status

**No environment variables currently used.**

### Adding Environment Variables

**If you need to add env vars:**

1. **Create `.env` file:**

   ```bash
   # .env (DO NOT COMMIT)
   VITE_API_URL=https://api.example.com
   VITE_CONTACT_KEY=your-key-here
   ```
2. **Prefix with `VITE_`:**

   - Required for Vite to expose to client
   - Access via `import.meta.env.VITE_API_URL`
3. **Add to `.gitignore`:**

   ```
   .env
   .env.local
   .env.*.local
   ```
4. **Configure on Netlify:**

   - Site settings → Build & deploy → Environment
   - Add same variables for production
5. **Document in this file (CONTRIBUTION.md):**

   - Update this section with new variables
   - Explain what each variable does

---

## COMMON TASKS

### Adding a New Page

**Steps:**

1. **Create page component:**

   ```bash
   touch src/pages/NewPage.jsx
   ```
2. **Write component:**

   ```javascript
   import React from 'react';
   import { motion } from 'framer-motion';

   const NewPage = () => {
     return (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="min-h-screen pt-24 px-4"
       >
         <h1>New Page</h1>
       </motion.div>
     );
   };

   export default NewPage;
   ```
3. **Add route in App.jsx:**

   ```javascript
   import NewPage from './pages/NewPage';

   // In <Routes>:
   <Route path="/new-page" element={<NewPage />} />
   ```
4. **Add navigation link in Navbar.jsx:**

   ```javascript
   const navLinks = [
     // ... existing links
     { name: 'New Page', href: '/new-page' }
   ];
   ```
5. **Add footer link in Footer.jsx:**

   ```javascript
   { name: 'New Page', path: '/new-page' }
   ```
6. **Update documentation:**

   - Add to BEHAVIOUR_CONTRACTS.md (component contract)
   - Update README.md (if significant feature)

### Adding a New Dependency

**Steps:**

1. **Install package:**

   ```bash
   npm install package-name
   ```
2. **Verify installation:**

   - Check `package.json` for entry
   - Check `package-lock.json` updated
3. **Use in code:**

   ```javascript
   import { Something } from 'package-name';
   ```
4. **Update CONTRIBUTION.md:**

   - Add to Tech Stack table
   - Document purpose and version
5. **Commit both files:**

   ```bash
   git add package.json package-lock.json
   git commit -m "chore: add package-name dependency"
   ```

### Modifying Recruitment Configuration

**To enable/disable recruitment:**

1. **Open config file:**

   ```bash
   src/config/recruitment.config.js
   ```
2. **Toggle feature flag:**

   ```javascript
   export const recruitmentConfig = {
     isRecruiting: true,  // Change to false to disable
     // ... rest of config
   };
   ```
3. **Save and test:**

   - Try accessing `/recruitment`
   - Verify redirect if disabled
   - Check "Join Us" button behavior

**To add new department:**

1. **Add to departments array:**

   ```javascript
   departments: [
     // ... existing
     { id: 'new_dept', name: 'New Department' }
   ]
   ```
2. **Add department questions:**

   ```javascript
   domainQuestions: {
     // ... existing
     new_dept: [
       {
         id: 'question_id',
         label: 'Your question?',
         type: 'text',
         required: true,
         placeholder: 'Hint...'
       }
     ]
   }
   ```
3. **Test form:**

   - Select new department
   - Verify questions appear
   - Test validation

### Updating About Departments and Members

**Location:** `src/config/about.config.js`

Department cards on `/about`, department member pages under `/about/:deptName`, and member profile pages under `/about/:deptName/:memberName` are driven from this config.

**Add or edit a member:**

```javascript
members: [
  {
    slug: 'member-name',
    name: 'Member Name',
    role: 'Department Role',
    description: 'Short profile card description.',
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    instagram: 'https://instagram.com/username',
    contributions: [
      'Documented contribution to the club.'
    ]
  }
]
```

Keep `slug` values lowercase and URL-safe because they become route segments.

### Adding Events (EventsPage)

**Location:** `src/pages/EventsPage.jsx`

**Find allEvents object:**

```javascript
const allEvents = {
  '2025 - 2026 Season': [
    {
      month: "JAN",
      day: "15",
      year: "2026",
      title: "New Event",
      time: "10:00 AM - 12:00 PM",
      location: "Venue Name",
      status: "Upcoming",
      regStatus: "Open"  // or "Closed" or null
    }
  ]
};
```

**Status options:**

- `"Upcoming"` - Future event (yellow badge)
- `"Completed"` - Past event (green badge)
- `"TBA"` - To be announced (gray badge)

**regStatus options (Upcoming only):**

- `"Open"` - Clickable registration link
- `"Closed"` - Disabled, red styling
- `null` - No registration badge

---

## TROUBLESHOOTING

### Common Issues

#### 1. **Port 5173 Already in Use**

**Error:**

```
Port 5173 is in use, trying another one...
```

**Solution:**

```bash
# Kill process using port
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

#### 2. **npm install Fails**

**Error:**

```
npm ERR! code ERESOLVE
```

**Solution:**

```bash
# Clear cache
npm cache clean --force

# Delete node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### 3. **WebGL Effects Not Rendering**

**Symptoms:**

- Black screen where ColorBends should be
- No light rays on AboutPage

**Check:**

1. Browser supports WebGL (visit `https://get.webgl.org/`)
2. Hardware acceleration enabled (browser settings)
3. Console for WebGL errors
4. Try different browser

**Debug:**

```javascript
// Add to component
console.log('WebGL supported:', 
  document.createElement('canvas').getContext('webgl') !== null
);
```

#### 4. **Styles Not Applying**

**Symptoms:**

- Tailwind classes not working
- Site looks unstyled

**Solutions:**

```bash
# Restart dev server
Ctrl+C
npm run dev

# Clear browser cache
Cmd/Ctrl + Shift + R (hard refresh)

# Check Tailwind config
# Verify content paths in tailwind.config.js
```

#### 5. **React Router 404 on Refresh**

**Symptoms:**

- Direct URL access works in dev
- Refresh gives 404 in production

**Solution:**

- Verify `public/_redirects` exists
- Content should be: `/* /index.html 200`
- Netlify should serve this file

#### 6. **Build Fails in Production**

**Error:**

```
[vite]: Rollup failed to resolve import
```

**Solutions:**

1. Check import paths (case-sensitive in production)
2. Verify all dependencies installed
3. Run `npm run build` locally to reproduce
4. Check for dynamic imports or missing files

#### 7. **Contact Form Not Sending**

**Symptoms:**

- Form submits but no email received
- Network error in console

**Check:**

1. Web3Forms access key correct in ContactSidebar.jsx
2. Network request successful (DevTools Network tab)
3. Email not in spam folder
4. Web3Forms service status

#### 8. **Animation Glitches**

**Symptoms:**

- Choppy page transitions
- WebGL stuttering

**Solutions:**

1. Check DevTools Performance tab
2. Reduce WebGL complexity (lower DPR)
3. Disable animations on low-end devices
4. Check for memory leaks (cleanup in useEffect)

---

## NPM SCRIPTS REFERENCE

| Command             | Description              | Usage              |
| ------------------- | ------------------------ | ------------------ |
| `npm run dev`     | Start development server | Local development  |
| `npm run build`   | Build for production     | Before deployment  |
| `npm run preview` | Preview production build | Test build locally |
| `npm run lint`    | Run ESLint               | Check code quality |

### Script Details

**Development Server:**

```bash
npm run dev
# - Starts Vite dev server on port 5173
# - Hot Module Replacement (HMR) enabled
# - Source maps for debugging
# - Fast refresh for React
```

**Production Build:**

```bash
npm run build
# - Bundles for production
# - Minifies JavaScript/CSS
# - Optimizes assets
# - Generates hashed filenames
# - Output: dist/ directory
```

**Preview Build:**

```bash
npm run preview
# - Serves production build locally
# - Test before deploying
# - Runs on port 4173 (default)
```

**Linting:**

```bash
npm run lint
# - Checks code style
# - Identifies issues
# - Some auto-fixable with --fix flag
```

---

## ADDITIONAL RESOURCES

### Documentation Links

- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **React Router**: https://reactrouter.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Lucide Icons**: https://lucide.dev/icons/

### Tools

- **Tailwind Playground**: https://play.tailwindcss.com/
- **Can I Use** (Browser support): https://caniuse.com/
- **WebGL Test**: https://get.webgl.org/
- **Regex Tester**: https://regex101.com/

### ZBC Resources

- **Website**: https://zbcvitc.netlify.app
- **GitHub**: https://github.com/Zero-Bugs-Club
- **Email**: zbcvitc@gmail.com
- **Instagram**: @zbcvitc

---

## GETTING HELP

### Where to Ask Questions

1. **GitHub Issues**: For bugs or feature requests
2. **GitHub Discussions**: For general questions
3. **Pull Request Comments**: For PR-specific questions
4. **Team Contact**: zbcvitc@gmail.com

### Before Asking

**Checklist:**

- [ ] Searched existing GitHub issues
- [ ] Checked BEHAVIOUR_CONTRACTS.md
- [ ] Tried troubleshooting steps
- [ ] Reviewed browser console for errors
- [ ] Created minimal reproduction (if bug)

### Bug Report Template

```markdown
## Bug Description
Clear description of what's wrong.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- Browser: Chrome 120
- OS: macOS 14.0
- Device: MacBook Pro
- Screen size: 1920x1080

## Screenshots
[If applicable]

## Console Errors
[Paste any error messages]
```

---

## CONTRIBUTION PRINCIPLES

### Quality Over Speed

- Take time to understand existing patterns
- Write clean, maintainable code
- Document as you go
- Test thoroughly

### Consistency is Key

- Follow established patterns
- Match existing code style
- Use same libraries as codebase
- Keep architecture decisions aligned

### Communication Matters

- Write clear PR descriptions
- Respond to review feedback
- Ask questions if unclear
- Keep team informed of blockers

### Think Long-Term

- Code for maintainability
- Consider future developers
- Document complex logic
- Avoid technical debt

---

## CODE REVIEW CHECKLIST

### For Reviewers

**Functionality:**

- [ ] Code works as described
- [ ] No bugs introduced
- [ ] Edge cases handled
- [ ] Error handling present

**Code Quality:**

- [ ] Follows existing patterns
- [ ] No code duplication
- [ ] Functions are focused (single responsibility)
- [ ] Naming is clear and descriptive

**Documentation:**

- [ ] BEHAVIOUR_CONTRACTS.md updated (if applicable)
- [ ] Complex logic explained
- [ ] PR description is thorough
- [ ] Screenshots provided (if UI change)

**Testing:**

- [ ] Tested on multiple browsers
- [ ] Tested on mobile
- [ ] No console errors
- [ ] Performance acceptable

**Security:**

- [ ] No secrets in code
- [ ] User input sanitized
- [ ] No XSS vulnerabilities
- [ ] External dependencies safe

### For Contributors

**Before Requesting Review:**

- [ ] Self-reviewed code
- [ ] Ran linter
- [ ] Tested locally
- [ ] Updated documentation
- [ ] Screenshots added
- [ ] Technical summary written

---

## FINAL NOTES

### Remember

- **Read AGENTS.md first** if you're an AI agent
- **Check BEHAVIOUR_CONTRACTS.md** before modifying functions
- **Update documentation** after every code change
- **Include screenshots** in PRs for visual changes
- **Write technical summaries** explaining your changes

### Questions?

If anything is unclear in this guide:

1. Open a GitHub issue tagged "documentation"
2. Email zbcvitc@gmail.com
3. Ask in PR comments

### Thank You!

Your contributions help make ZBC's digital presence better. We appreciate your time and effort!

---

**Document Version**: 1.0.0
**Last Updated**: Initial comprehensive documentation
**Maintained By**: Zero Bugs Club Development Team

---

© 2024-2026 Zero Bugs Club, VIT Chennai. All rights reserved.
