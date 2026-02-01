# Project System Documentation

## Overview

The project system has been significantly improved to provide better type safety, validation, caching, and developer experience for managing the portfolio projects.

## Key Improvements

### 1. **Type Safety & Validation**

- Added `validateProjectMetadata()` function to ensure all projects have required fields
- New `ProjectValidationError` class for detailed error reporting
- Type guards to prevent runtime errors
- Clear distinction between raw metadata and processed projects

### 2. **Performance Optimization**

- Introduced caching layer in `getAllProjects()` to prevent redundant file reads
- Cache is invalidated only when necessary
- Export `clearProjectsCache()` for testing scenarios

### 3. **Better Error Handling**

- Graceful error handling with detailed error messages
- Try-catch blocks prevent crashes from malformed project files
- Warning messages in console without breaking the build

### 4. **Enhanced Project Types**

```typescript
// New interfaces
interface ProjectMetadata      // Raw frontmatter data
interface ParsedProject        // Complete project with content
interface ProjectAuthorConfig  // For creating new projects
```

### 5. **Markdown Processing**

- New `MarkdownProcessor` class with:
  - Content validation
  - Image and link path transformation
  - Heading extraction
  - Content summary generation

### 6. **Project Authoring Tools**

- `projectTemplates.ts` - Templates and validation for new projects
- `projectAuthor.ts` - CLI utilities for project management
- Project creation scaffolding
- Portfolio-wide validation reports

## Project File Structure

Each project should have the following structure:

```
public/projects/[project-id]/
├── index.md              # Required: Project markdown with frontmatter
├── [image].jpg          # Recommended: Hero image
└── [other-assets]/      # Optional: Additional images and files
```

## Frontmatter Format

Every `index.md` file must start with YAML frontmatter:

```yaml
---
id: project-id # Required: URL-safe identifier (lowercase, hyphens)
name: Project Name # Required: Human-readable name
image: ./project.jpg # Recommended: Hero image path
description: Short desc # Optional: One-line description
accent: "#FF6B6B" # Optional: Brand color (hex code)
order: 1 # Optional: Display order (descending)
tags: # Optional: Categorization tags
  - design
  - mobile
  - research
published: true # Optional: Publish status (false = draft)
---
```

## Creating a New Project

### Using the Template Generator

```typescript
import {
  generateProjectTemplate,
  validateProjectConfig,
} from "@/helpers/projectTemplates";

const config = {
  id: "my-new-project",
  name: "My New Project",
  description: "Short description",
  tags: ["design", "mobile"],
  accent: "#FF6B6B",
  published: true,
};

// Validate
const validation = validateProjectConfig(config);
if (!validation.valid) {
  console.error(validation.errors);
}

// Generate template
const template = generateProjectTemplate(config);
```

### Manual Setup

1. Create directory: `public/projects/my-project/`
2. Create `index.md` with required frontmatter
3. Add `project.jpg` (or referenced image)
4. Write markdown content

## Using Projects in Components

### Get All Projects

```typescript
import { getAllProjects } from "@/helpers/getProjects";

const projects = getAllProjects(); // Already sorted by order
```

### Get Single Project

```typescript
import { getProject } from "@/helpers/getProjects";

const project = getProject("my-project");
console.log(project.content); // Markdown content
console.log(project.next); // Next project or null
console.log(project.prev); // Previous project or null
```

## Validation

### Portfolio-Wide Validation

```typescript
import { generateValidationReport } from "@/helpers/projectAuthor";

const report = generateValidationReport("./public/projects");
console.log(report);
```

## Best Practices

1. **Always include an image** - Featured projects need attractive hero images
2. **Write meaningful descriptions** - Shown on project cards
3. **Use consistent tags** - Makes filtering work better
4. **Include order value** - Controls display prominence
5. **Set accent color** - Enhances visual consistency
6. **Use relative image paths** - System auto-transforms to absolute paths
7. **Validate before publishing** - Run validation report to catch issues

## Troubleshooting

### Images Not Loading

- Check image path starts with `./`
- Ensure image exists in project directory
- Verify filename in frontmatter matches actual file

### Projects Not Showing

- Check required fields: `id` and `name` are present
- Verify YAML syntax in frontmatter
- For drafts: ensure `published: true` in production

## API Reference

See individual file documentation for detailed API reference.
