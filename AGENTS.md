<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application structure
- Keep the subscription tracker frontend-only, with the home screen at / and the linked subscriptions screen at /subscriptions; React state handles expansion without adding backend functionality.
- Define visual styling and semantic palette in src/styles.css and share the mobile screen components and brand marks between routes to maintain visual consistency.
