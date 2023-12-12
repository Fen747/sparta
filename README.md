# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).


## Ressources
### Why the hooks.server.ts
- https://github.com/sveltejs/kit/issues/6315
- https://www.youtube.com/watch?v=UbhhJWV3bmI

### To understand the middleware ( hooks )
- https://www.youtube.com/watch?v=K1Tya6ovVOI&t=17s
- https://youtu.be/Kzrz7GZ9pIg?si=-B20fK2kU6XiYF3y
- https://kit.svelte.dev/docs/hooks#server-hooks
- https://www.okupter.com/blog/sveltekit-internals-handle-hook

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
pnpm create svelte@latest

# create a new project in sparta-app
pnpm create svelte@latest sparta-app
```

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
