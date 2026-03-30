---
name: Build UI From Image
description: "Recreate a UI from a provided reference image, split into small React/Next components, and add temporary debug backgrounds for layout clarity."
argument-hint: "Provide image details/link plus page purpose and constraints"
agent: agent
---

Build the UI shown in the user-provided reference image and implement it in the current codebase.

Use any additional text provided with this prompt invocation as task-specific constraints.

Tech assumptions:

- Target stack is Next.js + Tailwind CSS.
- All styling should be done with inline Tailwind utility classes in JSX/TSX (no separate CSS modules/files unless explicitly requested).

Requirements:

- Recreate the layout, spacing, alignment, and visual hierarchy from the image as closely as possible.
- Break the UI into small, readable components with clear names inferred from the reference image and content.
- Only use explicit naming requested by the user when they provide one.
- Keep component boundaries easy for a developer to understand and maintain.
- Add concise comments only where structure or logic is not obvious.
- If the reference includes images/illustrations that are not available, use placeholder blocks with distinct background colors.
- Add extra temporary background colors to major layout containers to make structure easy to inspect during development.
- Keep all temporary visual-debug colors clearly marked with `TODO` comments so a developer can remove them later.
- Ensure the result is responsive on desktop and mobile.
- If the project already has a design system or style patterns, follow those patterns instead of introducing conflicting ones.

Implementation expectations:

- Prefer reusable components over one large page file.
- Keep Tailwind classes organized and readable.
- Use semantic HTML where possible.
- Avoid introducing unrelated dependencies.

Output format:

1. Implement the code changes directly.
2. Summarize what was created, listing new/updated components and files.
3. Include a short "Cleanup TODOs" list containing temporary background/debug styles to remove later.
