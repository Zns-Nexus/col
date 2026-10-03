import type { LibraryDetails } from "./types";
import _21st_dev from "./21st-dev";
import react_bits from "./react-bits";
import transition_dev from "./transition-dev";
import shadcn_ui from "./shadcn-ui";
import magic_ui from "./magic-ui";
import aceternity_ui from "./aceternity-ui";
import motion from "./motion";
import gsap from "./gsap";
import radix_ui from "./radix-ui";
import base_ui from "./base-ui";
import heroui from "./heroui";
import mantine from "./mantine";
import chakra_ui from "./chakra-ui";
import mui from "./mui";
import ant_design from "./ant-design";
import daisyui from "./daisyui";
import flowbite from "./flowbite";
import preline from "./preline";
import hyperui from "./hyperui";
import origin_ui from "./origin-ui";
import motion_primitives from "./motion-primitives";
import animata from "./animata";
import lucide from "./lucide";
import recharts from "./recharts";
import tremor from "./tremor";
import react_three_fiber from "./react-three-fiber";
import shadcn_svelte from "./shadcn-svelte";
import primevue from "./primevue";
import uselayouts from "./uselayouts";
import nexvyn_ui from "./nexvyn-ui";
import cult_ui from "./cult-ui";
import spell_ui from "./spell-ui";
import bencho from "./bencho";
import rare_ui from "./rare-ui";
import obsidian_ui from "./obsidian-ui";
import design_spells from "./design-spells";
import ark_ui from "./ark-ui";
import park_ui from "./park-ui";
import headless_ui from "./headless-ui";
import tailwind_css from "./tailwind-css";
import kibo_ui from "./kibo-ui";
import shadcnblocks from "./shadcnblocks";
import ruixen_ui from "./ruixen-ui";
import fancy_components from "./fancy-components";
import anime_js from "./anime-js";
import react_spring from "./react-spring";
import lenis from "./lenis";
import rive from "./rive";
import dotlottie from "./dotlottie";
import godui from "./godui";
import hampton_ui from "./hampton-ui";
import dimaac_ui from "./dimaac-ui";
import satisium_ui from "./satisium-ui";
import wensity_ui from "./wensity-ui";
import ai_canvas from "./ai-canvas";
import codefronts from "./codefronts";
import intent_ui from "./intent-ui";
import reui from "./reui";
import elevenlabs_ui from "./elevenlabs-ui";
import inspira_ui from "./inspira-ui";
import reka_ui from "./reka-ui";
import melt_ui from "./melt-ui";
import zard_ui from "./zard-ui";
import spartan_ui from "./spartan-ui";
import corvu from "./corvu";
import starwind_ui from "./starwind-ui";
import webcoreui from "./webcoreui";
import web_awesome from "./web-awesome";

export type { LibraryDetails };

/**
 * Detail content keyed by registry slug.
 *
 * Keys must match `data/libraries.ts` exactly. A slug with no entry here 404s
 * at the detail route, so `tests/library-pages.test.mjs` asserts the two sets
 * are identical.
 */
export const libraryDetails: Record<string, LibraryDetails> = {
  "21st-dev": _21st_dev,
  "react-bits": react_bits,
  "transition-dev": transition_dev,
  "shadcn-ui": shadcn_ui,
  "magic-ui": magic_ui,
  "aceternity-ui": aceternity_ui,
  "motion": motion,
  "gsap": gsap,
  "radix-ui": radix_ui,
  "base-ui": base_ui,
  "heroui": heroui,
  "mantine": mantine,
  "chakra-ui": chakra_ui,
  "mui": mui,
  "ant-design": ant_design,
  "daisyui": daisyui,
  "flowbite": flowbite,
  "preline": preline,
  "hyperui": hyperui,
  "origin-ui": origin_ui,
  "motion-primitives": motion_primitives,
  "animata": animata,
  "lucide": lucide,
  "recharts": recharts,
  "tremor": tremor,
  "react-three-fiber": react_three_fiber,
  "shadcn-svelte": shadcn_svelte,
  "primevue": primevue,
  "uselayouts": uselayouts,
  "nexvyn-ui": nexvyn_ui,
  "cult-ui": cult_ui,
  "spell-ui": spell_ui,
  "bencho": bencho,
  "rare-ui": rare_ui,
  "obsidian-ui": obsidian_ui,
  "design-spells": design_spells,
  "ark-ui": ark_ui,
  "park-ui": park_ui,
  "headless-ui": headless_ui,
  "tailwind-css": tailwind_css,
  "kibo-ui": kibo_ui,
  "shadcnblocks": shadcnblocks,
  "ruixen-ui": ruixen_ui,
  "fancy-components": fancy_components,
  "anime-js": anime_js,
  "react-spring": react_spring,
  "lenis": lenis,
  "rive": rive,
  "dotlottie": dotlottie,
  "godui": godui,
  "hampton-ui": hampton_ui,
  "dimaac-ui": dimaac_ui,
  "satisium-ui": satisium_ui,
  "wensity-ui": wensity_ui,
  "ai-canvas": ai_canvas,
  "codefronts": codefronts,
  "intent-ui": intent_ui,
  "reui": reui,
  "elevenlabs-ui": elevenlabs_ui,
  "inspira-ui": inspira_ui,
  "reka-ui": reka_ui,
  "melt-ui": melt_ui,
  "zard-ui": zard_ui,
  "spartan-ui": spartan_ui,
  "corvu": corvu,
  "starwind-ui": starwind_ui,
  "webcoreui": webcoreui,
  "web-awesome": web_awesome,
};
