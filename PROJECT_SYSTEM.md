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
---
```

### Frontmatter Validation Rules

| Field         | Type   | Required | Rules                                 |
| ------------- | ------ | -------- | ------------------------------------- |
| `id`          | string | ✓        | Lowercase, alphanumeric, hyphens only |
| `name`        | string | ✓        | Non-empty                             |
| `image`       | string | ✗        | Relative path starting with `./`      |
| `description` | string | ✗        | Any text                              |
| `accent`      | string | ✗        | Valid hex color (#RRGGBB)             |
| `order`       | number | ✗        | Integer (higher = featured first)     |
| `tags`        | array  | ✗        | Array of strings                      |

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
};

// Validate
const validation = validateProjectConfig(config);
if (!validation.valid) {
  console.error(validation.errors);
}

// Generate template
const template = generateProjectTemplate(config);
console.log(template);
```

### Manual Setup

1. Create directory: `public/projects/my-project/`
2. Create `index.md` with required frontmatter
3. Add `project.jpg` (or referenced image)
4. Write markdown content

### Recommended Project Tags

Use these tags for consistency:

- `design`, `ux`, `ui`
- `mobile`, `desktop`, `web`
- `sketch`, `figma`
- `prototyping`, `case-study`
- `research`, `branding`

## Processing & Path Handling

### Image Paths

Images in markdown should use relative paths:

```markdown
![Description](./image.jpg)
```

This is automatically transformed to:

```markdown
![Description](/projects/my-project/image.jpg)
```

### Link Paths

Relative links are also transformed:

```markdown
[Link](./document.pdf) → [Link](/projects/my-project/document.pdf)
```

## Validation

### Individual Project Validation

```typescript
import {
  validateProjectContent,
  MarkdownProcessor,
} from "@/helpers/markdownProcessor";

const validation = validateProjectContent(project, content);
if (!validation.valid) {
  console.error("Errors:", validation.errors);
}
console.warn("Warnings:", validation.warnings);
```

### Portfolio-Wide Validation

```typescript
import { generateValidationReport } from "@/helpers/projectAuthor";

const report = generateValidationReport(
  "./public/projects",
  "./validation-report.md",
);
console.log(report);
```

## Using Projects in Components

### Get All Projects

```typescript
import { getAllProjects } from "@/helpers/getProjects";

const projects = getAllProjects(); // Already sorted by order
```

### Get Single Project

```typescript
import { getProject } from "@/helpers/getProjects";

const project = getProject("my-project"); // Includes content and siblings
console.log(project.content); // Markdown HTML
console.log(project.next); // Next project in list
console.log(project.prev); // Previous project in list
```

## Metadata & Content Extraction

### Extract Summary

```typescript
import { MarkdownProcessor } from "@/helpers/markdownProcessor";

const summary = MarkdownProcessor.extractSummary(content, 150);
```

### Extract Headings

```typescript
const headings = MarkdownProcessor.extractHeadings(content);
// Returns: [{ level: 1, text: "Project Name" }, ...]
```

## Best Practices

1. **Always include an image** - Featured projects should have attractive hero images
2. **Write meaningful descriptions** - Shown on project cards
3. **Use consistent tags** - Makes filtering work better
4. **Include order value** - Controls feature prominence
5. **Set accent color** - Enhances visual brand consistency
6. **Write detailed content** - Rich markdown with sections and subsections
7. **Use relative image paths** - System handles transformation automatically
8. **Validate before publishing** - Run validation report to catch issues

## Caching Behavior

The `getAllProjects()` function caches results. This cache is:

- **Invalidated** when: Project directory changes
- **Cleared** with: `clearProjectsCache()`

For development with hot reload, the cache is managed automatically by Next.js.

## Error Handling Examples

### Handling Missing Project

```typescript
try {
  const project = getProject("non-existent");
} catch (error) {
  console.error("Project not found", error.message);
}
```

### Handling Validation Errors

```typescript
import type { ProjectValidationError } from "@/helpers/typeDefinitions";

try {
  getAllProjects();
} catch (error) {
  if (error instanceof ProjectValidationError) {
    console.error(`Invalid project at ${error.projectPath}`);
  }
}
```

## Adding New Features

To extend the system:

1. **New frontmatter fields**: Update `ProjectMetadata` interface and validation
2. **New markdown features**: Add to `MarkdownProcessor` class
3. **New tags**: Add to `COMMON_PROJECT_TAGS` in `projectTemplates.ts`
4. **New validation rules**: Update `validateProjectConfig()` function

## Troubleshooting

### Images Not Loading

- Check image path starts with `./`
- Ensure image exists in project directory
- Verify path in frontmatter matches actual filename

### Validation Fails

- Run validation report: `generateValidationReport()`
- Check required fields: `id` and `name`
- Verify YAML syntax in frontmatter
- Ensure hex colors are valid format

### Projects Not Showing

- Clear cache: `clearProjectsCache()`
- Check project has `order` value (defaults to 0)
- Verify markdown file is `index.md`
- Check project directory name matches `id` field

## API Reference

### getProjects.ts

```typescript
getAllProjects(): Project[]
getProject(projectId: string): ParsedProject
clearProjectsCache(): void
```

### projectTemplates.ts

```typescript
generateProjectFrontmatter(config: ProjectAuthorConfig): string
generateProjectTemplate(config: ProjectAuthorConfig, includeExamples?: boolean): string
validateProjectConfig(config: Partial<ProjectAuthorConfig>): ValidationResult
```

### markdownProcessor.ts

```typescript
MarkdownProcessor.processContent(content: string, projectDir: string): string
MarkdownProcessor.validateContent(content: string): ValidationResult
MarkdownProcessor.extractSummary(content: string, maxLength?: number): string
MarkdownProcessor.extractHeadings(content: string): Heading[]
```

### projectAuthor.ts

```typescript
createNewProject(id: string, name: string, options?: CreateProjectOptions): Result
validateAllProjects(projectsDir: string): ValidationReport
generateValidationReport(projectsDir: string, outputPath?: string): string
```
