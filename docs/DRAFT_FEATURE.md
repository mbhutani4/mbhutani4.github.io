# Draft Projects Feature

## Overview

Projects can be marked as drafts - visible in development, and optionally viewable in production with password protection. Allows working on new projects without exposing them publicly.

## How It Works

### Default Behavior

- All projects are **drafts by default** (`published: false`)
- **Development**: All projects visible (draft + published)
- **Production**:
  - Published projects visible
  - Draft projects password-protected (if `DRAFT_PASSWORD` is set)
  - Draft projects hidden (if no password configured)

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
npm start
```

✅ **Published projects visible**  
🔐 **Draft projects password-protected** (if password configured)

## Setting Up Password Protection

### 1. Set Environment Variable

In `.env.local` or your production environment:

```bash
DRAFT_PASSWORD=your-secure-password-here
```

⚠️ **Security**: Use `DRAFT_PASSWORD` (NOT `NEXT_PUBLIC_`). This keeps the password server-only and never exposes it to the client. The password is validated on the server via a secure API endpoint.

### 2. Access Draft Projects

Users can access draft projects in production by:

1. Visiting the draft project URL (e.g., `/project/my-draft`)
2. Seeing the password prompt
3. Entering the configured password
4. The password is validated on the **server-side** (never sent in URL)
5. An authentication cookie is set
6. Viewing the draft project

**Important**: The password stays private - it's never exposed in the URL or to the client.

### 3. Without Password Configuration

If `DRAFT_PASSWORD` is not set:

- Draft projects return 404 in production
- Only published projects are accessible

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

### Verify Access (Server-Side)

```typescript
import { canAccessProject } from "@/helpers/draftAccess";

// Check draft with authentication status
const access = canAccessProject(
  project.published,
  isDraftAuthenticated, // boolean from cookie
);

// Returns for drafts:
// { allowed: false, requiresPassword: true } - needs password
// { allowed: true } - authenticated
// { allowed: false, reason: "..." } - error
```

### Validate Password (Server Action)

The password validation happens securely on the server via an API route:

```typescript
// POST /api/validate-draft-password
// Body: { password: string, projectId: string }
// Response: { valid: boolean, error?: string }

// Sets secure httpOnly cookie: draft_authenticated
// Cookie expires in 24 hours
```

## Visual Indicators

### In Development Mode

Draft projects display a banner on detail page:

```
📝 This is a draft project and visible in development mode
```

### In Production with Password

Draft projects (when accessed with correct password) show:

```
📝 This is a draft project - you are viewing with password authentication
```

## Password Prompt Component

When a user tries to access a password-protected draft project without authentication, they see:

```
Draft Project
This project is still in draft. Please enter the password to view it.

[Password input field]
[View Project button]

This is a password-protected draft project.
```

## Best Practices

1. Use strong, unique passwords
2. Keep password in secure environment variables (`DRAFT_PASSWORD`, not `NEXT_PUBLIC_`)
3. Share password out-of-band (not in version control or URL)
4. Use for invitation-only previews
5. Publish when ready for public release
6. Password is validated server-side - never exposed to client

## FAQ

**Q: Can I preview drafts in production without a password?**  
A: No. Drafts either require a password (if configured) or return 404.

**Q: Is the password exposed to the client?**  
A: No. The password is a server-only environment variable (`DRAFT_PASSWORD`). It's validated via a secure API endpoint and never sent to the client.

**Q: What happens if someone enters the wrong password?**  
A: They see an "Incorrect password" error and the password prompt remains displayed. No cookies are set.

**Q: Can I change the password?**  
A: Yes. Update `DRAFT_PASSWORD` environment variable and redeploy. Existing cookies will still be valid until they expire (24 hours).

**Q: How long does the authentication last?**  
A: The `draft_authenticated` cookie expires in 24 hours. Users will need to enter the password again after that.

**Q: Can I have different passwords for different drafts?**  
A: Not in current implementation. All drafts share one password. Consider this a team/stakeholder secret.

**Q: Is this suitable for sensitive content?**  
A: No. This is designed for invitation-only access and project previews. The password is a shared secret (not per-user authentication).

## Publishing Workflow

### Option 1: Private Preview (with Password)

1. Create project (starts as draft)
2. Work on it in dev server
3. Deploy with `DRAFT_PASSWORD` set in production environment
4. Share just the project URL with stakeholders
5. They enter the password in the prompt
6. Iterate based on feedback
7. Set `published: true`
8. Redeploy (password no longer needed)
9. Draft projects now return 404, published projects remain accessible

### Option 2: Hidden Draft (no Password)

1. Create project (starts as draft)
2. Work on it in dev server locally
3. Set `published: true` when ready
4. Deploy

---

**Tip**: Use passwords for collaborative client feedback on WIP projects!
