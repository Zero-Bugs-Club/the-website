# AGENTS.md - AI Instructions Bible

## CRITICAL: READ THIS FIRST - MANDATORY PROTOCOL

This document is the **ABSOLUTE FIRST FILE** that must be read before any AI agent begins ANY task in this repository. No exceptions.

---

## 🔴 PRIMARY DIRECTIVE

### Before ANY Action:
1. **READ THIS FILE COMPLETELY** from start to finish
2. **READ `BEHAVIOUR_CONTRACTS.md`** - The complete technical brain of the codebase
3. **READ `CONTRIBUTION.md`** - Understanding project structure and contribution rules
4. **READ `README.md`** - High-level project overview

### After ANY Codebase Change:
1. **UPDATE `BEHAVIOUR_CONTRACTS.md`** with new/modified functions and their purposes
2. **UPDATE `CONTRIBUTION.md`** if new dependencies, scripts, or architectural changes are made
3. **UPDATE `README.md`** if project description or features change
4. **UPDATE THIS FILE (`AGENTS.md`)** if workflow or AI instructions need modification

---

## 📋 AGENT WORKFLOW PROTOCOL

### Phase 1: Understanding (MANDATORY)
```
1. Read AGENTS.md (this file) ✓
2. Read BEHAVIOUR_CONTRACTS.md ✓
3. Read CONTRIBUTION.md ✓
4. Read README.md ✓
5. Understand the requested task
6. Identify affected files from BEHAVIOUR_CONTRACTS.md
```

### Phase 2: Planning
```
1. List all files that will be modified
2. Identify all functions/components affected
3. Check existing contracts in BEHAVIOUR_CONTRACTS.md
4. Plan the implementation approach
5. Identify potential side effects
```

### Phase 3: Execution
```
1. Implement changes
2. Follow existing code patterns from BEHAVIOUR_CONTRACTS.md
3. Maintain consistency with existing architecture
4. Test changes (if applicable)
```

### Phase 4: Documentation (MANDATORY)
```
1. Update BEHAVIOUR_CONTRACTS.md with:
   - New functions and their complete behavioral contracts
   - Modified functions with updated contracts
   - New components with their purpose and state management

2. Update CONTRIBUTION.md if:
   - New npm packages added
   - New scripts added to package.json
   - Build process changed
   - Environment variables introduced
   - Deployment process modified

3. Update README.md if:
   - New features added
   - Project description changed
   - New sections needed

4. Update AGENTS.md if:
   - New workflow patterns established
   - New agent protocols defined
   - Documentation structure changed
```

---

## 🎯 CORE PRINCIPLES FOR AI AGENTS

### 1. **NEVER Skip Documentation**
Every code change MUST result in documentation updates. No exceptions.

### 2. **BEHAVIOUR_CONTRACTS.md is the Source of Truth**
- Before modifying a function, read its contract
- After modifying a function, update its contract
- When creating a new function, document its contract immediately

### 3. **Maintain Consistency**
- Follow existing naming conventions (see BEHAVIOUR_CONTRACTS.md)
- Follow existing architectural patterns
- Follow existing file organization
- Follow existing styling patterns (Tailwind CSS)

### 4. **Understand Dependencies**
All functions, components, and utilities are interconnected:
- Check BEHAVIOUR_CONTRACTS.md for dependencies
- Understand data flow before making changes
- Consider side effects of modifications

### 5. **Zero Assumptions**
- If a behavior is unclear, refer to BEHAVIOUR_CONTRACTS.md
- If a contract is missing, read the code and create one
- If documentation is outdated, update it immediately

---

## 🔍 SPECIFIC TASK PROTOCOLS

### When Adding a New Component:
1. Read existing similar components from BEHAVIOUR_CONTRACTS.md
2. Follow the same patterns (props, state management, styling)
3. Document in BEHAVIOUR_CONTRACTS.md:
   - Component purpose
   - Props interface
   - State management approach
   - Event handlers
   - Side effects
4. Update file tree in CONTRIBUTION.md if in a new location

### When Modifying State Management:
1. Identify all components using the state (check BEHAVIOUR_CONTRACTS.md)
2. Document state shape and update logic
3. Update all affected component contracts
4. Document state flow in BEHAVIOUR_CONTRACTS.md

### When Adding Dependencies:
1. Update `package.json`
2. Document purpose in CONTRIBUTION.md
3. Document usage patterns in BEHAVIOUR_CONTRACTS.md if creating utilities
4. Update README.md if it affects user setup

### When Fixing Bugs:
1. Identify the function from BEHAVIOUR_CONTRACTS.md
2. Understand its contract and expected behavior
3. Fix the bug
4. Update the contract if the behavior changes
5. Document the fix context in git commit

### When Refactoring:
1. Identify all affected contracts in BEHAVIOUR_CONTRACTS.md
2. Plan refactoring to maintain existing contracts
3. Update all contracts that change
4. Ensure no breaking changes unless explicitly required

---

## 📦 PROJECT-SPECIFIC CONTEXT

### This is a React + Vite SPA for Zero Bugs Club (ZBC)

**Key Architectural Decisions:**
- **Framework**: React 19.2.0 with React Router for routing
- **Styling**: Tailwind CSS (utility-first, dark theme)
- **Animations**: Framer Motion for page transitions and component animations
- **Visual Effects**: Custom WebGL shaders (OGL library) for ColorBends and LightRays
- **Forms**: Web3Forms for serverless contact form submission
- **State**: React useState/useEffect (no external state management)
- **Icons**: Lucide React

