# Quick Start: Project System

## Creating a New Project

### Option 1: Using TypeScript Helper

```typescript
import { generateProjectTemplate } from "@/helpers/projectTemplates";

const template = generateProjectTemplate({
  id: "my-project",
  name: "My Project",
  description: "A brief description",
  tags: ["design", "mobile"],
  accent: "#FF6B6B",
  order: 5,
  published: true,
});

// Copy to public/projects/my-project/index.md
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
published: true
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
- **Results** - What was the impact?

### Images

```markdown
![Description](./image.jpg) ← Auto-transformed to /projects/id/image.jpg
```

### Links

```markdown
[Text](./file.pdf) ← Auto-transformed
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

## Validation & Checks

### Validate All Projects

```typescript
import { generateValidationReport } from "@/helpers/projectAuthor";

const report = generateValidationReport("./public/projects");
console.log(report);
```

## Common Tags

Use these for consistency:

- **Skills**: `design`, `ux`, `ui`, `branding`
- **Platform**: `mobile`, `desktop`, `web`
- **Tools**: `sketch`, `figma`, `prototyping`
- **Type**: `case-study`, `research`

## Metadata Fields Reference

| Field         | Required | Type    | Example            |
| ------------- | -------- | ------- | ------------------ |
| `id`          | ✓        | string  | `my-project`       |
| `name`        | ✓        | string  | `My Project`       |
| `image`       | ✗        | string  | `./project.jpg`    |
| `description` | ✗        | string  | `A cool project`   |
| `accent`      | ✗        | hex     | `#FF6B6B`          |
| `order`       | ✗        | number  | `5`                |
| `tags`        | ✗        | array   | `[design, mobile]` |
| `published`   | ✗        | boolean | `true`             |

## File Structure

```
public/projects/
├── my-project/
│   ├── index.md          ← Required
│   ├── project.jpg       ← Recommended
│   └── assets/           ← Optional
└── another-project/
    └── index.md
```

## Common Issues

**Images not loading?**

- ✓ Use relative paths: `./image.jpg`
- ✓ Image exists in project directory
- ✓ Filename matches exactly (case-sensitive)

**Project not showing?**

- ✓ Check `id` and `name` are required
- ✓ Verify YAML syntax in frontmatter
- ✓ For drafts: ensure `published: true` in production

**Build failing?**

- ✓ Validate frontmatter YAML
- ✓ Check for unclosed code blocks

## Draft Projects

### Keep as Draft (Dev-Only)

```yaml
published: false # or omit - false is default
```

### Publish for Production

```yaml
published: true
```

In development: drafts are always visible  
In production: only published projects visible

---

**Pro Tip**: Keep `order` values in 0-10 range for easier management. Higher values display first.
