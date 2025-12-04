# Quick Start

A high-level overview of the coding conventions, naming rules, and structural principles used in the project.

# 1. Conventions Overview

### General Principles

-   The project tries to use minimum of external libraries

-   The code should be sometimes less readable but more optimized

-   At least the client side focused on lowest memory usage instead of speed and difficults

### Modules rules

-   Many of nested folders with React components or another entity that exports anything must have an index.ts file for exports.

-   There must not be imports like

```typescript
import someThing from './component/Counter/Counter.tsx';
```

There must be

```typescript
import someThing from './component/Counter';
```

---

# 2. Client Code (Next.js)

### Naming Rules

-   Although React Compiler used in the project, some code parts use manual memoization. It doesn't matter.
-   The `Root` suffix in a react component name means that this component used in any layout, often in root layout.tsx (that is in root of `app` folder). For example, `ModalRoot.tsx`, `ThemeRoot.tsx`.
-   Only CSS modules for styles. Sometimes, public classes for element with `public` suffix, for example:

```tsx
<div className={`${componentStyles['my-div']} my-div-public`}>Text</div>
```

-   If a component folder has more than **two** components inside, the nested components must be in a `components` folder.

-   Component folder example:

```bash
/MyComponent
├─ components/
│  ├─ NestedComponent1/ # And there again the component structure
│  └─ NestedComponent2/ # And there again the component structure
├─ MyComponent.tsx
├─ MyComponent.module.scss
└─ index.ts # Must have
```
