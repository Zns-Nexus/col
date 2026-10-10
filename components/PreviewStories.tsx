import * as React from "react";
import { radixStoryRenders } from "./PreviewStoriesRadix";
import { shadcnStoryRenders } from "./PreviewStoriesShadcn";

/**
 * Preview story renders — the documented component itself, with realistic
 * props, keyed by story id (`<library-slug>/<component name>`). Each render
 * takes the caller's sample strings and falls back to the recorded defaults
 * for any it does not supply. Per-library modules hold the renders; this
 * module merges them into the one map the preview page looks stories up in.
 * A story id with no render fails the build rather than shipping blank.
 */
export type StoryRender = (props: { sample: Readonly<Record<string, string>> }) => React.ReactElement;

export const storyRenders: Record<string, StoryRender> = {
  ...radixStoryRenders,
  ...shadcnStoryRenders,
};
