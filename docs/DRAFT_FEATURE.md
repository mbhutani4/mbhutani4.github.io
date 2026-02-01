# Draft Projects Feature

## Overview

Projects can be marked as drafts - visible in development only, hidden in production. Allows working on new projects without exposing them publicly.

## How It Works

### Default Behavior

- All projects are **drafts by default** (`published: false`)
- **Development**: All projects visible (draft + published)
- **Production**: Only published projects visible

### Marking as Published

Add `published: true` to frontmatter:

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

✅ **All projects visible** (draft + published)

### Production Build

```bash
npm run build
```

✅ **Only published projects visible**

## Creating Projects

### Default (Draft)

```typescript
import { generateProjectTemplate } from "@/helpers/projectTemplates";

const template = generateProjectTemplate({
  id: "my-project",
  name: "My Project",
  published: false, // Default - draft
});
```

### Published

```typescript
const template = generateProjectTemplate({
  id: "my-project",
  name: "My Project",
  published: true, // Published immediately
});
```

## Using Draft Features in Code

### Check if Draft

```typescript
import { isDraft } from "@/helpers/draftAccess";

const isDraftProject = isDraft(project.published);
```

### Get Draft Info

```typescript
import { getDraftInfo } from "@/helpers/draftAccess";

const info = getDraftInfo(project.published);
// Returns: { isDraft, isVisible, message }
```

### Verify Access

```typescript
import { canAccessProject } from "@/helpers/draftAccess";

const access = canAccessProject(project.published);
if (!access.allowed) {
  console.log(access.reason);
}
```

## Visual Indicators

### In Development Mode

Draft projects display a banner on detail page:

```
📝 This is a draft project and only visible in development mode
```

## Best Practices

1. Keep drafts in development
2. Publish when ready
3. Use dev server for review
4. Test in production build

## FAQ

**Q: Can I preview drafts in production?**  
A: No. Drafts are completely hidden in production.

**Q: What if someone guesses the URL?**  
A: Draft projects don't generate static pages in production and return 404.

**Q: Future password protection?**  
A: Infrastructure ready - `canAccessProject()` has password parameter reserved.

## Publishing Workflow

1. Create project (starts as draft)
2. Work on it in dev server
3. Review and test
4. Set `published: true`
5. Deploy

---

**Tip**: Use drafts to maintain a backlog of work-in-progress projects!
