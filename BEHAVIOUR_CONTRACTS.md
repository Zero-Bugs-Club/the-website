# BEHAVIOUR_CONTRACTS.md - Technical Brain of the Codebase

## DOCUMENT PURPOSE

This file is the **complete technical specification** of every function, component, utility, and behavioral pattern in the ZBC website codebase. It serves as the single source of truth for understanding how every piece of code works, what it expects, what it returns, and why it exists.

**Read this file to understand:**
- What each function does and why
- Input parameters and expected types
- Return values and side effects
- State management patterns
- Event handlers and their triggers
- Dependencies between components
- Data flow through the application

---

## TABLE OF CONTENTS

1. [Core Application](#1-core-application)
2. [Routing & Navigation](#2-routing--navigation)
3. [Pages](#3-pages)
4. [Components](#4-components)
5. [UI Effects Components](#5-ui-effects-components)
6. [Configuration](#6-configuration)
7. [Styling & Animations](#7-styling--animations)
8. [State Management Patterns](#8-state-management-patterns)
9. [Form Validation Patterns](#9-form-validation-patterns)
10. [WebGL Shader Contracts](#10-webgl-shader-contracts)

---

## 1. CORE APPLICATION

### File: `src/main.jsx`

#### Purpose
Application bootstrap file that mounts the React application to the DOM.

#### Function: `createRoot().render()`

**Contract:**
- **Input**: None
- **Process**: 
  1. Selects the `#root` div from `index.html`
  2. Creates a React root using React 19's `createRoot` API
  3. Renders the `<App />` component wrapped in `<StrictMode>`
- **Output**: Mounted React application
- **Side Effects**: DOM manipulation, React lifecycle begins
- **Why**: Entry point for the entire React application; StrictMode enables development warnings

#### Import Dependencies
```javascript
import { StrictMode } from 'react'           // React development mode wrapper
import { createRoot } from 'react-dom/client' // React 19 mounting API
import './index.css'                           // Global styles
import App from './App.jsx'                   // Root component
```

---

### File: `src/App.jsx`

#### Purpose
Root component that configures routing, global state, and persistent layout elements.

#### Component: `App()`

**Contract:**
- **Input**: None (root component)
- **State Variables**:
  - `isContactOpen` (boolean): Controls ContactSidebar visibility
- **Returns**: JSX with Router, global layout, and route definitions
- **Side Effects**: 
  - Scroll-to-top on route changes (via ScrollToTop component)
  - Contact sidebar state management
- **Why**: Centralizes routing configuration and shared layout elements

#### State Management Contract


**`isContactOpen` State:**
- **Type**: `boolean`
- **Initial**: `false`
- **Setter**: `setIsContactOpen`
- **Purpose**: Controls visibility of the ContactSidebar slide-in panel
- **Modified by**:
  - Navbar "Contact" button → `setIsContactOpen(true)`
  - ContactSidebar close button → `setIsContactOpen(false)`
  - ContactSidebar backdrop click → `setIsContactOpen(false)`

#### Component: `ScrollRestoration()`

**Contract:**
- **Input**: None
- **Hooks**: `useLocation()` and `useNavigationType()` from `react-router-dom`
- **Process**:
  1. Uses a stable location key (pathname + search) to identify routes
  2. On every route change, saves the previous route's scroll position to sessionStorage under a per-route map
  3. On navigation, checks `navigationType` — if `POP` (browser back/forward), restores the saved scroll position for the route; otherwise (PUSH/REPLACE) scrolls to top
  4. Persists the current route's scroll on `beforeunload` as a safety
- **Returns**: `null` (no visual output)
- **Side Effects**: Preserves scroll positions across browser back/forward navigations while ensuring new navigations scroll to top
- **Why**: Provides an SPA-friendly scroll restoration that mirrors native browser behavior and works with React Router v6+ navigation types

#### Global Layout Structure
```
<Router>
  <ScrollToTop />
  <div (main container with dark theme)>
    <Grain />                  // Film grain overlay
    <Navbar />                 // Persistent navigation
    <ContactSidebar />         // Slide-in contact form
    <main>
      <AnimatePresence>        // Page transition animations
        <Routes>               // Route definitions
```


          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/:deptName" element={<DepartmentPage />} />
          <Route path="/about/:deptName/lead" element={<LeadProfilePage />} />
          <Route path="/about/:deptName/:memberName" element={<MemberProfilePage />} />
          <Route path="/board/:memberName" element={<BoardProfilePage />} />
          <Route path="/domains" element={<DomainsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/recruitment" element={<RecruitmentPage />} />
        </Routes>
      </AnimatePresence>
    </main>
    <Footer />                 // Persistent footer
  </div>
</Router>
```

#### CSS Classes Applied (Tailwind)
- `min-h-screen`: Ensures full viewport height
- `bg-black text-white`: Dark theme colors
- `selection:bg-white selection:text-black`: Inverted text selection
- `font-sans antialiased`: Typography smoothing
- `overflow-x-hidden`: Prevents horizontal scroll

---

## 2. ROUTING & NAVIGATION

### File: `src/components/Navbar.jsx`

#### Purpose
Persistent navigation bar with responsive mobile menu and scroll-based styling.

#### Component: `Navbar({ onContactClick })`

**Contract:**
- **Props**:
  - `onContactClick` (function): Callback to open ContactSidebar
- **State Variables**:
  - `isOpen` (boolean): Mobile menu visibility

  - `scrolled` (boolean): Tracks scroll position for styling changes
- **Returns**: JSX navigation bar with logo, links, and mobile menu
- **Side Effects**: 
  - Window scroll listener (cleanup on unmount)
  - Scroll position tracking
- **Why**: Provides consistent navigation across all routes with dynamic styling

#### State Management: `isOpen`
- **Initial**: `false`
- **Purpose**: Controls mobile menu slide-down animation
- **Toggled by**: Hamburger/X icon click
- **Reset by**: NavLink clicks (closes menu after navigation)

#### State Management: `scrolled`
- **Initial**: `false`
- **Purpose**: Triggers navbar background blur when scrolled > 50px
- **Updated by**: `handleScroll()` event listener
- **Effect**: Changes navbar from transparent to `bg-black/60 backdrop-blur-xl`

#### Function: `handleScroll()`
**Contract:**
- **Input**: None (event listener)
- **Process**: Checks if `window.scrollY > 50`
- **Output**: Updates `scrolled` state
- **Why**: Creates floating navbar effect on scroll

#### Navigation Links Array
```javascript
const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Domains', href: '/domains' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' }
]
```



**NavLink Behavior:**
- Uses `react-router-dom` `NavLink` component
- `isActive` prop determines current route styling
- Active: `text-black bg-white` (inverted button)
- Inactive: `text-gray-400 hover:text-white`
- All links call `window.scrollTo(0, 0)` on click

#### Responsive Behavior
- **Desktop** (`md:block`): Horizontal nav links with Contact button
- **Mobile** (`md:hidden`): Hamburger menu → slide-down panel
- **Breakpoint**: 768px (Tailwind `md`)

---

### File: `src/components/Footer.jsx`

#### Purpose
Persistent footer with branding, social links, navigation, and contact information.

#### Component: `Footer()`

**Contract:**
- **Input**: None
- **Returns**: JSX footer with multiple sections
- **Side Effects**: None
- **Why**: Provides consistent site-wide footer with contact info and navigation

#### Function: `scrollToTop()`
**Contract:**
- **Input**: None (button click)
- **Process**: Calls `window.scrollTo({ top: 0, behavior: 'smooth' })`
- **Output**: None
- **Side Effects**: Smooth scroll to page top
- **Why**: User convenience for long pages

#### Footer Sections
1. **Brand Section**: Logo, tagline, social links
2. **Navigation Section**: Links to all main pages
3. **Contact Section**: Email and physical address
4. **Copyright Section**: Year, rights, scroll-to-top button



#### Social Links
- **GitHub**: https://github.com/Zero-Bugs-Club
- **Instagram**: https://www.instagram.com/zbcvitc
- **LinkedIn**: https://www.linkedin.com/in/zbc-vitc-905075301
- **Email**: zbcvitc@gmail.com

---

## 3. PAGES

### File: `src/pages/Home.jsx`

#### Purpose
Landing page that displays the Hero section with entry animations.

#### Component: `Home()`

**Contract:**
- **Input**: None
- **Returns**: Motion-wrapped Hero component
- **Framer Motion**:
  - `initial`: `{ opacity: 0 }`
  - `animate`: `{ opacity: 1 }`
  - `exit`: `{ opacity: 0 }`
  - `transition`: `{ duration: 0.5 }`
- **Why**: Simple wrapper for Hero with page transition animations

**Dependencies:**
- `Hero` component (src/components/Hero.jsx)
- `framer-motion` for page transitions

---

### File: `src/pages/AboutPage.jsx`

#### Purpose
Displays ZBC's mission, values, hierarchical board structure, and department entry points.

#### Component: `AboutPage()`

**Contract:**
- **Input**: None
- **State**: None (static content)
- **Returns**: JSX with values grid, board hierarchy, and department cards linked to dynamic member pages
- **Background Effect**: LightRays with top-center origin
- **Why**: Showcases ZBC's identity and provides navigation into department/member profiles



#### Values Array (Static Data)
```javascript
const values = [
  { icon: <Users />, title: "Community First", description: "..." },
  { icon: <Code2 />, title: "Clean Code", description: "..." },
  { icon: <Rocket />, title: "Production-Ready", description: "..." },
  { icon: <Brain />, title: "Mentorship", description: "..." },
  { icon: <Globe />, title: "Open Source", description: "..." },
  { icon: <Cpu />, title: "Performance", description: "..." }
]
```

#### Component: `TeamMemberCard({ name, role, socials, href, showViewText })`

**Contract:**
- **Props**:
  - `name` (string): Team member's name
  - `role` (string): Position/title (displayed for board/team listing; member cards may omit role)
  - `socials` (array, optional): Custom social link objects
  - `href` (string, optional): Internal route for clickable cards
  - `showViewText` (boolean, optional): When true and `href` is provided, displays the "View Members" affordance inside the card (used for department lead cards on the About page)
- **Returns**: Card with avatar placeholder, name, (optionally role), and either social links or the "View Members" affordance. When `href` is present the entire card is a clickable Link.
- **Avatar Size**: Larger avatar sizes are used across the app (AboutPage team cards: 32–40px, Member card list: 32px avatar, Member profile: 48–56px)
- **Animation**: Fade-in on scroll with `whileInView`
- **Why**: Reusable card for displaying team members consistently, with an explicit affordance for department lead cards to surface member navigation

**Socials Array Structure:**
```javascript
socials: [
  { icon: <Linkedin size={18} />, href: "https://..." },
  { icon: <Github size={18} />, href: "https://..." },
  { icon: <Mail size={18} />, href: "mailto:..." }
]
```

#### Component: `DepartmentCard({ department })`

**Contract:**
- **Props**:
  - `department` (object): Department record from `aboutDepartments`
- **Returns**: Clickable card linking to `/about/{department.slug}`
- **Displayed Fields**: Department initials, name, summary, and "View Members" affordance
- **Why**: Converts department config entries into scalable About page navigation

#### Component: `TeamHierarchy()`

**Contract:**
- **Input**: None
- **Returns**: Hierarchical board/team structure in 5 levels
- **Structure**:
  1. Chairperson (single card, centered)
  2. Vice Chairperson (single card, centered)
  3. General Secretary + Treasurer (2 cards, row)

  4. Departments (6 cards from `aboutDepartments`: Event, HR, Design, Projects, Outreach, Technical)
  5. Faculty Coordinator (single card, separated by border)
- **Why**: Visual representation of ZBC's organizational structure

---

### File: `src/pages/DepartmentPage.jsx`

#### Purpose
Displays all members for a selected About department route.

#### Component: `DepartmentPage()`

**Contract:**
- **Route**: `/about/:deptName`
- **Input**: `deptName` route param from `useParams()`
- **Data Source**: `getDepartmentBySlug(deptName)` from `src/config/about.config.js`
- **Returns**: Department hero, member count, and dynamic member profile cards
- **Not Found Behavior**: Renders a "Department not found" page with a link back to `/about`
- **Background Effect**: LightRays with top-center origin
- **Why**: Allows department membership to scale by editing config data instead of page routing code

#### Component: `ProfileAvatar({ name })`

**Contract:**
- **Props**:
  - `name` (string): Member name
- **Returns**: Placeholder avatar with derived initials. Avatar sizes used:
  - AboutPage team cards: 32px (small) → 40px (md+)
  - Member listing cards: 32px (compact)
  - Member profile page: 48–56px (large)
- **Why**: Provides a consistent profile placeholder until real member photos are available; larger sizes improve readability and visual impact across pages

#### Component: `MemberCard({ departmentSlug, member })`

**Contract:**
- **Props**:
  - `departmentSlug` (string): Parent department route slug
  - `member` (object): Member record from the department config
- **Returns**: Linked member card pointing to `/about/{departmentSlug}/{member.slug}`
- **Displayed Fields**: Initials avatar (larger size), name, description, and placeholder social icons. Role/title above the name is intentionally omitted in member lists to simplify the card display.
- **Why**: Reusable listing card for any number of department members; consistent avatar sizing and simplified textual hierarchy improves visual balance

---

### File: `src/pages/MemberProfilePage.jsx`

#### Purpose
Displays an individual club member profile and contribution record.

#### Component: `MemberProfilePage()`

**Contract:**
- **Route**: `/about/:deptName/:memberName`
- **Input**: `deptName` and `memberName` route params from `useParams()`
- **Data Source**: `getMemberBySlug(deptName, memberName)` from `src/config/about.config.js`
- **Returns**: LinkedIn-style profile section. Includes a "Lead Note" block (heading: "Lead Note") and a contributions block (heading: "Contributions"). The small uppercase labels above those regions were removed to simplify the layout.
- **Not Found Behavior**: Renders a "Member profile not found" page with a route-aware back link
- **Background Effect**: LightRays with top-center origin
- **Why**: Documents member contributions toward the club in a profile-like format without education/work/post sections

#### Component: `SocialLink({ href, icon, label })`

**Contract:**
- **Props**:
  - `href` (string): Social URL or placeholder `#`
  - `icon` (React node): Lucide icon
  - `label` (string): Accessible link label
- **Returns**: Circular icon link with external-link attributes when URL is not `#`
- **Why**: Keeps social link behavior consistent across profile pages

---

### File: `src/pages/RecruitmentPage.jsx`

#### Purpose
Dynamic recruitment application form with department-specific questions and validation.

#### Component: `RecruitmentPage()`

**Contract:**
- **Input**: None
- **State Variables**:
  - `formData` (object): All form field values
  - `errors` (object): Field-specific error messages
  - `isSubmitting` (boolean): Form submission state
  - `result` (object|null): Submission result message
- **Returns**: Multi-step form with conditional questions
- **Side Effects**: 
  - Redirects to /about if `isRecruiting` is false
  - Form submission via Web3Forms API
- **Why**: Handles recruitment applications with dynamic validation

#### State: `formData` Structure
```javascript
{
  name: '',           // string
  regNo: '',          // string (format: XXYYYXXXX)
  vitEmail: '',       // string (must end with @vit.ac.in)
  year: '',           // string ('1'|'2'|'3'|'4')
  department: '',     // string (department ID from config)
  answers: {}         // object { questionId: answerString }
}
```



#### Function: `handleInputChange(e)`

**Contract:**
- **Input**: Event object from input field
- **Process**:
  1. Extracts `name` and `value` from event target
  2. Updates `formData` state with new value
  3. Clears error for that field if exists
- **Output**: Updated `formData` state
- **Why**: Handles basic input fields (name, regNo, vitEmail, year)

#### Function: `handleAnswerChange(questionId, value)`

**Contract:**
- **Input**: 
  - `questionId` (string): Question identifier
  - `value` (string): User's answer
- **Process**:
  1. Updates `formData.answers[questionId]` with value
  2. Clears error for that question if exists
- **Output**: Updated `formData.answers` state
- **Why**: Handles dynamic question responses separately from basic fields

#### Function: `validateForm()`

**Contract:**
- **Input**: None (uses current `formData` state)
- **Process**: Validates all fields according to rules:
  1. **Name**: Required, non-empty
  2. **RegNo**: Required, matches pattern `/^\d{2}[a-zA-Z]{3}\d{4}$/`
  3. **VitEmail**: Required, matches pattern `/^[a-zA-Z0-9._%+-]+@vit\.ac\.in$/`
  4. **Year**: Required, non-empty
  5. **Department**: Required, non-empty
  6. **General Questions**: Check `required` flag and validation patterns
  7. **Domain Questions**: Check `required` flag for selected department
- **Output**: Object with error messages `{ fieldName: errorMessage }`
- **Returns**: Empty object if valid, object with errors if invalid
- **Why**: Centralized validation logic before submission



#### Function: `handleSubmit(e)`

**Contract:**
- **Input**: Form submit event
- **Process**:
  1. Prevents default form submission
  2. Calls `validateForm()`
  3. **If valid**:
     - Logs form data (demo mode)
     - Shows success alert
     - (Production: Would submit to backend)
  4. **If invalid**:
     - Finds first error field
     - Sets only that error in `errors` state
     - Scrolls to error field and focuses it
     - Auto-clears error after 3 seconds
- **Output**: None (side effects only)
- **Side Effects**: Form submission, error display, scrolling
- **Why**: One-error-at-a-time UX pattern for better user experience

#### Validation Patterns

**Registration Number:**
- Pattern: `/^\d{2}[a-zA-Z]{3}\d{4}$/`
- Example: `24BCE0000`
- Format: 2 digits, 3 letters, 4 digits

**VIT Email:**
- Pattern: `/^[a-zA-Z0-9._%+-]+@vit\.ac\.in$/`
- Must end with: `@vit.ac.in`

**GitHub URL (Development domain):**
- Pattern: `^https?:\\/\\/(www\\.)?github\\.com\\/[a-zA-Z0-9_-]+\\/?$`
- Example: `https://github.com/username`

#### Conditional Rendering Logic

**Recruitment Check:**
```javascript
useEffect(() => {
  if (!isRecruiting) {
    alert("We aren't recruiting right now. Stay tuned for updates!");
    navigate('/about');
  }
}, [isRecruiting, navigate]);
```



**Domain Questions Display:**
```javascript
{formData.department && (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
  >
    {/* Questions for selected department */}
  </motion.div>
)}
```
- Only shows when `department` is selected
- Animated with Framer Motion slide-down effect

---

### File: `src/pages/EventsPage.jsx`

#### Purpose
Interactive timeline of ZBC events with session filtering.

#### Component: `EventsPage()`

**Contract:**
- **Input**: None
- **State Variables**:
  - `selectedSession` (string): Current academic year filter
  - `isDropdownOpen` (boolean): Dropdown visibility
- **Returns**: Timeline with filterable events
- **Why**: Organizes events by academic year with interactive filtering

#### State: `selectedSession`
- **Initial**: `'2025 - 2026 Season'`
- **Options**: Array of session strings
- **Purpose**: Filters which events to display

#### Function: Dropdown Selection Logic
**Contract:**
- **When option clicked**:
  1. Updates `selectedSession` state
  2. Closes dropdown (`setIsDropdownOpen(false)`)
  3. Triggers re-render with filtered events
- **Why**: User-controlled event filtering



#### Event Data Structure
```javascript
{
  month: "OCT",           // string (3-letter abbreviation)
  day: "15",              // string (day number)
  year: "2024",           // string (year)
  title: "Event Name",    // string
  time: "10:00 AM - 02:00 PM",  // string
  location: "AB3 401",    // string
  status: "Completed"|"Upcoming"|"TBA",  // string
  regStatus: "Open"|"Closed"|null  // string|null
}
```

#### Status Badge Styling Logic
**Contract:**
- **Completed**: `border-green-500/50 text-green-500`
- **Upcoming**: `border-yellow-500/50 text-yellow-500`
- **TBA**: `border-gray-700 text-gray-500`

**Registration Status (Upcoming only):**
- **Open**: Clickable link to EventHub, blue styling
- **Closed**: Red styling, not clickable

---

### File: `src/pages/DomainsPage.jsx`

#### Purpose
Showcases ZBC's technical activities and workshop domains.

#### Component: `DomainsPage()`

**Contract:**
- **Input**: None
- **State**: None (static content)
- **Returns**: Grid of activity cards with hover animations
- **Why**: Informs visitors about ZBC's technical offerings

#### Activities Array (Static Data)
```javascript
const activities = [
  {
    title: "Technical Workshops",
    desc: "Expert-led sessions covering full-stack development...",
    tags: ["React", "Python", "Node.js", "Docker"]
  },
  // ... more activities
]
```



#### Hover Animation Pattern
- **Initial**: `{ opacity: 0, x: -50 }`
- **Animate**: `{ opacity: 1, x: 0 }`
- **Transition**: Staggered delay (`index * 0.1`)
- **Hover**: Title translates right (`group-hover:pl-4`)

---

### File: `src/pages/GalleryPage.jsx`

#### Purpose
Visual gallery of ZBC event photos (currently with placeholder gradients).

#### Component: `GalleryPage()`

**Contract:**
- **Input**: None
- **State**: None
- **Returns**: Masonry-style grid of image placeholders
- **Why**: Displays event photography in an aesthetic grid layout

#### Grid Layout Logic
```javascript
const items = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  size: i % 3 === 0 ? "large" : "small",
  color: `bg-neutral-${(i % 5 + 4) * 100}`
}));
```

**Size Behavior:**
- **Large** (every 3rd item): `lg:col-span-2 lg:row-span-2`
- **Small** (others): Single grid cell

**Grid Configuration:**
- Columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Row height: `auto-rows-[300px]`
- Gap: `gap-4`

---

## 4. COMPONENTS

### File: `src/components/Hero.jsx`

#### Purpose
Landing hero section with animated text, ColorBends background, and Spotlight effect.

#### Component: `Hero()`

**Contract:**
- **Input**: None

- **State**: Uses `navigate` from react-router-dom
- **Returns**: Full-screen hero with layered visual effects
- **Dependencies**: 
  - `ColorBends` (WebGL fluid background)
  - `Spotlight` (mouse-follow highlight)
  - `recruitment.config.js` (feature flag)
- **Why**: Creates immersive landing experience

#### Function: `handleJoinClick()`

**Contract:**
- **Input**: None (button click)
- **Process**:
  1. Checks `recruitmentConfig.isRecruiting`
  2. **If true**: Navigates to `/recruitment`
  3. **If false**: Shows alert and navigates to `/about`
- **Output**: Route navigation
- **Why**: Conditional routing based on recruitment status

#### Text Animation Cascade
```javascript
"ZERO"  → delay: 0s
"BUGS"  → delay: 0.1s (with glitch effect)
"CLUB"  → delay: 0.2s
Tagline → delay: 0.4s
Button  → delay: 0.6s
```

**Animation Pattern:**
- Slide up from bottom (`y: "100%" → y: 0`)
- Easing: `[0.16, 1, 0.3, 1]` (smooth deceleration)
- Creates sequential reveal effect

#### ColorBends Configuration
```javascript
colors={['#726e6e', '#111111', '#000000']}
mouseInfluence={0.5}
alpha={0.2}
```

#### Decorative Element (Bottom-right)
- Monospace text simulating system initialization
- Hidden on mobile (`hidden md:block`)
- Opacity: 0.3 for subtlety

---

### File: `src/components/ContactSidebar.jsx`



#### Purpose
Slide-in contact form with Web3Forms integration for serverless email delivery.

#### Component: `ContactSidebar({ isOpen, onClose })`

**Contract:**
- **Props**:
  - `isOpen` (boolean): Controls sidebar visibility
  - `onClose` (function): Callback to close sidebar
- **State Variables**:
  - `formData` (object): `{ name: '', message: '' }`
  - `isSubmitting` (boolean): Submission loading state
  - `result` (object|null): Success/error message
- **Returns**: Animated sidebar with contact form
- **Side Effects**: Form submission via Web3Forms API
- **Why**: Direct communication channel without backend code

#### Function: `handleChange(e)`

**Contract:**
- **Input**: Input change event
- **Process**: Updates `formData[e.target.name]` with `e.target.value`
- **Output**: Updated `formData` state
- **Why**: Controlled form inputs

#### Function: `handleSubmit(e)`

**Contract:**
- **Input**: Form submit event
- **Process**:
  1. Prevents default submission
  2. Sets `isSubmitting` to `true`
  3. Creates FormData with Web3Forms access key
  4. Appends: name, message, subject, botcheck (honeypot)
  5. POSTs to `https://api.web3forms.com/submit`
  6. Parses response JSON
  7. **If success**: Shows success message, clears form
  8. **If error**: Shows error message
  9. Sets `isSubmitting` to `false`
- **Output**: Result object with success/error state
- **Side Effects**: Network request, state updates


- **Why**: Serverless contact form without backend infrastructure

#### Web3Forms Configuration
- **Access Key**: `cf3291dd-bdb8-44a1-9371-b5d5a3f51aba`
- **Subject Format**: `New Message from ZBC Website: ${formData.name}`
- **Honeypot**: `botcheck` field (hidden, prevents spam)

#### Animation Pattern (Framer Motion)
- **Backdrop**: Fade in/out (`opacity: 0 → 1`)
- **Sidebar**: Slide from right (`x: '100%' → x: 0`)
- **Transition**: Spring animation (`damping: 25, stiffness: 200`)
- **Exit**: Reverse animations

#### Social Links Array
```javascript
const socialLinks = [
  { icon: <Github />, href: "#", bg: "hover:bg-[#333]" },
  { icon: <Linkedin />, href: "#", bg: "hover:bg-[#0077b5]" },
  { icon: <Instagram />, href: "#", bg: "hover:bg-[#E1306C]" },
  { icon: <Mail />, href: "mailto:zbcvitc@gmail.com", bg: "hover:bg-[#EA4335]" }
]
```

---

## 5. UI EFFECTS COMPONENTS

### File: `src/components/ui/ColorBends.jsx`

#### Purpose
WebGL-based fluid color animation using Three.js custom shaders.

#### Component: `ColorBends({ ...props })`

**Contract:**
- **Props**:
  - `className` (string, default: ""): Additional CSS classes
  - `style` (object): Inline styles
  - `rotation` (number, default: 45): Base rotation angle in degrees
  - `speed` (number, default: 0.2): Animation speed multiplier

  - `colors` (array, default: []): Hex color array (max 8)
  - `transparent` (boolean, default: true): Enable alpha channel
  - `autoRotate` (number, default: 0): Auto-rotation speed
  - `scale` (number, default: 1): Zoom level
  - `frequency` (number, default: 1): Pattern frequency
  - `warpStrength` (number, default: 1): Distortion intensity
  - `mouseInfluence` (number, default: 1): Mouse interaction strength
  - `parallax` (number, default: 0.5): Parallax scroll effect
  - `noise` (number, default: 0.1): Grain noise amount
- **Returns**: Canvas element with animated WebGL shader
- **Side Effects**: 
  - Creates Three.js renderer
  - Animation loop (requestAnimationFrame)
  - ResizeObserver for responsive sizing
- **Why**: Creates organic, animated background effects

#### Shader Uniforms (GPU Variables)
```javascript
uCanvas: vec2        // Canvas dimensions
uTime: float         // Elapsed time
uSpeed: float        // Animation speed
uRot: vec2           // Rotation (cos, sin)
uColorCount: int     // Number of colors
uColors: vec3[8]     // Color array (RGB 0-1)
uTransparent: int    // Transparency flag
uScale: float        // Zoom level
uFrequency: float    // Pattern frequency
uWarpStrength: float // Distortion
uPointer: vec2       // Mouse position (NDC)
uMouseInfluence: float // Mouse effect strength
uParallax: float     // Parallax amount
uNoise: float        // Noise intensity
```

#### Fragment Shader Algorithm
1. Transforms UV coordinates to NDC (-1 to 1)
2. Applies rotation transformation
3. Applies parallax offset based on mouse

4. Divides by scale
5. Applies polar-like distortion
6. Iterates through colors, creating layered sine waves
7. Applies warping based on `warpStrength`
8. Blends colors with exponential falloff
9. Adds grain noise if enabled
10. Outputs final RGBA color

#### Mouse Tracking Logic
**Contract:**
- Listens to `pointermove` on container
- Converts client coordinates to NDC (-1 to 1)
- Updates `pointerTargetRef` immediately
- `pointerCurrentRef` lerps toward target (smoothing)
- Smoothing factor: `dt * 8` (responsive but smooth)

#### Cleanup Pattern
```javascript
useEffect(() => {
  // Setup Three.js scene, renderer, mesh
  return () => {
    cancelAnimationFrame(rafRef.current);
    resizeObserver.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
}, [dependencies]);
```

---

### File: `src/components/ui/LightRays.jsx`

#### Purpose
WebGL volumetric light rays using OGL library with dynamic origin positioning.

#### Component: `LightRays({ ...props })`

**Contract:**
- **Props**:
  - `raysOrigin` (string, default: 'top-center'): Light source position
    - Options: 'top-left', 'top-center', 'top-right', 'left', 'right', 'bottom-left', 'bottom-center', 'bottom-right'
  - `raysColor` (string, default: '#ffffff'): Light color (hex)

  - `raysSpeed` (number, default: 1): Animation speed
  - `lightSpread` (number, default: 1): Beam width
  - `rayLength` (number, default: 2): Ray distance
  - `pulsating` (boolean, default: false): Pulse effect
  - `fadeDistance` (number, default: 1.0): Fade start distance
  - `saturation` (number, default: 1.0): Color saturation
  - `followMouse` (boolean, default: true): Mouse tracking
  - `mouseInfluence` (number, default: 0.1): Mouse effect strength
  - `noiseAmount` (number, default: 0.0): Animated noise
  - `distortion` (number, default: 0.0): Wave distortion
- **Returns**: Canvas with animated light rays
- **Side Effects**: 
  - OGL renderer initialization
  - IntersectionObserver for performance (only renders when visible)
  - Animation loop
- **Why**: Creates dramatic lighting effects without performance impact

#### Function: `getAnchorAndDir(origin, w, h)`

**Contract:**
- **Input**:
  - `origin` (string): Origin position key
  - `w` (number): Canvas width in pixels
  - `h` (number): Canvas height in pixels
- **Process**: Calculates anchor point and ray direction based on origin
- **Output**: `{ anchor: [x, y], dir: [dx, dy] }`
- **Logic**:
  - Offset = 0.2 * width (prevents source from being on-screen)
  - Anchor placed outside viewport
  - Direction vector points inward
- **Why**: Positions light source consistently regardless of page dimensions

**Example Outputs:**
```javascript
'top-center' → { anchor: [w*0.5, -offset], dir: [0, 1] }
'right'      → { anchor: [w+offset, h*0.5], dir: [-1, 0] }
```



#### Fragment Shader Function: `rayStrength()`

**Contract:**
- **Inputs**:
  - `raySource` (vec2): Light source position
  - `rayRefDirection` (vec2): Base ray direction
  - `coord` (vec2): Current pixel position
  - `seedA`, `seedB` (float): Animation seeds
  - `speed` (float): Time multiplier
- **Process**:
  1. Calculate vector from source to pixel
  2. Compute angle between pixel direction and ray direction
  3. Apply distortion: `cosAngle + distortion * sin(time + length)`
  4. Compute spread falloff: `pow(cosAngle, 1/lightSpread)`
  5. Compute distance falloff (linear fade)
  6. Compute fade distance falloff (near-fade)
  7. Apply pulsating effect if enabled
  8. Combine with animated sine waves (seeds A and B)
- **Output**: Float (0-1) representing ray intensity at pixel
- **Why**: Creates realistic volumetric light with controllable parameters

#### Intersection Observer Pattern
```javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    entries => setIsVisible(entries[0].isIntersecting),
    { threshold: 0.1 }
  );
  observer.observe(containerRef.current);
  return () => observer.disconnect();
}, []);
```
**Why**: Only initializes WebGL when component is 10% visible, saves GPU resources

#### Mouse Tracking with Smoothing
```javascript
const smoothing = 0.92;
smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + 
                           mouseRef.current.x * (1 - smoothing);
```
**Smoothing Factor**: 0.92 = slow, smooth follow (exponential moving average)

---

### File: `src/components/ui/Spotlight.jsx`

#### Purpose
Interactive spotlight effect that follows mouse cursor.



#### Component: `Spotlight({ children, className })`

**Contract:**
- **Props**:
  - `children` (ReactNode): Content to wrap with spotlight effect
  - `className` (string, default: ""): Additional CSS classes
- **State Variables**:
  - `position` (object): `{ x: number, y: number }` - Mouse position relative to container
  - `opacity` (number): Spotlight visibility (0 or 1)
- **Returns**: Wrapper div with radial gradient spotlight that follows mouse
- **Side Effects**: Mouse event listeners on container
- **Why**: Creates interactive highlight effect on hover

#### Function: `handleMouseMove(e)`

**Contract:**
- **Input**: Mouse move event
- **Process**:
  1. Gets container bounding rect
  2. Calculates mouse position relative to container top-left
  3. Updates `position` state: `{ x: clientX - rect.left, y: clientY - rect.top }`
- **Output**: Updated position state
- **Why**: Tracks mouse position for spotlight rendering

#### Function: `handleMouseEnter()`

**Contract:**
- **Input**: Mouse enter event
- **Process**: Sets `opacity` to 1
- **Output**: Spotlight becomes visible
- **Why**: Shows spotlight when mouse enters container

#### Function: `handleMouseLeave()`

**Contract:**
- **Input**: Mouse leave event
- **Process**: Sets `opacity` to 0
- **Output**: Spotlight fades out
- **Why**: Hides spotlight when mouse leaves container

#### Spotlight Rendering
```css
background: radial-gradient(
  600px circle at ${position.x}px ${position.y}px,
  rgba(255,255,255,0.1),
  transparent 40%
)
```
**Parameters:**
- **Size**: 600px radius circle
- **Center**: Mouse position
- **Color**: White with 10% opacity at center
- **Falloff**: Transparent at 40% of radius



---

### File: `src/components/ui/Grain.jsx`

#### Purpose
Full-screen film grain texture overlay for aesthetic enhancement.

#### Component: `Grain()`

**Contract:**
- **Input**: None
- **State**: None
- **Returns**: Fixed-position div with noise texture
- **Side Effects**: None
- **Why**: Adds subtle texture to enhance visual depth

#### CSS Properties
```css
position: fixed
inset: 0 (covers entire viewport)
z-index: 9999 (top layer)
opacity: 0.05 (very subtle)
mix-blend-mode: overlay (blends with content)
pointer-events: none (allows interaction through)
```

#### Texture Source
- **URL**: `https://grainy-gradients.vercel.app/noise.svg`
- **Type**: SVG noise pattern
- **Repetition**: Tiled across full screen
- **Why**: Lightweight, scalable texture

---

## 6. CONFIGURATION

### File: `src/config/about.config.js`

#### Purpose
Centralized configuration for About department routes and member profile content.

#### Export: `aboutDepartments`

**Contract:**
- **Type**: Array of department objects
- **Used by**: AboutPage.jsx, DepartmentPage.jsx, MemberProfilePage.jsx
- **Why**: Single source of truth for scalable department/member pages

#### Department Object Structure
```javascript
{
  slug: 'technical',
  name: 'Technical',
  summary: 'Short department description',
  lead: 'Lead Name',
  leadNote: 'Board/lead note about members in this department',
  members: [memberObject]
}
```
- `slug` (string): URL segment used in `/about/:deptName`
- `name` (string): Display name
- `summary` (string): Department page and About card copy
- `lead` (string): Display name for the department lead (shown on About and Department pages)
- `leadNote` (string): Text shown on the lead/member profile pages describing the department/lead context
- `members` (array): Dynamic list of member records

#### Member Object Structure
```javascript
{
  slug: 'member-name',
  name: 'Member Name',
  role: 'Role',
  description: 'Short member profile summary',
  github: '#',
  linkedin: '#',
  instagram: '#',
  contributions: ['Documented contribution']
}
```
- `slug` (string): URL segment used in `/about/:deptName/:memberName`
- `name` (string): Display name
- `role` (string): Department role or profile title
- `description` (string): Card/profile description
- `github`, `linkedin`, `instagram` (string): Social URLs or placeholder `#`
- `contributions` (array): Contribution log shown on profile page

#### Function: `getDepartmentBySlug(slug)`

**Contract:**
- **Input**: `slug` string from route params
- **Process**: Finds matching department in `aboutDepartments`
- **Returns**: Department object or `undefined`
- **Why**: Shared lookup helper for dynamic department routes

#### Function: `getMemberBySlug(departmentSlug, memberSlug)`

**Contract:**
- **Input**:
  - `departmentSlug` (string): Department route slug
  - `memberSlug` (string): Member route slug
- **Process**:
  1. Finds department with `getDepartmentBySlug`
  2. If `memberSlug` matches a special lead slug pattern (e.g. `${departmentSlug}-lead`), synthesize a lead `member` object using `department.lead`, `department.leadNote` and an empty `contributions` array so lead pages can reuse member-profile components.
  3. Otherwise, finds member within `department.members`
- **Returns**: `{ department, member }` (where `member` may be a synthesized lead object)
- **Why**: Shared lookup helper for member and lead profile routes and route-aware not-found states. Synthesizing a lead object avoids duplicating the profile component for leads.

#### Export: `boardMembers` and Function: `getBoardMemberBySlug(slug)`

**Contract:**
- **boardMembers**: Array of board-level member objects (e.g., president, vice-president, general secretary, co-secretary). Same member object shape as department members; used by AboutPage and BoardProfilePage.
- **getBoardMemberBySlug(slug)**: Finds a board member by slug, returns `{ member }` or `undefined`.
- **Why**: Centralizes board member data and lookup to power board profile pages and About page listings.

---

### File: `src/config/recruitment.config.js`

#### Purpose
Centralized configuration for recruitment feature flag and form structure.

#### Export: `recruitmentConfig`

**Contract:**
- **Type**: Object
- **Fields**:
  - `isRecruiting` (boolean): Master toggle for recruitment feature
  - `departments` (array): Available department options
  - `generalQuestions` (array): Questions for all applicants
  - `domainQuestions` (object): Department-specific questions
- **Used by**: RecruitmentPage.jsx, Hero.jsx
- **Why**: Single source of truth for recruitment configuration



#### Field: `isRecruiting`
- **Type**: `boolean`
- **Purpose**: Feature flag to enable/disable recruitment
- **Impact**:
  - `true`: Recruitment page accessible, "Join Us" button works
  - `false`: Redirects to /about, shows alert message
- **Modification**: Change this single value to toggle recruitment globally

#### Field: `departments`
**Structure:**
```javascript
[
  { id: 'development', name: 'Development' },
  { id: 'ui_ux', name: 'UI/UX' },
  { id: 'cybersec_testing', name: 'Cybersec and Testing' },
  { id: 'design_content', name: 'Design and Content' },
  { id: 'social_marketing', name: 'Social Media and Marketing' },
  { id: 'management', name: 'Management' }
]
```
- **id**: Internal identifier (used as object key)
- **name**: Display name (shown in dropdown)

#### Field: `generalQuestions`
**Structure:**
```javascript
[
  {
    id: 'why_zbc',
    label: 'Why do you want to join ZBC?',
    type: 'textarea',
    required: true,
    placeholder: 'Tell us about your motivation...'
  }
]
```
**Question Object Contract:**
- `id` (string): Unique identifier
- `label` (string): Question text
- `type` (string): Input type ('text' | 'textarea' | 'url')
- `required` (boolean): Whether answer is mandatory
- `placeholder` (string): Input placeholder text
- `validation` (object, optional): Validation rules
  - `pattern` (string): Regex pattern
  - `message` (string): Error message



#### Field: `domainQuestions`
**Structure:**
```javascript
{
  development: [
    {
      id: 'tech_stack',
      label: 'What is your preferred tech stack?',
      type: 'text',
      required: true,
      placeholder: 'e.g., React, Node.js, Python...'
    },
    {
      id: 'github_link',
      label: 'GitHub Profile Link',
      type: 'url',
      required: true,
      placeholder: 'https://github.com/username',
      validation: {
        pattern: "^https?:\\/\\/(www\\.)?github\\.com\\/[a-zA-Z0-9_-]+\\/?$",
        message: "Please enter a valid GitHub profile link"
      }
    }
  ],
  ui_ux: [ /* ... */ ],
  cybersec_testing: [ /* ... */ ],
  design_content: [ /* ... */ ],
  social_marketing: [ /* ... */ ],
  management: [ /* ... */ ]
}
```
- **Key**: Department ID (must match `departments[].id`)
- **Value**: Array of question objects (same structure as generalQuestions)
- **Conditional Display**: Only shown when matching department selected

---

## 7. STYLING & ANIMATIONS

### File: `src/index.css`

#### Purpose
Global CSS with Tailwind imports, color scheme, and custom animations.

#### Tailwind Import
```css
@import "tailwindcss";
```
- Imports all Tailwind utilities
- Configured via `tailwind.config.js`

#### Root Color Scheme
```css
:root {
  color-scheme: dark;
}
```
- **Effect**: Tells browser to use dark mode for form controls
- **Why**: Consistent with dark theme aesthetic



#### Global Body Styles
```css
body {
  @apply bg-black text-white font-sans overflow-x-hidden;
}
```
- **bg-black**: Black background (#000000)
- **text-white**: White text (#ffffff)
- **font-sans**: Inter font family (from Google Fonts)
- **overflow-x-hidden**: Prevents horizontal scrollbar

#### Glitch Effect Classes

**Class: `.glitch-wrapper`**
- **Purpose**: Container for glitch effect text
- **Display**: `position: relative; display: inline-block;`

**Class: `.glitch` (with data-text attribute)**
**Contract:**
- **Pseudo-elements**: `::before` and `::after`
- **Content**: `attr(data-text)` - duplicates text content
- **Position**: Absolutely positioned on top of original
- **Animation**: `glitch-anim-1` and `glitch-anim-2` (2s infinite)
- **Effect**: 
  - `::before`: Shifts left 2px with white shadow, animated clip
  - `::after`: Shifts right 2px with white shadow, animated clip
- **Why**: Creates cyberpunk-style glitch distortion

**Keyframes: `glitch-anim-1` and `glitch-anim-2`**
**Contract:**
- **Duration**: 2s infinite linear alternate-reverse
- **Mechanism**: Animates `clip` property with random rect values
- **Effect**: Reveals different horizontal slices of text
- **Why**: Creates unpredictable, glitchy appearance

#### Reveal Animation Classes

**Class: `.reveal`**
```css
opacity: 0;
transform: translateY(30px);
transition: all 0.8s ease-out;
```
- **Initial State**: Hidden, shifted down 30px
- **Transition**: 0.8s with ease-out easing

**Class: `.reveal.active`**
```css
opacity: 1;
transform: translateY(0);
```
- **Final State**: Visible, original position
- **Trigger**: JavaScript adds `active` class on scroll
- **Why**: Scroll-triggered fade-in effect



---

### File: `tailwind.config.js`

#### Purpose
Tailwind CSS configuration with custom theme extensions.

#### Content Paths
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"
]
```
- **Purpose**: Tells Tailwind which files to scan for class names
- **Why**: Purges unused CSS in production build

#### Theme Extensions

**Custom Colors:**
```javascript
colors: {
  background: '#0a0a0a',  // Almost black
  surface: '#171717',     // Dark grey
  primary: '#ffffff',     // White
  secondary: '#a3a3a3'    // Light grey
}
```
- **Usage**: `bg-background`, `text-surface`, etc.
- **Why**: Semantic color naming for dark theme

**Font Family:**
```javascript
fontFamily: {
  sans: ['Inter', 'sans-serif']
}
```
- **Inter**: Google Font loaded in index.html
- **Weights**: 300, 400, 600, 800
- **Why**: Modern, readable sans-serif for UI

---

## 8. STATE MANAGEMENT PATTERNS

### Global State (App.jsx)

**Pattern**: Prop drilling for simple state

**State Variables:**
1. `isContactOpen` (App.jsx)
   - **Consumers**: ContactSidebar (via props), Navbar (via callback)
   - **Flow**: Navbar button → App state → ContactSidebar visibility

**Why No External State Management:**
- Small application with minimal shared state
- Prop drilling is manageable with shallow component tree
- Avoids dependency overhead (Redux, Zustand, etc.)



### Local State Patterns

#### Pattern 1: Form State (RecruitmentPage, ContactSidebar)
```javascript
const [formData, setFormData] = useState({
  field1: '',
  field2: '',
  nestedObject: {}
});

const handleChange = (e) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};
```
- **Why**: Controlled inputs with single state object
- **Benefits**: Easy to serialize, clear structure

#### Pattern 2: Toggle State (Navbar, EventsPage)
```javascript
const [isOpen, setIsOpen] = useState(false);
```
- **Why**: Simple boolean flags for UI visibility
- **Common Use**: Modals, dropdowns, mobile menus

#### Pattern 3: Scroll State (Navbar)
```javascript
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```
- **Why**: Reactive to window events
- **Cleanup**: Removes listener on unmount

#### Pattern 4: Ref-Based State (WebGL Components)
```javascript
const uniformsRef = useRef(null);
const rendererRef = useRef(null);
```
- **Why**: Persist values across renders without causing re-renders
- **Use Case**: Three.js/OGL objects, animation frames

---

## 9. FORM VALIDATION PATTERNS

### One-Error-At-A-Time Pattern (RecruitmentPage)

**Philosophy**: Show only the first error to avoid overwhelming users

**Implementation:**
```javascript
const formErrors = validateForm();

if (Object.keys(formErrors).length > 0) {
  const firstErrorField = Object.keys(formErrors)[0];
  setErrors({ [firstErrorField]: formErrors[firstErrorField] });
  
  // Scroll to error
  const element = document.getElementsByName(firstErrorField)[0];
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  element?.focus({ preventScroll: true });
  
  // Auto-clear after 3 seconds
  setTimeout(() => {
    setErrors(prev => {
      const newState = { ...prev };
      delete newState[firstErrorField];
      return newState;
    });
  }, 3000);
}
```



**Benefits:**
1. User focuses on one issue at a time
2. Reduces cognitive load
3. Provides immediate context (scroll + focus)
4. Auto-dismissal allows continued editing

### Real-Time Error Clearing Pattern

**Contract:**
```javascript
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Clear error when user starts typing
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
  }
};
```

**Why**: Immediate feedback that issue is being addressed

### Inline Error Display Pattern

**Contract:**
```javascript
{errors.fieldName && (
  <span
    className="text-red-500 text-xs mt-1 cursor-pointer block"
    onClick={() => setErrors(prev => ({ ...prev, fieldName: '' }))}
  >
    {errors.fieldName}
  </span>
)}
```

**Features:**
- Red text (error convention)
- Small size (xs) to not dominate UI
- Clickable to dismiss
- Appears directly below input

---

## 10. WEBGL SHADER CONTRACTS

### ColorBends Vertex Shader

**Purpose**: Pass UV coordinates to fragment shader

**Contract:**
```glsl
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;  // Convert -1..1 to 0..1
  gl_Position = vec4(position, 0.0, 1.0);
}
```

**Input**: `position` attribute (screen-space quad: -1 to 1)
**Output**: `vUv` varying (UV coordinates: 0 to 1)



### ColorBends Fragment Shader

**Purpose**: Generate organic fluid color patterns

**Algorithm Contract:**

1. **UV Transformation**
   ```glsl
   vec2 p = vUv * 2.0 - 1.0;  // NDC coordinates
   ```

2. **Rotation**
   ```glsl
   vec2 rp = vec2(
     p.x * uRot.x - p.y * uRot.y,
     p.x * uRot.y + p.y * uRot.x
   );
   ```

3. **Aspect Correction**
   ```glsl
   vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
   ```

4. **Polar-Like Distortion**
   ```glsl
   q /= max(uScale, 0.0001);
   q /= 0.5 + 0.2 * dot(q, q);
   ```
   - Creates radial warping effect
   - Stronger distortion away from center

5. **Time Offset**
   ```glsl
   q += 0.2 * cos(t) - 7.56;
   ```
   - Animates pattern movement

6. **Mouse Influence**
   ```glsl
   vec2 toward = (uPointer - rp);
   q += toward * uMouseInfluence * 0.2;
   ```
   - Pulls pattern toward mouse

7. **Color Layering Loop**
   ```glsl
   for (int i = 0; i < MAX_COLORS; ++i) {
     vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
     float m = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
     float w = 1.0 - exp(-6.0 / exp(6.0 * m));
     sumCol += uColors[i] * w;
   }
   ```
   - Creates sine wave patterns
   - Each color layer slightly offset
   - Exponential falloff for smooth blending



8. **Warping Effect (when uWarpStrength > 0)**
   ```glsl
   vec2 disp = (r - s) * clamp(uWarpStrength, 0.0, 1.0);
   float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
   vec2 warped = s + disp * gain;
   ```
   - Displaces pattern based on gradients
   - Allows strength > 1 for extreme distortion

9. **Noise Addition**
   ```glsl
   float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
   col += (n - 0.5) * uNoise;
   ```
   - Pseudo-random noise per pixel
   - Centered around 0 (-0.5 to +0.5)

**Output**: `vec4(rgb, alpha)` - Final color with optional transparency

---

### LightRays Fragment Shader

**Purpose**: Generate volumetric light beams from a source point

**Main Function: `rayStrength()`**

**Contract:**
```glsl
float rayStrength(
  vec2 raySource,
  vec2 rayRefDirection,
  vec2 coord,
  float seedA,
  float seedB,
  float speed
)
```

**Algorithm:**

1. **Direction Calculation**
   ```glsl
   vec2 sourceToCoord = coord - raySource;
   vec2 dirNorm = normalize(sourceToCoord);
   float cosAngle = dot(dirNorm, rayRefDirection);
   ```

2. **Distortion Application**
   ```glsl
   float distortedAngle = cosAngle + 
     distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
   ```
   - Adds wave-like motion to rays

3. **Spread Falloff**
   ```glsl
   float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
   ```
   - Controls beam width
   - Higher lightSpread = wider beams



4. **Distance Falloff**
   ```glsl
   float distance = length(sourceToCoord);
   float maxDistance = iResolution.x * rayLength;
   float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
   ```
   - Linear fade based on distance

5. **Near-Fade**
   ```glsl
   float fadeFalloff = clamp(
     (iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance),
     0.5, 1.0
   );
   ```
   - Prevents rays from being too bright near source

6. **Pulsating Effect**
   ```glsl
   float pulse = pulsating > 0.5 ? 
     (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;
   ```
   - Optional rhythmic intensity variation

7. **Animated Waves**
   ```glsl
   float baseStrength = clamp(
     (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
     (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
     0.0, 1.0
   );
   ```
   - Two overlapping sine waves with different seeds
   - Creates organic, non-uniform ray patterns

8. **Final Combination**
   ```glsl
   return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
   ```

**Output**: Float (0-1) representing ray intensity

---

## 11. COMPONENT REUSABILITY PATTERNS

### Pattern: Static Content Components

**Examples**: About.jsx, Activities.jsx, Gallery.jsx, Timeline.jsx

**Contract:**
- No props (or minimal props)
- Static data arrays defined inside component
- No external state management
- Self-contained styling

**When to Use:**
- Content that rarely changes
- Simple display components
- Section components on landing page



### Pattern: Configuration-Driven Components

**Example**: RecruitmentPage.jsx with recruitment.config.js

**Contract:**
- External configuration object
- Component reads config and renders accordingly
- No hardcoded data in component

**Benefits:**
- Easy to update without code changes
- Single source of truth for data
- Clear separation of content and presentation

**When to Use:**
- Forms with dynamic fields
- Feature flags
- User-configurable content

### Pattern: Compound Components

**Example**: TeamHierarchy → TeamMemberCard

**Contract:**
- Parent component manages structure
- Child component handles individual items
- Props pass data down

**When to Use:**
- Repeating UI patterns
- Lists with consistent item structure
- Need for item-level interactivity

---

## 12. ANIMATION CONTRACTS

### Framer Motion Page Transitions

**Standard Pattern:**
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
>
```

**Used On**: All page components (Home, AboutPage, DomainsPage, etc.)

**Why**: Smooth fade transitions between routes

### Scroll-Triggered Animations

**Pattern:**
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1 }}
>
```

**Used On**: Value cards, team cards, activity cards

**Features:**
- Triggers when element enters viewport
- `once: true` prevents re-animation on scroll up
- Staggered delays for sequential reveal



### Text Cascade Animation (Hero)

**Pattern:**
```javascript
<motion.span
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  transition={{ 
    duration: 0.8, 
    delay: 0.1 * wordIndex, 
    ease: [0.16, 1, 0.3, 1] 
  }}
>
```

**Effect**: Words slide up from overflow container
**Easing**: Custom cubic-bezier for smooth deceleration

### Hover Animations

**Pattern 1: Scale on Hover**
```javascript
className="group-hover:scale-110 transition-transform duration-300"
```

**Pattern 2: Translate on Hover**
```javascript
className="group-hover:translate-x-2 transition-transform duration-300"
```

**Pattern 3: Color Change**
```javascript
className="group-hover:text-white transition-colors"
```

**Tailwind Transition Classes:**
- `transition-all`: All properties
- `transition-transform`: Only transforms
- `transition-colors`: Only colors
- `duration-300`: 300ms duration

---

## 13. RESPONSIVE DESIGN PATTERNS

### Mobile-First Breakpoints (Tailwind)

**Default**: Mobile styles (< 768px)
**md**: 768px and up (tablets)
**lg**: 1024px and up (desktops)

### Navigation Responsive Pattern

**Mobile**: 
- Hamburger menu icon
- Full-screen dropdown menu
- Vertical link stack

**Desktop**:
- Horizontal navigation bar
- Inline links with hover effects
- Persistent contact button

**Implementation:**
```javascript
// Desktop nav
<div className="hidden md:block">
  {/* Horizontal links */}
</div>

// Mobile toggle
<div className="md:hidden">
  <button onClick={() => setIsOpen(!isOpen)}>
    {isOpen ? <X /> : <Menu />}
  </button>
</div>
```



### Grid Responsive Patterns

**Pattern 1: Column Count Change**
```javascript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

**Pattern 2: Flex Direction Change**
```javascript
className="flex flex-col md:flex-row"
```
- Mobile: Vertical stack
- Desktop: Horizontal row

**Pattern 3: Conditional Sizing**
```javascript
className="text-5xl md:text-7xl"
```
- Mobile: Smaller text
- Desktop: Larger text

### Sidebar Responsive Pattern

**ContactSidebar:**
```javascript
className="w-full sm:w-[400px]"
```
- Mobile: Full-screen width
- Desktop: Fixed 400px width

---

## 14. PERFORMANCE OPTIMIZATION PATTERNS

### WebGL Visibility Optimization (LightRays)

**Contract:**
```javascript
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    entries => setIsVisible(entries[0].isIntersecting),
    { threshold: 0.1 }
  );
  observer.observe(containerRef.current);
  return () => observer.disconnect();
}, []);

useEffect(() => {
  if (!isVisible) return;
  // Initialize WebGL only when visible
}, [isVisible, ...]);
```

**Benefits:**
- WebGL context only created when component is 10% visible
- Saves GPU resources on pages with multiple effects
- Prevents unnecessary rendering



### Device Pixel Ratio Limiting

**Contract:**
```javascript
const renderer = new Renderer({
  dpr: Math.min(window.devicePixelRatio, 2)
});
```

**Why**: 
- High DPI displays (3x, 4x) can cause performance issues
- Limiting to 2x provides good quality/performance balance
- User won't notice difference above 2x for this type of content

### ResizeObserver Instead of Window Resize

**Contract:**
```javascript
const resizeObserver = new ResizeObserver(() => updatePlacement());
resizeObserver.observe(containerRef.current);
```

**Benefits:**
- Only fires when container size changes (not entire window)
- More efficient than window resize listener
- Handles container-queries-like behavior

### AnimationFrame Cleanup

**Contract:**
```javascript
useEffect(() => {
  const loop = (t) => {
    // Animation logic
    rafRef.current = requestAnimationFrame(loop);
  };
  rafRef.current = requestAnimationFrame(loop);
  
  return () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
  };
}, [dependencies]);
```

**Why**: Prevents memory leaks from orphaned animation loops

---

## 15. DATA FLOW DIAGRAMS

### Contact Form Flow

```
User Input (ContactSidebar)
  ↓
handleChange() → formData state
  ↓
handleSubmit()
  ↓
FormData construction with Web3Forms key
  ↓
fetch("https://api.web3forms.com/submit")
  ↓
Response parsing
  ↓
Success: Show message, clear form
Error: Show error message
```



### Recruitment Form Flow

```
User visits /recruitment
  ↓
useEffect checks isRecruiting
  ↓ false                    ↓ true
Alert + Navigate(/about)    Render form
                              ↓
                         User fills fields
                              ↓
                         Selects department
                              ↓
                    Domain questions appear (Framer Motion)
                              ↓
                         User submits
                              ↓
                         validateForm()
                              ↓
        Errors found                    No errors
          ↓                                ↓
    Show first error              handleSubmit()
    Scroll to field              (Demo: console.log)
    Auto-clear after 3s          (Production: API call)
```

### Navigation State Flow

```
User clicks Navbar link
  ↓
React Router navigates
  ↓
ScrollToTop component detects pathname change
  ↓
window.scrollTo(0, 0)
  ↓
AnimatePresence triggers page exit animation
  ↓
New page enters with animation
```

### WebGL Effect Flow

```
Component mounts
  ↓
useEffect initializes renderer
  ↓
Creates scene, camera, mesh
  ↓
Starts animation loop
  ↓
Each frame:
  - Update time uniform
  - Update mouse position (smoothed)
  - Render scene
  - Request next frame
  ↓
Component unmounts
  ↓
Cleanup:
  - Cancel animation frame
  - Dispose geometry/material
  - Dispose renderer
  - Remove canvas from DOM
```

---

## 16. ERROR HANDLING PATTERNS

### Try-Catch in Async Operations

**Contact Form:**
```javascript
try {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formPayload
  });
  const data = await response.json();
  
  if (data.success) {
    setResult({ success: true, message: "Message sent successfully!" });
  } else {
    setResult({ success: false, message: data.message || "Something went wrong." });
  }
} catch (error) {
  setResult({ success: false, message: "Failed to send message. Please try again." });
} finally {
  setIsSubmitting(false);
}
```



**Why**: 
- Catches network failures
- Provides user-friendly error messages
- Ensures loading state is reset (finally block)

### Safe Property Access

**Pattern:**
```javascript
const element = document.getElementsByName(firstErrorField)[0];
if (element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  element.focus({ preventScroll: true });
}
```

**Why**: Prevents errors if element doesn't exist

### WebGL Rendering Error Handling

**Pattern:**
```javascript
const loop = t => {
  if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
    return; // Exit if dependencies missing
  }
  
  try {
    renderer.render({ scene: mesh });
    animationIdRef.current = requestAnimationFrame(loop);
  } catch (error) {
    console.warn('WebGL rendering error:', error);
    return; // Stop animation loop
  }
};
```

**Why**:
- Prevents errors from propagating
- Gracefully stops animation on WebGL errors
- Logs error for debugging

---

## 17. ACCESSIBILITY PATTERNS

### Semantic HTML

**Examples:**
- `<nav>` for navigation
- `<main>` for main content
- `<footer>` for footer
- `<button>` for clickable actions (not `<div>`)
- `<a>` for links

### Form Labels

**Pattern:**
```javascript
<label htmlFor="name" className="...">Name</label>
<input
  type="text"
  id="name"
  name="name"
  className="..."
/>
```

**Why**: Screen readers can associate label with input



### Focus Management

**Pattern:**
```javascript
element.focus({ preventScroll: true });
```

**Why**: 
- Moves keyboard focus to error field
- `preventScroll: true` prevents double-scroll (already using scrollIntoView)

### ARIA Attributes

**Current State**: Minimal ARIA (rely on semantic HTML)

**Improvement Opportunities:**
- `aria-label` for icon-only buttons
- `aria-expanded` for dropdown states
- `aria-live` for dynamic content updates
- `aria-invalid` for form errors

### Keyboard Navigation

**Supported:**
- Tab navigation through links and buttons
- Enter/Space to activate buttons
- Focus visible styles (browser default + Tailwind)

---

## 18. DEPLOYMENT CONSIDERATIONS

### SPA Routing (public/_redirects)

**File Content:**
```
/* /index.html 200
```

**Contract:**
- Netlify-specific configuration
- Redirects all routes to index.html with 200 status
- Allows React Router to handle routing client-side

**Why**: 
- Prevents 404 errors on page refresh
- Enables deep linking to any route

### Build Output

**Command**: `npm run build`
**Output Directory**: `dist/`
**Contents**:
- index.html (entry point)
- assets/ (bundled JS, CSS with hashed filenames)
- Logo images

**Why Hashed Filenames**: Cache busting for updated assets



### Environment-Specific Builds

**No Environment Variables Currently Used**

**If Adding Env Vars:**
1. Create `.env` file
2. Prefix with `VITE_` (e.g., `VITE_API_URL`)
3. Access via `import.meta.env.VITE_API_URL`
4. Add to `.gitignore`
5. Configure in Netlify dashboard for production

---

## 19. FUTURE EXTENSION POINTS

### Adding New Pages

**Steps:**
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add link in `src/components/Navbar.jsx` and `src/components/Footer.jsx`
4. Follow existing animation patterns (Framer Motion)
5. Update this document (BEHAVIOUR_CONTRACTS.md)

### Adding New Recruitment Questions

**Steps:**
1. Open `src/config/recruitment.config.js`
2. Add to `generalQuestions` (all departments) or `domainQuestions.{department}`
3. Define question object:
   ```javascript
   {
     id: 'unique_id',
     label: 'Question text?',
     type: 'text' | 'textarea' | 'url',
     required: true | false,
     placeholder: 'Placeholder text',
     validation: {
       pattern: "regex",
       message: "Error message"
     }
   }
   ```
4. No code changes needed in RecruitmentPage.jsx (config-driven)

### Adding New WebGL Effects

**Steps:**
1. Create component in `src/components/ui/`
2. Follow existing patterns (OGL or Three.js)
3. Implement IntersectionObserver for performance
4. Limit device pixel ratio to 2x
5. Provide configurable props for customization
6. Clean up resources in useEffect return
7. Document shader algorithm in this file



### Adding New Departments

**Steps:**
1. Open `src/config/recruitment.config.js`
2. Add to `departments` array:
   ```javascript
   { id: 'new_dept_id', name: 'Display Name' }
   ```
3. Add to `domainQuestions` object:
   ```javascript
   new_dept_id: [
     { /* question objects */ }
   ]
   ```
4. Dropdown will automatically include new option

---

## 20. COMMON DEBUGGING SCENARIOS

### Scenario: Page Transition Animations Not Working

**Check:**
1. Is component wrapped in `<motion.div>`?
2. Are `initial`, `animate`, `exit` props defined?
3. Is component inside `<AnimatePresence mode='wait'>`?
4. Is `mode='wait'` present (prevents overlap)?

### Scenario: Form Validation Not Triggering

**Check:**
1. Is field name matching validation key?
2. Is `validateForm()` being called in `handleSubmit()`?
3. Are error messages being set in state?
4. Is error display conditional (`{errors.fieldName && ...}`) present?

### Scenario: WebGL Effect Not Rendering

**Check:**
1. Is IntersectionObserver detecting visibility? (console.log isVisible)
2. Are uniforms being updated? (check uniformsRef.current)
3. Is animation loop running? (check rafRef.current !== null)
4. Browser console for WebGL errors
5. Is cleanup running on unmount? (could be causing conflicts)

### Scenario: Recruitment Page Redirecting Immediately

**Check:**
1. `recruitment.config.js` → `isRecruiting` should be `true`
2. Check useEffect dependency array in RecruitmentPage
3. Verify navigate is not being called multiple times



### Scenario: Mobile Menu Not Closing After Click

**Check:**
1. NavLink onClick calling `setIsOpen(false)`?
2. Mobile menu wrapper listening to link clicks?
3. Is state update causing re-render?

### Scenario: Scroll-to-Top Not Working

**Check:**
1. Is `ScrollToTop` component rendered in App.jsx?
2. Is it inside `<Router>` but before `<Routes>`?
3. Is `useLocation()` hook working? (requires Router context)

---

## 21. CODE STYLE CONVENTIONS

### Naming Conventions

**Components**: PascalCase (e.g., `ColorBends`, `TeamMemberCard`)
**Functions**: camelCase (e.g., `handleSubmit`, `validateForm`)
**Constants**: camelCase for most, UPPER_SNAKE_CASE for true constants
**CSS Classes**: kebab-case (from Tailwind)
**File Names**: PascalCase for components, camelCase for utilities

### Component Structure Order

1. Imports
2. Constants/Static Data (if any)
3. Component Function Declaration
4. State Declarations
5. Refs (if any)
6. useEffect Hooks
7. Event Handlers
8. Helper Functions
9. JSX Return
10. Export Default

### Import Order

1. React imports
2. Third-party libraries (react-router-dom, framer-motion, etc.)
3. Local components
4. Local utilities/config
5. Styles (CSS imports)

**Example:**
```javascript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github } from 'lucide-react';
import Navbar from './components/Navbar';
import { recruitmentConfig } from './config/recruitment.config';
import './App.css';
```



### Tailwind Class Ordering (Recommended)

1. Layout (display, position, flex, grid)
2. Sizing (w-, h-, max-, min-)
3. Spacing (p-, m-, gap-)
4. Typography (text-, font-)
5. Colors (bg-, text-, border-)
6. Effects (shadow, opacity, blur)
7. Transitions/Animations
8. Responsive modifiers (md:, lg:)
9. State modifiers (hover:, focus:, group-hover:)

**Example:**
```javascript
className="flex items-center gap-4 px-6 py-3 text-sm font-bold bg-white text-black hover:bg-gray-200 transition-colors"
```

---

## 22. TESTING CONSIDERATIONS

### Current Testing State

**No Automated Tests Currently Implemented**

### Recommended Testing Strategy

**Unit Tests (Component Level):**
- Form validation logic (`validateForm()` in RecruitmentPage)
- Utility functions (if extracted)
- Helper functions like `getAnchorAndDir()` in LightRays

**Integration Tests:**
- Form submission flow (ContactSidebar, RecruitmentPage)
- Navigation and routing
- Conditional rendering (recruitment check)

**Visual Regression Tests:**
- Page layouts at different breakpoints
- WebGL effects rendering
- Animation keyframes

**Manual Testing Checklist:**
- [ ] All routes accessible
- [ ] Forms submit successfully
- [ ] Mobile menu works
- [ ] WebGL effects render on all pages
- [ ] Scroll-to-top works on navigation
- [ ] Contact sidebar opens/closes
- [ ] Recruitment redirect when closed
- [ ] Form validation shows errors
- [ ] Responsive design at all breakpoints



---

## 23. DEPENDENCY ANALYSIS

### Critical Dependencies

**React Ecosystem:**
- `react` + `react-dom`: Core framework
- `react-router-dom`: Client-side routing (critical for SPA functionality)

**If These Break:** Application will not function

**Styling:**
- `tailwindcss` + `@tailwindcss/postcss`: Utility-first CSS
- `postcss` + `autoprefixer`: CSS processing

**If These Break:** Styles will not apply, site will be unstyled

**Animation:**
- `framer-motion`: Page transitions and component animations

**If This Breaks:** Animations will fail but site remains functional

**Visual Effects:**
- `ogl`: LightRays WebGL rendering
- `three`: ColorBends WebGL rendering

**If These Break:** Background effects won't render but site remains functional

**Icons:**
- `lucide-react`: Icon components

**If This Breaks:** Icons missing but site functional

### Non-Critical Dependencies

**Development Only:**
- `vite`: Build tool (not in production bundle)
- `eslint`: Code quality (not in production bundle)
- All `@types/*` packages

**External Services:**
- Web3Forms API (contact form)
- Google Fonts (Inter font family)

**If These Break:** Fallback mechanisms (system fonts) or graceful degradation (form shows error)

---

## 24. SECURITY CONSIDERATIONS

### XSS Prevention

**React's Built-in Protection:**
- All user input rendered via JSX is escaped by default
- `dangerouslySetInnerHTML` not used anywhere



### Form Security

**Honeypot Field (ContactSidebar):**
```javascript
<input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
```
- Hidden from users
- Bots often fill all fields
- Web3Forms rejects if filled

**Client-Side Validation:**
- Input sanitization via regex patterns
- Type checking (email format, URL format)
- **Note**: Client-side only, not security boundary (server should also validate)

### External Resources

**Web3Forms API:**
- HTTPS only
- Access key exposed in client code (acceptable for this service)
- No sensitive data stored client-side

**Google Fonts:**
- Loaded from `fonts.googleapis.com` (Google CDN)
- Font files from `fonts.gstatic.com`
- Trusted source

**Grainy Gradient Texture:**
- Loaded from `grainy-gradients.vercel.app`
- Static SVG file (no executable code)

### No Sensitive Data Storage

- No localStorage/sessionStorage usage
- No cookies set
- No authentication/authorization
- No user data persistence

---

## 25. BROWSER COMPATIBILITY

### Supported Browsers

**Modern Browsers (Full Support):**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Features Requiring Modern Browsers:**
- CSS Grid (layout)
- Flexbox (layout)
- CSS Custom Properties (Tailwind)
- ES6+ JavaScript (arrow functions, destructuring, etc.)
- WebGL 1.0 (visual effects)
- IntersectionObserver (performance optimization)
- ResizeObserver (responsive WebGL)



### Fallback Behavior

**WebGL Not Supported:**
- Effects simply don't render
- Background remains black
- Site fully functional

**JavaScript Disabled:**
- Site will not function (SPA requires JS)
- Could add `<noscript>` message

---

## 26. SUMMARY: KEY TAKEAWAYS FOR DEVELOPERS

### When Reading This Document

1. **Understanding a Function**: Search for function name → Read Contract → Check dependencies
2. **Modifying a Feature**: Find component → Read state contracts → Check side effects → Update contract
3. **Debugging**: Check common scenarios (Section 20) → Verify contracts → Check data flow
4. **Adding Features**: Find similar existing feature → Copy patterns → Update contracts

### Golden Rules

1. **Every function has a purpose** - documented in its contract
2. **Every state variable has a reason** - documented in state management
3. **Every prop has a type and usage** - documented in component contract
4. **Every animation has a pattern** - documented in animation contracts
5. **Every regex has a purpose** - documented in validation patterns

### Contract Template for New Functions

```
#### Function: functionName(param1, param2)

**Contract:**
- **Input**: 
  - param1 (type): Description
  - param2 (type): Description
- **Process**: Step-by-step what happens
- **Output**: What is returned
- **Side Effects**: DOM changes, API calls, state updates, etc.
- **Why**: Why this function exists

**Used By**: Components that call this function
**Dependencies**: Functions/components this depends on
```

---

## 27. CONTINUOUS INTEGRATION WORKFLOW

### File: `.github/workflows/ci.yml`

**Contract:**
- **Trigger**: Runs automatically on all `push` events across any branch and all `pull_request` events.
- **Process**:
  1. Checks out repository source code via `actions/checkout@v4`.
  2. Sets up Node.js v20 with npm caching via `actions/setup-node@v4`.
  3. Installs clean dependencies via `npm ci`.
  4. Runs code linting via `npm run lint`.
  5. Runs unit test suite via `npm run test`.
  6. Builds production bundle via `npm run build`.
- **Output**: CI job pass/fail status reported to GitHub commits and PR status checks.

---

## DOCUMENT MAINTENANCE

**Last Updated**: Initial comprehensive documentation
**Version**: 1.0.0
**Next Review**: After any significant codebase changes



**Update Triggers:**
- New component added
- New function created
- State management pattern changed
- New dependency added
- Breaking change in existing contract
- Bug fix that changes behavior
- Performance optimization added
- New animation pattern introduced

**How to Update:**
1. Identify affected section
2. Update contract with new information
3. Add to changelog below
4. Update AGENTS.md if workflow changes

---

## CHANGELOG

### v1.0.0 - Initial Documentation
- Complete technical documentation of all components
- All function contracts documented
- State management patterns documented
- WebGL shader algorithms documented
- Form validation patterns documented
- Animation contracts documented
- Responsive design patterns documented
- Performance optimization patterns documented

---

**END OF BEHAVIOUR_CONTRACTS.MD**

This document is the technical brain of the ZBC website codebase. Every function, component, pattern, and decision is documented here. When in doubt, reference this document. When making changes, update this document.

---

**For AI Agents:** You have now read the complete technical specification. You understand how every piece of code works. Before modifying any code, re-read the relevant contract. After modifying code, update the contract immediately.

**For Human Developers:** This document is your reference guide. Use it to understand existing code before modifying it. Keep it updated as the single source of truth for technical behavior.

**For Future Contributors:** Start here. This document will teach you the entire codebase architecture, patterns, and conventions. Read it thoroughly before writing code.
