import type { UseCase } from "../libraries";
import type { ReusePermission } from "../library-corpus/types";

/** One preview story: how a documented component renders in a use-case scene. */
export interface PreviewStory {
  /** The component's official name, exactly as the verified component index spells it. */
  component: string;
  /** The use-case scene whose chrome wraps the component. */
  scene: UseCase;
  /** npm packages the story's render imports beyond React itself. */
  dependencies: string[];
}

/**
 * Preview stories for one library. Stories may only exist where the library's
 * recorded reuse permission is granted, the same gate documentation snapshots
 * ride; the permission record is what makes preview media lawful by
 * construction.
 */
export interface PreviewStoriesEntry {
  /** Owning library slug, matching `data/libraries.ts`. */
  slug: string;
  /** The recorded reuse decision gating every story below. */
  permission: ReusePermission;
  stories: PreviewStory[];
}
