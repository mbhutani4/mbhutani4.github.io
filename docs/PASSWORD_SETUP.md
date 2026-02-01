# Password-Protected Drafts - Setup Guide

## Quick Setup (5 minutes)

### 1. Set Environment Variable

Create or edit `.env.local` in your project root:

```bash
DRAFT_PASSWORD=your-secret-password-here
```

**Replace `your-secret-password-here`** with your desired password.

⚠️ **Security Note**: Use `DRAFT_PASSWORD` (NOT `NEXT_PUBLIC_`). This keeps the password server-only and never exposes it to the client.

### 2. Rebuild

```bash
npm run build
npm start
```

### 3. Test It

1. Mark a project as draft in its frontmatter:

```yaml
---
id: my-draft-project
name: My Draft
published: false
---
```

2. Try visiting `/project/my-draft-project`
3. You'll see a password prompt
4. Enter the password you set in step 1
5. The password is validated on the server, and an authentication cookie is set
6. You can now view the draft project

### 4. Share with Stakeholders

Share just the link (without exposing password in URL):

```
https://yourdomain.com/project/my-draft-project
```

Have them enter the password in the prompt. The password stays private and is never exposed in the URL.

## Behavior Matrix

| Scenario                   | Dev Server | Production Build | Result                   |
| -------------------------- | ---------- | ---------------- | ------------------------ |
| Draft without password env | ✅ Visible | ❌ 404           | Hidden in prod           |
| Draft with password env    | ✅ Visible | 🔐 Prompt        | Can access with password |
| Published                  | ✅ Visible | ✅ Visible       | Always public            |

## Security Notes

⚠️ **Important**: The password is visible in:

- Frontend code/bundles
- URL parameters
- Browser history

This is suitable for:

- ✅ Invitation-only client previews
- ✅ Stakeholder feedback on WIP projects
- ✅ Private preview links

This is NOT suitable for:

- ❌ Protecting sensitive information
- ❌ Security-critical content
- ❌ Personal/private data

## Using in Production (Vercel, etc.)

1. Set environment variable in your hosting platform:
   - Vercel: Settings → Environment Variables → `NEXT_PUBLIC_DRAFT_PASSWORD`
   - Other platforms: Follow their env var documentation

2. Redeploy:
   ```bash
   git push  # Triggers automatic redeploy
   ```

## Changing the Password

1. Update `.env.local` or hosting platform settings
2. Redeploy
3. New password works immediately
4. Old password stops working

## Removing Password Protection

1. Remove `NEXT_PUBLIC_DRAFT_PASSWORD` environment variable
2. Redeploy
3. Draft projects return 404 again

## Testing Locally

```bash
# Set password
echo "NEXT_PUBLIC_DRAFT_PASSWORD=testpass" > .env.local

# Rebuild
npm run build

# Start production build locally
npm start

# Test at http://localhost:3000/project/my-draft?password=testpass
```

## Troubleshooting

**Q: Password not working?**

- Check `.env.local` exists and has correct password
- Verify you rebuilt after changing password
- Check that the project has `published: false`

**Q: Draft always shows 404?**

- Verify `NEXT_PUBLIC_DRAFT_PASSWORD` is set
- Check environment variable is visible to the build process
- Rebuild the project

**Q: Can I see all password-protected drafts?**

- No. Each draft requires the same password
- All drafts share one password

---

**Next**: See [DRAFT_FEATURE.md](DRAFT_FEATURE.md) for comprehensive documentation.
