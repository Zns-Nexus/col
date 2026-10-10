import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://lucide-animated.com",
  repoUrl: "https://github.com/pqoqubbw/icons",
  preview: {
    src: "https://lucide-animated.com/og.png",
    alt: "lucide-animated animated React icons library home page preview",
  },
  registrySetup: {
    description: "Start with a React or Next.js project initialized with shadcn, so components.json exists and the `@/components` and `@/lib/utils` aliases resolve; each installed icon imports the `cn` helper from `@/lib/utils`. The first icon you add also installs the `motion` package.",
  },
  install: [
    { label: "Add one icon (example: activity)", command: "npx shadcn@latest add \"https://lucide-animated.com/r/activity.json\"" },
    { label: "Add another icon (kebab-case name)", command: "npx shadcn@latest add \"https://lucide-animated.com/r/arrow-right.json\"" },
  ],
  gettingStarted: [
    "Browse the icons on https://lucide-animated.com and note the kebab-case name of the one you want, such as `activity`, `arrow-right` or `bell`. Names follow Lucide's own, so an icon you already use from https://lucide.dev usually has an animated version.",
    "Install a single icon with the shadcn CLI: `npx shadcn@latest add \"https://lucide-animated.com/r/activity.json\"`. It writes one file to `components/icons/<icon-name>.tsx` and adds `motion` to your dependencies if it is missing.",
    "Import the installed file and render it, for example `import { Activity } from \"@/components/icons/activity\";` then `<Activity className=\"size-6\" />`. The icon animates on hover and forwards standard props. Open the installed file to confirm its exact export name, since the per-icon page https://lucide-animated.com/icons/bell shows `BellIcon`.",
    "To start an animation from your own trigger (a button, a list row), the installed component exposes `startAnimation` and `stopAnimation` through a ref; once a ref is attached it stops reacting to its own hover, so call them from your handlers.",
    "Use https://lucide-animated.com/llms.txt as the index of every icon, or the MCP endpoint at `/mcp` (tools `search_icons`, `list_icons`, `get_icon`) from an agent. Source and issues are at https://github.com/pqoqubbw/icons.",
  ],
  agentPrompt: `Add lucide-animated (https://lucide-animated.com), a collection of animated React icons based on Lucide and powered by Motion, to this existing project.

Icons are copied into the project as source files through the shadcn registry. There is no lucide-animated package to install.

Prerequisites:
- A React project (Next.js works) that has been initialized with shadcn: components.json exists and the @/components and @/lib/utils aliases resolve. The installed icons import cn from @/lib/utils.
- Tailwind CSS is recommended for sizing and coloring but is not required.
- Inspect the package manager, components.json and the existing icon usage (often lucide-react) before changing anything.

Steps:
1. Read https://lucide-animated.com/llms.txt for the index of icons, and https://lucide-animated.com/skill.md for the operating guide. Per-icon pages are at https://lucide-animated.com/icons/<name> and use Lucide's kebab-case names.
2. Install only the icons the task needs, one command per icon: npx shadcn@latest add "https://lucide-animated.com/r/<name>.json" (for example activity or arrow-right). Use the kebab-case name in the URL, never PascalCase. The first install also adds motion to dependencies.
3. Open each generated file under components/icons/<name>.tsx and read its exported component name. The docs show Activity for activity while the per-icon page for bell shows BellIcon, so import the name the file actually exports.
4. Render it where the static icon was: <Activity className="size-6" />. The component animates on hover, forwards standard props such as className, onClick and aria-label, and accepts a size number in the files that define one.
5. To trigger the animation from a parent (a button, a menu row), attach a ref and call startAnimation() and stopAnimation(). Once a ref is attached the icon no longer animates from its own hover, so wire the parent's mouseenter and mouseleave to those methods.
6. Run the project's typecheck and build, and check the icon in the browser on hover.

Notes:
- Hover animation only fires on devices that support :hover. For touch, trigger it through the ref.
- Icons that carry meaning on their own need aria-label; decorative icons next to text should be hidden from assistive technology.
- The collection is MIT licensed. Do not install lucide-animated icons by guessing names: confirm each one exists in the llms.txt index first.
- Optional ports for other frameworks are listed in llms.txt: Svelte at https://www.movingicons.dev/, Vue at https://imfenghuang.github.io/icons/, Angular at https://github.com/ajitzero/animated-icons, Flutter at https://pub.dev/packages/flutter_lucide_animated. They are by different authors.`,
  pricing: {
    model: "free",
    summary: "Every icon is free for personal and commercial use under MIT; the sponsorship page is an optional donation, not a paid tier.",
    license: "MIT",
    source: "https://github.com/pqoqubbw/icons/blob/main/LICENSE",
  },
} satisfies LibraryDetails;
