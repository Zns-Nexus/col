import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://prompt-motion.com",
  gettingStarted: [
    "Open https://prompt-motion.com to browse the gallery. Each tile is a short motion video made with Claude Opus 5.5, credited to the person who posted it on X, and tiles autoplay a preview that Pause previews stops.",
    "Narrow the list with the filters at the top: Prompt or Skill, Popular, and categories such as Product UI, Phone, Charts, Diagrams, Kinetic type, Shapes, Particles, Characters, Photos, Music, and Code. Each category shows how many entries it holds.",
    "Open an entry at a path like https://prompt-motion.com/steventey-0d20e4. The page shows the full prompt with a Copy button, the model, the effort setting and the iteration count when the author gave them, the post date, and a link to the original post.",
    "Paste the copied prompt into your own coding agent and edit the subject, for example the product name or URL, the length, and the style. Results depend on your model, so treat the prompt as a starting point, not a recipe.",
    "Add your own prompt through the Submit button in the site header, or get new entries by email with the Subscribe box on the home page, which sends a note when entries are added plus a weekly recap.",
  ],
  preview: {
    src: "https://prompt-motion.com/opengraph-image.png",
    alt: "Prompt Motion gallery preview",
  },
  agentPrompt: `Use Prompt Motion (https://prompt-motion.com) as a reference library of prompts for generating motion graphics videos with a coding agent.

Prompt Motion is a curated gallery, not a code library. Each entry is a motion video made with Claude Opus 5.5, with the prompt (or skill) behind it, the model, and often the effort level and iteration count. Nothing is installed: there is no package, CLI, or code to copy, so do not try to install anything.

Prerequisites:
- Ask me what the video is for (a product launch, a feature explainer, a social clip), its length, and which product or URL it should show.
- Confirm which model and tooling I will generate with. The gallery's prompts were written for Claude Opus 5.5, so results can differ on other models.

Steps:
1. Open https://prompt-motion.com and use the Prompt or Skill filter and the category filters (Product UI, Phone, Charts, Diagrams, Kinetic type, Shapes, Particles, Characters, Photos, Music, Code) to find three entries close to what I asked for.
2. Open each entry, for example https://prompt-motion.com/steventey-0d20e4, and read the prompt, the model, the effort, and whether it was a one-shot or took several iterations.
3. Summarize what the strong prompts share: how they state length, tone, and audience, whether they give a URL or a brand, and what they leave to the model. Do this before writing anything.
4. Write a prompt for my video in the same shape, replacing the subject, length, and style with mine. Do not reuse another creator's wording where it names their own product.
5. Generate the video, review it, and iterate on the prompt. Keep the final prompt and settings with the output so the result can be reproduced.

Notes:
- Videos and prompts belong to their creators, who are linked on every entry. Use them as inspiration and credit the original author if you adapt a prompt closely.
- Prompt entries are quick to copy, but a one-shot result in the gallery may have taken the author several tries off-screen, so budget for iteration.`,
  pricing: {
    model: "free",
    summary: "The gallery lists no pricing or paid tier; videos and prompts belong to their creators.",
    source: "https://prompt-motion.com",
  },
  collection: "It collects videos and prompts posted by many outside creators, so the terms for each belong to its author.",
} satisfies LibraryDetails;
