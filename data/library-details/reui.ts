import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://reui.io/docs/get-started",
  repoUrl: "https://github.com/keenthemes/reui",
  preview: {
    src: "https://reui.io/og?title=Free%20Shadcn%20UI%20Components%2C%20Blocks%2C%20Icons%2C%20Templates%20%26%20MCP&description=Free%20Shadcn%20UI%20components%20and%20pro%20blocks%20for%20React%20and%20Tailwind%20CSS%2C%20plus%20hand-crafted%20icons%2C%20templates%20and%20a%20hosted%20MCP%20server%20for%20coding%20agents.&v=dpl_DEcWbDEap8UuDo5vtPZYzyfdChok",
    alt: "ReUI official preview",
  },
  pricing: {
    model: "freemium",
    summary: "The open source components are free under MIT; premium blocks, icons, and templates require a paid license.",
    license: "MIT",
    source: "https://reui.io/pricing",
  },
} satisfies LibraryDetails;
