# Draft Projects Feature

## Overview

Projects can now be marked as drafts, making them visible only in development while remaining hidden in production. This allows you to work on new projects without exposing them publicly.

## How It Works

### Default Behavior

- All projects are **drafts by default** (`published: false`)
- **Development mode**: All projects are visible (published or draft)
- **Production mode**: Only published projects are visible

### Marking a Project as Published

Add `published: true` to the project's frontmatter:

```yaml
---
id: my-project
name: My Project
published: true
tags:
  - design
---
```

## Project Visibility

### Development Server

```bash
npm run dev
```

✅ **All projects visible** (both draft and published)

- Perfect for reviewing work-in-progress projects
- Test everything before publishing

### Production Build

```bash
npm run build
npm start
```

✅ **Only published projects visible**

- Drafts are completely hidden
- Not included in project lists
- Direct URLs return no-index metadata

## Frontmatter Reference

| Field       | Type    | Default | Description                              |
| ----------- | ------- | ------- | ---------------------------------------- |
| `published` | boolean | `false` | Whether project is visible in production |

### Example: Draft Project

```yaml
---
id: new-project
name: Work in Progress
published: false
tags:
  - design
---
```

### Example: Published Project

```yaml
---
id: completed-project
name: Finished Project
published: true
tags:
  - design
---
```

## Creating a New Project

When generating a new project template, it defaults to draft:

```typescript
import { generateProjectTemplate } from "@/helpers/projectTemplates";

const template = generateProjectTemplate({
  id: "my-project",
  name: "My Project",
  published: false, // Default - draft
  tags: ["design"],
});
```

To create a published project immediately:

```typescript
const template = generateProjectTemplate({
  id: "my-project",
  name: "My Project",
  published: true, // Published immediately
  tags: ["design"],
});
```

## Visual Indicators

### In Development Mode

Draft projects display a banner on the detail page:

```
📝 This is a draft project and only visible in development mode
```

This badge helps you remember the project is not yet public.

## Using Draft Features in Code

### Check if Project is Draft

```typescript
import { isDraft } from "@/helpers/draftAccess";

const isDraftProject = isDraft(project.published);
```

### Get Draft Information

```typescript
import { getDraftInfo } from "@/helpers/draftAccess";

const info = getDraftInfo(project.published);
// Returns:
// {
//   isDraft: boolean,
//   isVisible: boolean,
//   message: string
// }
```

### Verify Access

```typescript
import { canAccessProject } from "@/helpers/draftAccess";

const access = canAccessProject(project.published);
if (!access.allowed) {
  console.log(access.reason);
  // "This project is still in draft and not publicly available"
}
```

### Dynamic Visibility

```typescript
import { shouldGenerateProject } from "@/helpers/draftAccess";

const generate = shouldGenerateProject(project.published);
// In dev: true
// In prod: true only if published
```

## Best Practices

1. **Keep drafts in development**: Work on new projects locally
2. **Publish when ready**: Set `published: true` before pushing to main
3. **Use dev server for review**: Check drafts before publishing
4. **Test in production build**: Run `npm run build` to verify visibility

## Publishing Workflow

### Step 1: Create Project

```bash
# Project starts as draft
published: false
```

### Step 2: Add Content

```bash
# Work on the project in dev server
npm run dev
# Review at http://localhost:3000
```

### Step 3: Publish

```bash
# Update frontmatter
published: true
```

### Step 4: Deploy

```bash
# Build and deploy
npm run build
npm start
```

## FAQ

**Q: Can I preview drafts in production?**  
A: Not publicly. Drafts are completely hidden in production builds. You can review them locally with the dev server.

**Q: What happens if someone guesses the URL?**  
A: Direct access to draft projects in production returns:

- No metadata (no-index header)
- 404 page (not in generated pages)
- Project is never included in project lists

**Q: Can I add password protection?**  
A: The infrastructure is ready for future password-protected drafts. The `canAccessProject()` function has a password parameter reserved for this feature.

**Q: How do I batch publish multiple projects?**  
A: Use find-and-replace in your editor:

- Search: `published: false`
- Replace: `published: true`
- Verify changes before committing

**Q: Are draft projects included in builds?**  
A:

- **Dev**: Yes, always visible
- **Prod**: No, completely excluded

## Troubleshooting

### Draft project appearing in production

Check the frontmatter:

```yaml
published: true # ✓ Should be true
```

### Published project hidden in production

Make sure field exists and is set correctly:

```yaml
published: true # ✓ Must exist and be true
```

### Build includes draft projects

Check NODE_ENV:

```bash
NODE_ENV=production npm run build
# Should exclude drafts
```

## API Reference

### `isDevelopment()`

Returns true if running in development mode.

### `isDraft(published?: boolean)`

Returns true if project is a draft.

### `getDraftInfo(published?: boolean)`

Returns object with `isDraft`, `isVisible`, and `message` properties.

### `canAccessProject(published?: boolean, _password?: string)`

Returns `{ allowed: boolean, reason?: string }`.

### `shouldGenerateProject(published?: boolean)`

Returns true if project should be generated in current environment.

---

**Tip**: Use the draft system to maintain a backlog of projects you're working on without cluttering the public portfolio!
