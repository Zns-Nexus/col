import { radixStoryRenders } from "./preview-stories/radix-ui";
import { shadcnStoryRenders } from "./preview-stories/shadcn-ui";
import { storyRenders as baseUi1Renders } from "./preview-stories/base-ui-1";
import { storyRenders as baseUi2Renders } from "./preview-stories/base-ui-2";
import { storyRenders as reactAria1Renders } from "./preview-stories/react-aria-1";
import { storyRenders as reactAria2Renders } from "./preview-stories/react-aria-2";
import { storyRenders as arkUi1Renders } from "./preview-stories/ark-ui-1";
import { storyRenders as arkUi2Renders } from "./preview-stories/ark-ui-2";
import { storyRenders as mantine1Renders } from "./preview-stories/mantine-1";
import { storyRenders as mantine2Renders } from "./preview-stories/mantine-2";
import { storyRenders as mantine3Renders } from "./preview-stories/mantine-3";
import { storyRenders as mui2Renders } from "./preview-stories/mui-2";
import { storyRenders as mantine4Renders } from "./preview-stories/mantine-4";
import { storyRenders as mui1Renders } from "./preview-stories/mui-1";
import { storyRenders as shadcnUi1Renders } from "./preview-stories/shadcn-ui-1";
import { storyRenders as shadcnUi2Renders } from "./preview-stories/shadcn-ui-2";
import { storyRenders as mui3Renders } from "./preview-stories/mui-3";
import { storyRenders as headlessUiRenders } from "./preview-stories/headless-ui";
import { storyRenders as intentUiRenders } from "./preview-stories/intent-ui";
import { storyRenders as reuiRenders } from "./preview-stories/reui";
import { storyRenders as elevenlabsUiRenders } from "./preview-stories/elevenlabs-ui";
import { storyRenders as starwindUiRenders } from "./preview-stories/starwind-ui";
import { storyRenders as webcoreuiRenders } from "./preview-stories/webcoreui";
import { storyRenders as webAwesomeRenders } from "./preview-stories/web-awesome";
import type { StoryRender } from "./preview-stories/type";

/**
 * The story render map: per-library modules beside this file hold the renders,
 * this module merges them into the one map the preview page looks stories up
 * in. A story id with no render fails the build rather than shipping blank.
 */
export type { StoryRender };

export const storyRenders: Record<string, StoryRender> = {
  ...radixStoryRenders,
  ...shadcnStoryRenders,
  ...baseUi1Renders,
  ...baseUi2Renders,
  ...reactAria1Renders,
  ...reactAria2Renders,
  ...arkUi1Renders,
  ...arkUi2Renders,
  ...mantine1Renders,
  ...mantine2Renders,
  ...mantine3Renders,
  ...mui2Renders,
  ...mantine4Renders,
  ...mui1Renders,
  ...shadcnUi1Renders,
  ...shadcnUi2Renders,
  ...mui3Renders,
  ...headlessUiRenders,
  ...intentUiRenders,
  ...reuiRenders,
  ...elevenlabsUiRenders,
  ...starwindUiRenders,
  ...webcoreuiRenders,
  ...webAwesomeRenders,
};
