# notification-hub

This is a project I'm making to consolidate all my notifications into one place, and learn good code practices along the way. So far it has been mostly the latter. Unfortunately that means it's not very feature-rich but I did learn a LOT whilst making it.

### Current features

**Plugin System**

You can write your own plugins which provide notifications. They will be polled every 5 minutes, and can also set their own notifications.

**One consolidated UI**

Everything gets put into one single place where you can see everything. This is written in react.

See `./plugins/demo.ts` for an example.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```