**Critical Files** (Priority reading in BEHAVIOUR_CONTRACTS.md):
1. `src/App.jsx` - Router configuration and global state
2. `src/pages/RecruitmentPage.jsx` - Complex form validation
3. `src/config/recruitment.config.js` - Feature flag for recruitment
4. `src/components/ui/*` - WebGL visual effects

**Development Patterns:**
- **Component Structure**: Functional components with hooks
- **Styling Pattern**: Tailwind utility classes, dark theme (`bg-black`, `text-white`)
- **Animation Pattern**: Framer Motion with `initial`, `animate`, `exit` props
- **Routing Pattern**: React Router with scroll-to-top on navigation
- **Form Validation**: Custom validation with inline error display

---

## 🚨 CRITICAL WARNINGS

### DO NOT:
1. ❌ Modify code without updating BEHAVIOUR_CONTRACTS.md
2. ❌ Add dependencies without documenting in CONTRIBUTION.md
3. ❌ Change architectural patterns without team discussion
4. ❌ Remove or rename files without updating all documentation
5. ❌ Assume behavior - always verify from BEHAVIOUR_CONTRACTS.md
6. ❌ Use external state management (Redux, Zustand) without explicit approval
7. ❌ Change the Tailwind dark theme aesthetic
8. ❌ Break the WebGL effects (ColorBends, LightRays, Spotlight)

### ALWAYS:
1. ✅ Read BEHAVIOUR_CONTRACTS.md before modifying functions
2. ✅ Update documentation after EVERY change
3. ✅ Test visual effects after modifying UI components
4. ✅ Maintain consistent code patterns
5. ✅ Document complex logic immediately
6. ✅ Update contracts when behavior changes
7. ✅ Verify form validation after modifying RecruitmentPage
8. ✅ Maintain accessibility standards

---

## 🔄 DOCUMENTATION UPDATE CHECKLIST

After completing ANY task, ensure:

### BEHAVIOUR_CONTRACTS.md
- [ ] All new functions documented with complete contracts
- [ ] Modified functions have updated contracts
- [ ] Component purposes clearly stated
- [ ] State management patterns documented
- [ ] Event handlers documented
- [ ] Side effects documented
- [ ] Dependencies between functions documented

### CONTRIBUTION.md
- [ ] New dependencies listed with versions and purposes
- [ ] New scripts documented
- [ ] Setup instructions updated if changed
- [ ] Build process documented if modified
- [ ] Deployment steps updated if changed
- [ ] Environment variables documented if added
- [ ] File structure updated if new directories added

### README.md
- [ ] Project description accurate
- [ ] Features list updated
- [ ] Quick start guide accurate
- [ ] Live demo link working
- [ ] Technology stack current
- [ ] Maintenance mode instructions accurate (if applicable)

### AGENTS.md (This File)
- [ ] Workflow protocols updated if new patterns established
- [ ] Critical warnings updated if new constraints added
- [ ] Task protocols updated if new procedures defined
- [ ] Project-specific context updated if architecture changes

---

## 🎓 LEARNING FROM THE CODEBASE

As you work on this project, you will learn:

1. **From BEHAVIOUR_CONTRACTS.md**: How each function works, what it expects, what it returns, and why it exists
2. **From CONTRIBUTION.md**: How to set up, run, build, and deploy the project
3. **From README.md**: What the project does and who it's for
4. **From this file**: How to approach tasks systematically

The four documentation files work together:
- **AGENTS.md** (this file) → HOW to work as an AI agent
- **BEHAVIOUR_CONTRACTS.md** → WHAT each function does technically
- **CONTRIBUTION.md** → HOW to contribute (setup, run, deploy, rules)
- **README.md** → WHAT the project is (overview, purpose, quick reference)

---

## 🤖 FINAL REMINDER FOR AI AGENTS

You are not just writing code. You are maintaining a living system with:
- Complete technical documentation (BEHAVIOUR_CONTRACTS.md)
- Complete contribution guidelines (CONTRIBUTION.md)  
- Complete user-facing documentation (README.md)
- Complete AI protocols (AGENTS.md)

Every line of code you write must be reflected in the documentation. Every function you create must have a behavioral contract. Every change you make must be traceable through the documentation.

**This is not optional. This is the core requirement of working on this codebase.**

---

## ✅ VERIFICATION PROTOCOL

Before marking a task as complete:

1. **Code Quality Check**
   - [ ] Code follows existing patterns from BEHAVIOUR_CONTRACTS.md
   - [ ] No console errors or warnings
   - [ ] Responsive design maintained
   - [ ] Accessibility maintained
   - [ ] Dark theme aesthetic preserved

2. **Documentation Check**
   - [ ] BEHAVIOUR_CONTRACTS.md updated
   - [ ] CONTRIBUTION.md updated (if applicable)
   - [ ] README.md updated (if applicable)
   - [ ] AGENTS.md updated (if applicable)

3. **Testing Check**
   - [ ] Visual inspection completed
   - [ ] Forms validated (if modified)
   - [ ] Routing tested (if modified)
   - [ ] WebGL effects working (if modified)
   - [ ] Mobile responsiveness verified

4. **Git Commit Check**
   - [ ] Commit message describes change
   - [ ] Commit message references documentation updates
   - [ ] All modified files staged

---

**Last Updated**: Initial creation  
**Maintained By**: AI Agents working on this repository  
**Authority Level**: HIGHEST - This file governs all AI operations

---

END OF AGENTS.MD
