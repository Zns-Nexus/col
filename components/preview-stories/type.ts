import type * as React from "react";

/**
 * One story's render: the documented component itself, with realistic content.
 * The caller's sample strings replace display text the render chooses to
 * expose; anything absent falls back to the recorded defaults.
 */
export type StoryRender = (props: { sample: Readonly<Record<string, string>> }) => React.ReactElement;
