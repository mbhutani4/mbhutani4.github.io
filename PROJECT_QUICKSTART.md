# Quick Start: Project System

## Creating a New Project

### Option 1: Using TypeScript Helper

```typescript
import { generateProjectTemplate } from "@/helpers/projectTemplates";

const template = generateProjectTemplate({
  id: "my-awesome-project",
  name: "My Awesome Project",
  description: "A brief description",
  tags: ["design", "mobile"],
  accent: "#FF6B6B",
  order: 5,
});

// Copy this template to public/projects/my-awesome-project/index.md
```

### Option 2: Manual Setup

1. Create: `public/projects/my-project/`
2. Create: `public/projects/my-project/index.md` with frontmatter:

```yaml
---
id: my-project
name: My Project
image: ./project.jpg
description: One-line description
accent: "#FF6B6B"
order: 5
tags:
  - design
  - mobile
---
# My Project

Content goes here...
```

## Markdown Content Structure

### Recommended Sections

- **The Application** - What is this project?
- **My Role** - What did you do?
- **The Challenge** - What was the problem?
- **The Approach** - How did you solve it?
- **Results/Outcomes** - What was the impact?

### Images

```markdown
![Description](./image.jpg) ← Automatically transformed to /projects/id/image.jpg
```

### Links

```markdown
[Text](./file.pdf) ← Automatically transformed
```

## Using Projects in Components

### Get All Projects

```typescript
import { getAllProjects } from "@/helpers/getProjects";

const projects = getAllProjects(); // Cached, sorted by order
```

### Get Single Project

```typescript
import { getProject } from "@/helpers/getProjects";

const project = getProject("my-project");
// project.id, project.name, project.image, project.content
// project.next, project.prev (navigation)
```

### Extract Information

```typescript
import { MarkdownProcessor } from "@/helpers/markdownProcessor";

// Get summary (first paragraph)
const summary = MarkdownProcessor.extractSummary(content, 150);

// Get all headings
const headings = MarkdownProcessor.extractHeadings(content);

// Validate content
const validation = MarkdownProcessor.validateContent(content);
```

## Validation & Checks

### Validate Single Project

```typescript
import { validateProjectContent } from "@/helpers/markdownProcessor";

const validation = validateProjectContent(project, content);
if (!validation.valid) {
  console.error(validation.errors);
}
```

### Validate All Projects

```typescript
import { generateValidationReport } from "@/helpers/projectAuthor";

const report = generateValidationReport("./public/projects");
console.log(report);
```

## Recommended Tags

Use these for consistency:

- **Skills**: `design`, `ux`, `ui`, `branding`, `illustration`
- **Platform**: `mobile`, `desktop`, `web`, `app`
- **Tools**: `sketch`, `figma`, `prototyping`, `research`
- **Type**: `case-study`, `personal`, `freelance`, `team`

## Metadata Fields Reference

| Field         | Required | Type   | Example            |
| ------------- | -------- | ------ | ------------------ |
| `id`          | ✓        | string | `my-project`       |
| `name`        | ✓        | string | `My Project`       |
| `image`       | ✗        | string | `./project.jpg`    |
| `description` | ✗        | string | `A cool project`   |
| `accent`      | ✗        | hex    | `#FF6B6B`          |
| `order`       | ✗        | number | `5`                |
| `tags`        | ✗        | array  | `[design, mobile]` |

## File Structure

```
public/projects/
├── my-project/
│   ├── index.md          ← Required
│   ├── project.jpg       ← Recommended
│   ├── image-2.jpg
│   └── assets/
└── another-project/
    └── index.md
```

## Common Issues

**Images not loading?**

- ✓ Use relative paths: `./image.jpg`
- ✓ Image exists in project directory
- ✓ Filename matches exactly (case-sensitive)

**Project not showing?**

- ✓ `id` and `name` are required
- ✓ Directory name matches `id` field
- ✓ Check for YAML syntax errors (colons, hyphens)
- ✓ Run validation: `generateValidationReport()`

**Build failing?**

- ✓ Check TypeScript: all required fields present
- ✓ Validate frontmatter YAML syntax
- ✓ Check for unclosed code blocks in markdown

## Advanced Usage

### Clear Cache (Testing)

```typescript
import { clearProjectsCache } from "@/helpers/getProjects";

clearProjectsCache();
```

### Validate Config Before Creating

```typescript
import { validateProjectConfig } from "@/helpers/projectTemplates";

const validation = validateProjectConfig(config);
if (!validation.valid) {
  console.error(validation.errors);
}
```

### Create Project Directory (CLI Utility)

```typescript
import { createNewProject } from "@/helpers/projectAuthor";

const result = createNewProject("my-project", "My Project", {
  tags: ["design", "mobile"],
  accent: "#FF6B6B",
});

if (result.success) {
  console.log(`Project created at: ${result.path}`);
} else {
  console.error(result.message);
}
```

## Documentation

- **Full Guide**: See [PROJECT_SYSTEM.md](../PROJECT_SYSTEM.md)
- **Improvement Summary**: See [IMPROVEMENTS_SUMMARY.md](../IMPROVEMENTS_SUMMARY.md)
- **Type Definitions**: See [src/helpers/typeDefinitions.ts](../src/helpers/typeDefinitions.ts)

---

**Pro Tip**: Keep `order` values consistent (0-10 range) for easier management. Higher values display first.
