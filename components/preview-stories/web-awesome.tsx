import * as React from "react";
import type WaButtonElement from "@awesome.me/webawesome/dist/components/button/button.js";
import type WaInputElement from "@awesome.me/webawesome/dist/components/input/input.js";
import type WaDialogElement from "@awesome.me/webawesome/dist/components/dialog/dialog.js";
import type WaDrawerElement from "@awesome.me/webawesome/dist/components/drawer/drawer.js";
import type WaSelectElement from "@awesome.me/webawesome/dist/components/select/select.js";
import type WaOptionElement from "@awesome.me/webawesome/dist/components/option/option.js";
import type WaTabGroupElement from "@awesome.me/webawesome/dist/components/tab-group/tab-group.js";
import type WaTabElement from "@awesome.me/webawesome/dist/components/tab/tab.js";
import type WaTabPanelElement from "@awesome.me/webawesome/dist/components/tab-panel/tab-panel.js";
import type { StoryRender } from "./type";

/*
 * Web Awesome is a web-component library; its documented React usage (React 19)
 * is the per-component registration side effect plus the hyphenated elements.
 * The full `@awesome.me/webawesome` bundle registers everything but evaluates
 * browser-only APIs at import time (it throws in Node during SSR), so the
 * cherry-picked registrations the docs show per component are used instead.
 * Styling comes from the package stylesheet the coordinator wires into the
 * preview page (`@awesome.me/webawesome/dist/styles/webawesome.css`); `wa-dark`
 * scopes the package's documented dark scheme onto these stories so the
 * components match the true-black canvas.
 */

/** Shared JSX props for a Web Awesome custom element. */
type WaElementProps<TElement extends HTMLElement> = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  slot?: string;
  title?: string;
  hidden?: boolean;
  ref?: React.Ref<TElement>;
};

type WaButtonProps = WaElementProps<WaButtonElement> & {
  variant?: WaButtonElement["variant"];
  appearance?: WaButtonElement["appearance"];
  size?: WaButtonElement["size"];
  type?: WaButtonElement["type"];
  disabled?: WaButtonElement["disabled"];
  loading?: WaButtonElement["loading"];
  pill?: WaButtonElement["pill"];
  href?: WaButtonElement["href"];
  target?: WaButtonElement["target"];
  rel?: WaButtonElement["rel"];
};

type WaInputProps = WaElementProps<WaInputElement> & {
  label?: WaInputElement["label"];
  hint?: WaInputElement["hint"];
  placeholder?: WaInputElement["placeholder"];
  value?: WaInputElement["value"];
  type?: WaInputElement["type"];
  size?: WaInputElement["size"];
  appearance?: WaInputElement["appearance"];
  pill?: WaInputElement["pill"];
  withClear?: WaInputElement["withClear"];
  "with-clear"?: WaInputElement["withClear"];
  disabled?: WaInputElement["disabled"];
  required?: WaInputElement["required"];
  name?: WaInputElement["name"];
};

type WaDialogProps = WaElementProps<WaDialogElement> & {
  open?: WaDialogElement["open"];
  label?: WaDialogElement["label"];
  lightDismiss?: WaDialogElement["lightDismiss"];
  "light-dismiss"?: WaDialogElement["lightDismiss"];
  withoutHeader?: WaDialogElement["withoutHeader"];
  "without-header"?: WaDialogElement["withoutHeader"];
  withFooter?: WaDialogElement["withFooter"];
  "with-footer"?: WaDialogElement["withFooter"];
  withLabel?: WaDialogElement["withLabel"];
  "with-label"?: WaDialogElement["withLabel"];
};

type WaDrawerProps = WaElementProps<WaDrawerElement> & {
  open?: WaDrawerElement["open"];
  label?: WaDrawerElement["label"];
  placement?: WaDrawerElement["placement"];
  lightDismiss?: WaDrawerElement["lightDismiss"];
  "light-dismiss"?: WaDrawerElement["lightDismiss"];
  withoutHeader?: WaDrawerElement["withoutHeader"];
  "without-header"?: WaDrawerElement["withoutHeader"];
  withFooter?: WaDrawerElement["withFooter"];
  "with-footer"?: WaDrawerElement["withFooter"];
  withLabel?: WaDrawerElement["withLabel"];
  "with-label"?: WaDrawerElement["withLabel"];
};

type WaSelectProps = WaElementProps<WaSelectElement> & {
  label?: WaSelectElement["label"];
  hint?: WaSelectElement["hint"];
  placeholder?: WaSelectElement["placeholder"];
  value?: WaSelectElement["value"];
  name?: WaSelectElement["name"];
  size?: WaSelectElement["size"];
  appearance?: WaSelectElement["appearance"];
  placement?: WaSelectElement["placement"];
  multiple?: WaSelectElement["multiple"];
  pill?: WaSelectElement["pill"];
  disabled?: WaSelectElement["disabled"];
  withClear?: WaSelectElement["withClear"];
  "with-clear"?: WaSelectElement["withClear"];
};

type WaOptionProps = WaElementProps<WaOptionElement> & {
  value?: WaOptionElement["value"];
  selected?: WaOptionElement["selected"];
  disabled?: WaOptionElement["disabled"];
};

type WaTabGroupProps = WaElementProps<WaTabGroupElement> & {
  active?: WaTabGroupElement["active"];
  placement?: WaTabGroupElement["placement"];
  activation?: WaTabGroupElement["activation"];
};

