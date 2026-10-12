import { Accordion, Alert, Button, DataTable } from "@/lib/webcoreui-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for WebcoreUI. The components come from the installed
 * `webcoreui` package (React entry at `webcoreui/react`); their Sass styling
 * rides the stylesheet entry the coordinator wires into the preview page
 * (`webcoreui/styles`, see the merge notes), never an import from this module.
 */

const AccordionStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-xl">
    <Accordion
      icon="plus"
      items={[
        {
          title: sample.question1 ?? "How does pricing work?",
          content:
            sample.answer1 ??
            "Every plan includes the full component set. Paid tiers add team seats, priority support, and SSO.",
          expanded: true,
        },
        {
          title: "Can I use the components commercially?",
          content: "Yes. The code you install is yours to use in commercial products, per the library's MIT license.",
        },
        {
          title: "Does it work with my framework?",
          content: "Each component page lists the frameworks and versions the library documents support for.",
        },
      ]}
    />
  </div>
);

const AlertStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-xl">
    <Alert theme="success" title={sample.title ?? "Deployment complete"}>
      {sample.body ?? "The billing service shipped to production 4 minutes ago. Health checks are green across all regions."}
    </Alert>
  </div>
);

const ButtonStory: StoryRender = ({ sample }) => (
  <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-3">
    <Button>{sample.primaryLabel ?? "Start free trial"}</Button>
    <Button theme="outline">{sample.secondaryLabel ?? "View the docs"}</Button>
    <Button theme="flat" href="#pricing">
      See pricing
    </Button>
  </div>
);

const seatRows: string[][] = [
  ["Amara Koll", "Admin", "Active", "2 minutes ago"],
  ["Priya Raman", "Editor", "Active", "1 hour ago"],
  ["Jonas Weber", "Viewer", "Suspended", "3 days ago"],
  ["Lena Ortiz", "Editor", "Active", "Yesterday"],
  ["Tomas Lind", "Admin", "Active", "12 minutes ago"],
  ["Ines Adeyemi", "Editor", "Inactive", "2 weeks ago"],
  ["Marcus Webb", "Viewer", "Active", "4 hours ago"],
  ["Sofia Nilsson", "Editor", "Active", "Just now"],
  ["Hassan Karim", "Viewer", "Inactive", "Last month"],
  ["Grace Liu", "Admin", "Active", "30 minutes ago"],
  ["Diego Rojas", "Editor", "Suspended", "5 days ago"],
  ["Nadia Farouk", "Viewer", "Active", "Yesterday"],
];

const DataTableStory: StoryRender = ({ sample }) => (
  <div className="w-full">
    <DataTable
      headings={[
        { name: "Member", sortable: true, filterable: true },
        { name: "Role", sortable: true, toggleable: true },
        { name: "Status", sortable: true, filterable: true },
        "Last active",
      ]}
      data={seatRows}
      itemsPerPage={5}
      filterPlaceholder={sample.filterPlaceholder ?? "Search members"}
      showFilterIcon
      noResultsLabel="No members match this filter."
      columnToggleLabel="Columns"
      subText={sample.subText ?? "12 total seats"}
      pagination={{ showChevrons: true }}
    />
  </div>
);

export const storyRenders: Record<string, StoryRender> = {
  "webcoreui/Accordion": AccordionStory,
  "webcoreui/Alert": AlertStory,
  "webcoreui/Button": ButtonStory,
  "webcoreui/Data Table": DataTableStory,
};
