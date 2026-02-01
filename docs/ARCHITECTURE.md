# Architecture - System Design Overview

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with analytics
│   ├── page.tsx            # Portfolio home
│   └── project/[id]/
│       ├── page.tsx        # Project detail (dynamic route)
│       ├── error.tsx       # Error boundary
│       └── not-found.tsx   # 404 page
├── components/             # Reusable React components
├── helpers/                # Utility functions and business logic
├── icons/                  # SVG icon components
├── styles/                 # CSS & theme
└── ui/                     # Page-level UI components

public/
└── projects/               # Markdown project files
    └── [project-id]/
        └── index.md        # Project content + frontmatter
```

## Data Flow

### Project Loading Pipeline

```
User visits /project/[id]
    ↓
generateStaticParams()
    ├─ Reads public/projects/*/index.md
    ├─ Parses YAML frontmatter
    ├─ Validates with typeDefinitions
    └─ Returns published projects
    ↓
Page Component
    ├─ Calls getProject(id)
    │   ├─ Reads markdown file
    │   ├─ Parses with gray-matter
    │   ├─ Validates content
    │   └─ Returns ParsedProject
    ├─ Renders content
    └─ Shows draft banner if needed
```

## Core Modules

### 1. **typeDefinitions.ts**

Defines all TypeScript interfaces and validation.

**Key Exports**:

- `interface Project` - Core project metadata
- `interface ParsedProject` - Project with content
- `validateProjectMetadata()` - Type guard function
- `ProjectValidationError` - Custom error class

**Responsibilities**:

- Type safety across entire system
- Validation logic for frontmatter
- Error reporting with file context

### 2. **getProjects.ts**

Reads, parses, caches, and filters project files.

**Key Exports**:

- `getAllProjects()` - Returns all/published projects
- `getProject(id)` - Returns single project with siblings
- `getProjectIfPublished(id)` - Strict version (no drafts in prod)

**Features**:

- File-based caching for performance
- Environment-aware filtering
- Automatic path transformation
- Sibling navigation (prev/next)
- Error recovery

### 3. **draftAccess.ts**

Utilities for draft visibility control.

**Key Exports**:

- `isDraft(published?)` - Check if project is draft
- `isDevelopment()` - Check NODE_ENV
- `canAccessProject()` - Verify access rights
- `shouldGenerateProject()` - Static generation filter

**Responsibilities**:

- Central draft logic
- Environment detection
- Access control

### 4. **projectTemplates.ts**

Generate and validate new projects.

**Key Exports**:

- `generateProjectTemplate()` - Full markdown template
- `generateProjectFrontmatter()` - YAML frontmatter only
- `validateProjectConfig()` - Config validation

**Features**:

- Predefined tags and colors
- Template consistency
- Config validation

### 5. **markdownProcessor.ts**

Process and validate markdown content.

**Key Exports**:

- `MarkdownProcessor.processContent()` - Transform paths
- `MarkdownProcessor.validateContent()` - Validate syntax
- `MarkdownProcessor.extractSummary()` - First paragraph
- `validateProjectContent()` - Full validation

**Responsibilities**:

- Image/link path transformation
- Content validation
- Metadata extraction

### 6. **projectAuthor.ts**

CLI utilities for portfolio management.

**Key Exports**:

- `createNewProject()` - Create project with template
- `validateAllProjects()` - Scan all projects
- `generateValidationReport()` - Report generator

**Used For**:

- Creating new projects via script
- Validating entire portfolio
- Generating health reports

## Component Hierarchy

```
Layout (Root)
├── Analytics Client
└── Page Components
    ├── ProjectsClient
    │   ├── Filters
    │   ├── Projects Grid
    │   │   └── Button (Project Card)
    │   └── Tag
    ├── Header
    ├── Footer
    └── Project Detail
        ├── Section
        ├── Markdown (gray-matter content)
        ├── Siblings Navigation
        │   └── Button (Next/Prev)
        └── ScrollToTopButton
```

## Rendering Strategy

### Static Generation (SSG)

```
Build Time
├─ generateStaticParams() → List of [id] values
├─ Build project pages for each [id]
├─ Optimize images
└─ Generate sitemap
```

**Benefit**: Fast page loads, no server processing needed

### Dynamic Data

```
Middleware
├─ Detect environment (dev vs prod)
├─ Filter projects (all vs published)
└─ Apply access controls
```

**Benefit**: Same code runs everywhere, behavior changes per environment

## Type Safety

### Project Validation Flow

```
Raw YAML
    ↓
gray-matter parsing
    ↓
ParsedFrontmatter (any type)
    ↓
Type Guard: validateProjectMetadata()
    ↓
Project (validated type)
    ├─ Required: id, title, short_description, tags, date, order
    ├─ Optional: accent, published, content
    └─ Invalid: ProjectValidationError thrown
```

## Caching Strategy

### Cache Invalidation

```javascript
// In development
isCached = false; // Always fresh

// In production
isCached = true; // Cached at build time
```

**Rationale**: Dev needs instant updates, prod is static

## Error Handling

### Not Found (404)

```
getProject('invalid-id')
    ↓
File doesn't exist
    ↓
FileNotFoundError thrown
    ↓
Page calls notFound()
    ↓
not-found.tsx renders
```

### Invalid Frontmatter

```
gray-matter parsing succeeds
    ↓
validateProjectMetadata() fails
    ↓
ProjectValidationError thrown
    ↓
error.tsx catches
    ↓
User sees error page
```

### Runtime Errors

```
Page component error
    ↓
error.tsx catches
    ↓
Shows error message
    ↓
User can retry or navigate
```

## Draft Feature Architecture

### Visibility Matrix

|               | Development | Production Build | Production Served |
| ------------- | ----------- | ---------------- | ----------------- |
| **Published** | ✅ Visible  | ✅ Static page   | ✅ Visible        |
| **Draft**     | ✅ Visible  | ✅ Static page   | ❌ Not served     |

### Implementation

```typescript
// At build time
if (isDraft(project)) {
  // Still generate page for dev
  generateStaticParams(); // includes
}

// At runtime
if (isDraft(project) && isProduction) {
  // Block access in prod
  return notFound();
}
```

## Performance Considerations

1. **File I/O**: Minimized through caching
2. **Build Time**: Static generation during build
3. **Runtime**: Zero processing, serve pre-built pages
4. **Markdown**: Parsed once per build

**Result**: Pages serve instantly, no server-side processing

---

**Key Principles**:

- Type-first design for safety
- Environment-aware behavior
- Performance through static generation
- Clear separation of concerns
- Centralized validation logic