type WaTabProps = WaElementProps<WaTabElement> & {
  panel?: WaTabElement["panel"];
  active?: WaTabElement["active"];
  disabled?: WaTabElement["disabled"];
};

type WaTabPanelProps = WaElementProps<WaTabPanelElement> & {
  name?: WaTabPanelElement["name"];
  active?: WaTabPanelElement["active"];
};

// Local JSX declarations for the elements these stories render, typed from the
// package's own element classes above — never `any`, nothing global beyond the
// nine tags.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "wa-button": WaButtonProps;
      "wa-input": WaInputProps;
      "wa-dialog": WaDialogProps;
      "wa-drawer": WaDrawerProps;
      "wa-select": WaSelectProps;
      "wa-option": WaOptionProps;
      "wa-tab-group": WaTabGroupProps;
      "wa-tab": WaTabProps;
      "wa-tab-panel": WaTabPanelProps;
    }
  }
}

import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/input/input.js";
import "@awesome.me/webawesome/dist/components/dialog/dialog.js";
import "@awesome.me/webawesome/dist/components/drawer/drawer.js";
import "@awesome.me/webawesome/dist/components/select/select.js";
import "@awesome.me/webawesome/dist/components/option/option.js";
import "@awesome.me/webawesome/dist/components/tab-group/tab-group.js";
import "@awesome.me/webawesome/dist/components/tab/tab.js";
import "@awesome.me/webawesome/dist/components/tab-panel/tab-panel.js";

const ButtonStory: StoryRender = ({ sample }) => (
  <div className="wa-dark flex w-full max-w-xl flex-col items-center gap-6">
    <div className="text-center">
      <h2 className="text-2xl font-semibold">{sample.headline ?? "Ship your support desk in an afternoon"}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {sample.support ?? "Start on the free plan — no credit card, no sales call."}
      </p>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <wa-button variant="brand" appearance="accent">
        {sample.primaryLabel ?? "Start free trial"}
      </wa-button>
      <wa-button appearance="outlined">{sample.secondaryLabel ?? "View the docs"}</wa-button>
      <wa-button appearance="plain">Talk to sales</wa-button>
    </div>
  </div>
);

const InputStory: StoryRender = ({ sample }) => (
  <div className="wa-dark w-full max-w-sm">
    <wa-input
      label={sample.label ?? "Work email"}
      placeholder={sample.placeholder ?? "you@company.com"}
      hint={sample.hint ?? "We use this to create your workspace."}
      value="ada@northwind.dev"
    />
  </div>
);

const DialogStory: StoryRender = ({ sample }) => (
  <div className="wa-dark">
    <wa-dialog open label={sample.title ?? "Invite a team member"} with-footer light-dismiss>
      <p>They receive an email with a link to join this workspace.</p>
      <wa-input label="Email address" value="teammate@example.com" />
      <wa-button slot="footer" appearance="plain">
        Cancel
      </wa-button>
      <wa-button slot="footer" variant="brand" appearance="accent">
        Send invite
      </wa-button>
    </wa-dialog>
  </div>
);

const DrawerStory: StoryRender = ({ sample }) => (
  <div className="wa-dark">
    <wa-drawer open label={sample.title ?? "Filter reports"} placement="end" with-footer>
      <wa-select label="Status" value="active">
        <wa-option value="active">Active</wa-option>
        <wa-option value="paused">Paused</wa-option>
        <wa-option value="archived">Archived</wa-option>
      </wa-select>
      <wa-select label="Region" value="eu">
        <wa-option value="us">United States</wa-option>
        <wa-option value="eu">Europe</wa-option>
        <wa-option value="apac">Asia Pacific</wa-option>
      </wa-select>
      <wa-button slot="footer" appearance="plain">
        Reset
      </wa-button>
      <wa-button slot="footer" variant="brand" appearance="accent">
        Apply filters
      </wa-button>
    </wa-drawer>
  </div>
);

const SelectStory: StoryRender = ({ sample }) => (
  <div className="wa-dark w-full max-w-sm">
    <wa-select
      label={sample.label ?? "Environment"}
      hint={sample.hint ?? "Where this deployment pipeline runs."}
      value="production"
    >
      <wa-option value="production" selected>
        Production
      </wa-option>
      <wa-option value="staging">Staging</wa-option>
      <wa-option value="preview">Preview</wa-option>
    </wa-select>
  </div>
);

const TabGroupStory: StoryRender = ({ sample }) => (
  <div className="wa-dark w-full max-w-xl">
    <wa-tab-group active="general">
      <wa-tab panel="general">{sample.tab1 ?? "General"}</wa-tab>
      <wa-tab panel="members">Members</wa-tab>
      <wa-tab panel="billing">Billing</wa-tab>

      <wa-tab-panel name="general">
        <p>{sample.panel1 ?? "Workspace name, default timezone, and the reporting week start."}</p>
      </wa-tab-panel>
      <wa-tab-panel name="members">
        <p>12 members, 3 pending invitations, and 2 admins.</p>
      </wa-tab-panel>
      <wa-tab-panel name="billing">
        <p>The Team plan renews on November 3rd — $48 per seat, billed monthly.</p>
      </wa-tab-panel>
    </wa-tab-group>
  </div>
);

export const storyRenders: Record<string, StoryRender> = {
  "web-awesome/Button": ButtonStory,
  "web-awesome/Input": InputStory,
  "web-awesome/Dialog": DialogStory,
  "web-awesome/Drawer": DrawerStory,
  "web-awesome/Select": SelectStory,
  "web-awesome/Tab Group": TabGroupStory,
};
