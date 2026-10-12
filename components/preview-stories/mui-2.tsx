import * as React from "react";
import { Global } from "@emotion/react";
import {
  Avatar,
  AvatarGroup,
  Backdrop,
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  Container,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Grow,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MobileStepper,
  Modal,
  NativeSelect,
  NoSsr,
  Paper,
  Popover,
  Popper,
  Portal,
  Radio,
  Slide,
  Stack,
  SvgIcon,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Zoom,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import StarBorder from "@mui/icons-material/StarBorder";
import {
  Masonry,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import type { StoryRender } from "./type";

/**
 * Preview stories for MUI: the components `@mui/material` documents, rendered
 * with realistic content. The preview canvas is true-black, so every render
 * sits in MUI's dark palette to stay legible. Sample strings replace display
 * text where a caller labels the render.
 */

const darkTheme = createTheme({ palette: { mode: "dark" } });

/**
 * The `Icon` component renders icon-font ligatures, and MUI documents loading
 * the Material Icons font next to the component. The preview canvas forbids
 * stylesheet imports, so the font's own setup CSS rides in through emotion.
 */
const materialIconsFont = `
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v145/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
`;

/**
 * Self-contained SVG thumbnails: gallery scenes need imagery, and data URIs
 * render offline where remote photos would not.
 */
function galleryThumb(from: string, to: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="320" height="200" fill="url(#g)"/><circle cx="252" cy="56" r="26" fill="#ffffff" fill-opacity="0.35"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Popover needs a live anchor element, and story renders are plain functions
 * (no hooks allowed), so the anchored overlay lives in its own component.
 */
function PopoverAnchorDemo({ triggerLabel, heading, options }: { triggerLabel: string; heading: string; options: string[] }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Button variant="outlined" ref={setAnchorEl}>
        {triggerLabel}
      </Button>
      <Popover
        open={anchorEl !== null}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => {}}
        slotProps={{ paper: { sx: { p: 2.5, minWidth: 230 } } }}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle2">{heading}</Typography>
          {options.map((option) => (
            <Typography key={option} variant="body2" color="text.secondary">
              {option}
            </Typography>
          ))}
        </Stack>
      </Popover>
    </Stack>
  );
}

/** Same anchor constraint as Popover: Popper positions against a real element. */
function PopperAnchorDemo({ triggerLabel, heading, note }: { triggerLabel: string; heading: string; note: string }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <Button variant="text" ref={setAnchorEl}>
        {triggerLabel}
      </Button>
      <Popper open={anchorEl !== null} anchorEl={anchorEl} placement="bottom-start">
        <Paper sx={{ p: 2, maxWidth: 280 }}>
          <Typography variant="subtitle2">{heading}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {note}
          </Typography>
        </Paper>
      </Popper>
    </Stack>
  );
}

const ContainerStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Container maxWidth="md">
      <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {sample.title ?? "Analytics your whole team can actually read"}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
          {sample.body ??
            "Meridian turns warehouse tables into dashboards, so support, sales, and finance all read the same numbers."}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">{sample.primaryLabel ?? "Start free trial"}</Button>
          <Button variant="outlined">{sample.secondaryLabel ?? "Book a demo"}</Button>
        </Stack>
      </Stack>
    </Container>
  </ThemeProvider>
);

const GridStory: StoryRender = ({ sample }) => {
  const stats: Array<[string, string, string]> = [
    [sample.title1 ?? "Monthly revenue", sample.value1 ?? "$48,210", "+12.4% vs. February"],
    [sample.title2 ?? "Active workspaces", sample.value2 ?? "1,284", "+38 this week"],
    ["Net churn", "1.8%", "-0.4 pts vs. February"],
    ["Support backlog", "12", "4 marked urgent"],
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container spacing={2}>
        {stats.map(([title, value, detail]) => (
          <Grid key={title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
                {value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {detail}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

const StackStory: StoryRender = ({ sample }) => {
  const steps: Array<[string, string]> = [
    [sample.step1 ?? "Migrate billing service to the new tax engine", "Shipped"],
    [sample.step2 ?? "Backfill 2025 invoices", "Shipped"],
    ["Flip the dashboard to live tax rates", "In review"],
    ["Send customers the change notice", "Queued"],
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={2} divider={<Divider flexItem />} sx={{ maxWidth: 460 }}>
        <Typography variant="subtitle1">{sample.title ?? "Release checklist — March billing"}</Typography>
        {steps.map(([step, status]) => (
          <Stack key={step} direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
            <Typography variant="body2">{step}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
              {status}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </ThemeProvider>
  );
};

const ImageListStory: StoryRender = ({ sample }) => {
  const assets: Array<{ src: string; title: string; meta: string }> = [
    { src: galleryThumb("#5b6cff", "#12b8a6"), title: sample.title1 ?? "Spring lookbook hero", meta: "1200 × 628 · PNG" },
    { src: galleryThumb("#e8603c", "#f5b342"), title: "Pour-over guide cover", meta: "1080 × 1080 · JPG" },
    { src: galleryThumb("#2f9e63", "#a8e063"), title: "Roastery tour still", meta: "1600 × 900 · JPG" },
    { src: galleryThumb("#7a4fd6", "#d666c2"), title: "Subscription promo frame", meta: "1200 × 628 · PNG" },
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <ImageList cols={3} gap={8} rowHeight={150} sx={{ maxWidth: 640 }}>
        {assets.map((asset) => (
          <ImageListItem key={asset.title}>
            <img src={asset.src} alt={asset.title} loading="lazy" />
            <ImageListItemBar
              title={asset.title}
              subtitle={asset.meta}
              actionIcon={
                <IconButton aria-label={`Star ${asset.title}`} sx={{ color: "#fff" }}>
                  <StarBorder />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </ThemeProvider>
  );
};

const BackdropStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Paper sx={{ p: 3, maxWidth: 480 }}>
      <Typography variant="subtitle1">{sample.title ?? "March close — Keystone Coffee"}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Revenue $82,400 · 214 invoices · 2 disputes open.
      </Typography>
    </Paper>
    <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="subtitle1">{sample.overlayLabel ?? "Reconciling payments…"}</Typography>
        <Typography variant="body2" color="grey.300">
          3 of 7 accounts done. This usually takes a minute.
        </Typography>
      </Stack>
    </Backdrop>
  </ThemeProvider>
);

const ClickAwayListenerStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <ClickAwayListener onClickAway={() => {}}>
      <Paper sx={{ p: 2.5, maxWidth: 320 }}>
        <Typography variant="subtitle2">{sample.title ?? "Filter invoices"}</Typography>
        <Stack spacing={0.75} sx={{ mt: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            Status: Open
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Assignee: Priya Raman
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Label: billing
          </Typography>
        </Stack>
        <Button size="small" variant="contained" sx={{ mt: 2 }}>
          Apply filters
        </Button>
      </Paper>
    </ClickAwayListener>
  </ThemeProvider>
);

const ModalStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Modal open onClose={() => {}} aria-labelledby="modal-story-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography id="modal-story-title" variant="h6">
          {sample.title ?? "Archive “Kepler migration”?"}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.5 }}>
          Deployments stay online, but the project disappears from dashboards and reports.
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end", mt: 3 }}>
          <Button>Cancel</Button>
          <Button variant="contained">{sample.actionLabel ?? "Archive project"}</Button>
        </Stack>
      </Box>
    </Modal>
  </ThemeProvider>
);

const NoSsrStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Paper sx={{ p: 2.5, maxWidth: 460 }}>
      <Typography variant="subtitle1">{sample.title ?? "Deploy pipeline — meridian-web"}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Last build finished 4 minutes ago.
      </Typography>
      <Divider sx={{ my: 1.5 }} />
      <NoSsr fallback={<Typography variant="body2" color="text.secondary">Waiting for the client session…</Typography>}>
        <Typography variant="body2" color="text.secondary">
          Live: 12 preview builds queued, 3 running.
        </Typography>
      </NoSsr>
    </Paper>
  </ThemeProvider>
);

const PopoverStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <PopoverAnchorDemo
      triggerLabel={sample.triggerLabel ?? "Filter: Paid"}
      heading="Show invoices that are"
      options={["Paid in full", "Open, within terms", "Overdue by 30+ days"]}
    />
  </ThemeProvider>
);

const PopperStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <PopperAnchorDemo
      triggerLabel={sample.triggerLabel ?? "Processing time"}
      heading="Processing time"
      note="Median across the last 30 days of invoice runs, measured after tax calculation."
    />
  </ThemeProvider>
);

const PortalStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Stack spacing={1} sx={{ maxWidth: 420 }}>
      <Typography variant="subtitle1">{sample.title ?? "Export — March invoices"}</Typography>
      <Typography variant="body2" color="text.secondary">
        The file lands in your downloads once the server finishes packing it.
      </Typography>
    </Stack>
    <Portal>
      <Paper sx={{ position: "fixed", bottom: 24, right: 24, width: 300, p: 2 }}>
        <Typography variant="subtitle2">{sample.noticeTitle ?? "Export ready"}</Typography>
        <Typography variant="body2" color="text.secondary">
          meridian-invoices-march.csv · 2.4 MB
        </Typography>
      </Paper>
    </Portal>
  </ThemeProvider>
);

const TextareaAutosizeStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Stack spacing={1} sx={{ maxWidth: 480 }}>
      <Typography component="label" htmlFor="textarea-story-notes" variant="subtitle2">
        Release notes
      </Typography>
      <TextareaAutosize
        id="textarea-story-notes"
        minRows={3}
        maxRows={6}
        defaultValue={
          sample.text ??
          "Rolled out the new billing portal to all workspaces. Legacy invoice layouts keep working until April 30."
        }
        style={{
          fontFamily: "inherit",
          fontSize: 14,
          lineHeight: 1.6,
          padding: "10px 12px",
          color: "#fff",
          background: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.23)",
          borderRadius: 4,
        }}
      />
    </Stack>
  </ThemeProvider>
);

const MasonryStory: StoryRender = ({ sample }) => {
  const cards: Array<{ title: string; body: string }> = [
    {
      title: sample.title1 ?? "Cutwater ships twice as fast",
      body: "How a 12-person agency moved client reporting into shared previews.",
    },
    {
      title: "Design tokens that survive a rebrand",
      body: "Kestrel Studio swapped its palette in an afternoon because every component read from one theme. Here is the setup they kept, and the two mistakes they made along the way.",
    },
    {
      title: "Why we rebuilt the component gallery",
      body: "The old gallery showed components in isolation, which is exactly how they never appear in a product.",
    },
    {
      title: "Field notes: reviewing UI without screenshots",
      body: "Static screenshots go stale the moment someone pushes a commit. Live previews in review threads fixed that for our team, and changed who we ask for feedback.",
    },
    {
      title: "Lumen Design Co. migrated in a weekend",
      body: "Two designers, one sprint, zero downtime.",
    },
    {
      title: "The cost of a broken preview pipeline",
      body: "We tracked every stale screenshot back to the build step that produced it.",
    },
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <Masonry columns={3} spacing={2} sx={{ maxWidth: 640 }}>
        {cards.map((card) => (
          <Paper key={card.title} sx={{ p: 2 }}>
            <Typography variant="subtitle2">{card.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {card.body}
            </Typography>
          </Paper>
        ))}
      </Masonry>
    </ThemeProvider>
  );
};

const TimelineStory: StoryRender = ({ sample }) => {
  const events: Array<{ time: string; text: string; color: "warning" | "primary" | "success" | "grey" }> = [
    { time: "09:12", text: sample.event1 ?? "Latency on the API gateway crossed 400 ms", color: "warning" },
    { time: "09:26", text: "Rolled back release 2.4.1 to the previous build", color: "primary" },
    { time: "09:41", text: "Latency settled under 100 ms across all regions", color: "success" },
    { time: "10:05", text: "Postmortem published to the incident channel", color: "grey" },
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={1.5} sx={{ maxWidth: 560 }}>
        <Typography variant="subtitle1">{sample.title ?? "Incident — API gateway, March 12"}</Typography>
        <Timeline sx={{ p: 0 }}>
          {events.map((event, index) => (
            <TimelineItem key={event.time}>
              <TimelineOppositeContent color="text.secondary" sx={{ flex: 0.25 }}>
                {event.time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={event.color} />
                {index < events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>{event.text}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Stack>
    </ThemeProvider>
  );
};

const IconStory: StoryRender = ({ sample }) => {
  const features: Array<[string, string]> = [
    ["bolt", sample.feature1 ?? "Warehouse syncs land in under a second"],
    ["groups", "Unlimited viewers on every plan"],
    ["verified", "SOC 2 Type II, audited this January"],
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <Global styles={materialIconsFont} />
      <Stack spacing={2.5} sx={{ maxWidth: 520 }}>
        {features.map(([iconName, text]) => (
          <Stack key={iconName} direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Icon color="primary" fontSize="large">
              {iconName}
            </Icon>
            <Typography variant="body1">{text}</Typography>
          </Stack>
        ))}
      </Stack>
    </ThemeProvider>
  );
};

const SvgIconStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Stack spacing={2} sx={{ maxWidth: 420 }}>
      <Typography variant="subtitle1">{sample.title ?? "Health — production API"}</Typography>
      <Stack direction="row" spacing={3}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <SvgIcon titleAccess="Latency" viewBox="0 0 24 24">
            <path d="M3 12h3l2-6 3 12 2-6h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          </SvgIcon>
          <Typography variant="body2" color="text.secondary">
            Latency 82 ms
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <SvgIcon titleAccess="Uptime" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" />
          </SvgIcon>
          <Typography variant="body2" color="text.secondary">
            Uptime 99.98%
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <SvgIcon titleAccess="Errors" viewBox="0 0 24 24">
            <path d="M12 3l9 9-9 9-9-9z" />
          </SvgIcon>
          <Typography variant="body2" color="text.secondary">
            Errors 3
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  </ThemeProvider>
);

const CollapseStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Stack spacing={1} sx={{ maxWidth: 520 }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
        <Typography variant="subtitle2">{sample.title ?? "INV-2041 · Keystone Coffee"}</Typography>
        <Typography variant="subtitle2">$1,280.00</Typography>
      </Stack>
      <Collapse in>
        <Stack spacing={0.75} sx={{ pt: 1.5 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Platform seat · Growth plan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $1,140.00
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Extra seats × 2
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $140.00
            </Typography>
          </Stack>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body2">Due April 14 · Net 30</Typography>
        </Stack>
      </Collapse>
    </Stack>
  </ThemeProvider>
);

const FadeStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Fade in>
      <Paper sx={{ p: 2.5, maxWidth: 420 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>PR</Avatar>
          <Stack>
            <Typography variant="subtitle2">{sample.author ?? "Priya Raman"}</Typography>
            <Typography variant="body2" color="text.secondary">
              {sample.comment ?? "Renamed the forecast tab to “Runway” — it matches what finance calls it."}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Fade>
  </ThemeProvider>
);

const GrowStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Grow in>
      <Paper sx={{ p: 2.5, maxWidth: 420 }} variant="outlined">
        <Typography variant="subtitle2">{sample.title ?? "Runway needs attention"}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Cash covers 8 months at March burn. Annual renewals in May add roughly 3 more.
        </Typography>
      </Paper>
    </Grow>
  </ThemeProvider>
);

const SlideStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Slide direction="down" in>
      <Paper square sx={{ p: 1.5, display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
        <Typography variant="body2">{sample.message ?? "Meridian 2.4 is live — scheduled reports now land in Slack."}</Typography>
        <Button size="small">Read the changelog</Button>
      </Paper>
    </Slide>
  </ThemeProvider>
);

const ZoomStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Zoom in>
      <Paper sx={{ p: 2.5, maxWidth: 320 }}>
        <Typography variant="subtitle2">{sample.title ?? "Team workspaces are here"}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Shared dashboards, one bill, roles per workspace.
        </Typography>
      </Paper>
    </Zoom>
  </ThemeProvider>
);

const IconButtonStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pl: 2.5, pr: 1, py: 1, maxWidth: 520 }}>
      <Stack>
        <Typography variant="subtitle2">{sample.title ?? "INV-2041 · Keystone Coffee"}</Typography>
        <Typography variant="body2" color="text.secondary">
          $1,280.00 · due April 14
        </Typography>
      </Stack>
      <Stack direction="row">
        <IconButton aria-label="Edit invoice">
          <EditOutlined />
        </IconButton>
        <IconButton aria-label="Download invoice">
          <FileDownloadOutlined />
        </IconButton>
        <IconButton aria-label="Delete invoice" edge="end" color="error">
          <DeleteOutlined />
        </IconButton>
      </Stack>
    </Paper>
  </ThemeProvider>
);

const NativeSelectStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <FormControl sx={{ minWidth: 260 }}>
      <InputLabel variant="standard" htmlFor="native-select-story-cycle">
        {sample.label ?? "Billing cycle"}
      </InputLabel>
      <NativeSelect defaultValue="annual" inputProps={{ name: "billing-cycle", id: "native-select-story-cycle" }}>
        <option value="monthly">Monthly — $12 per seat</option>
        <option value="annual">Annual — $120 per seat</option>
        <option value="two-year">Two years — $216 per seat</option>
      </NativeSelect>
    </FormControl>
  </ThemeProvider>
);

const RadioStory: StoryRender = ({ sample }) => {
  const plans: Array<[string, string, boolean]> = [
    ["starter", sample.option1 ?? "Starter — $0 for 2 seats", false],
    ["growth", sample.option2 ?? "Growth — $12 per seat", true],
    ["scale", "Scale — custom contract", false],
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Plan for Atlas Studio</FormLabel>
        <Stack spacing={1} sx={{ mt: 1 }}>
          {plans.map(([value, label, selected]) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio checked={selected} onChange={() => {}} />}
              label={label}
            />
          ))}
        </Stack>
      </FormControl>
    </ThemeProvider>
  );
};

const ToggleButtonGroupStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Stack spacing={1.5} sx={{ maxWidth: 360 }}>
      <Typography variant="subtitle2">{sample.title ?? "Revenue"}</Typography>
      <ToggleButtonGroup exclusive value="week" onChange={() => {}} aria-label="Date range" size="small">
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
        <ToggleButton value="quarter">Quarter</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  </ThemeProvider>
);

const AvatarGroupStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <AvatarGroup max={4}>
        <Avatar sx={{ bgcolor: "#5b6cff" }}>AK</Avatar>
        <Avatar sx={{ bgcolor: "#12b8a6" }}>DR</Avatar>
        <Avatar sx={{ bgcolor: "#e8603c" }}>PR</Avatar>
        <Avatar sx={{ bgcolor: "#7a4fd6" }}>JL</Avatar>
        <Avatar sx={{ bgcolor: "#2f9e63" }}>MC</Avatar>
      </AvatarGroup>
      <Typography variant="body2" color="text.secondary">
        {sample.caption ?? "5 reviewers on “Atlas redesign”"}
      </Typography>
    </Stack>
  </ThemeProvider>
);

const SwipeableDrawerStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Stack spacing={1} sx={{ pl: 32, maxWidth: 640 }}>
      <Typography variant="h6">{sample.pageTitle ?? "Atlas redesign"}</Typography>
      <Typography variant="body2" color="text.secondary">
        12 open tasks · last activity 2 hours ago.
      </Typography>
    </Stack>
    <SwipeableDrawer anchor="left" open onOpen={() => {}} onClose={() => {}} disableSwipeToOpen>
      <Box sx={{ width: 280, pt: 1 }}>
        <List>
          {["Overview", "Tasks", "Designs", "Deployments", "Billing"].map((item, index) => (
            <ListItemButton key={item} selected={index === 1}>
              <ListItemText primary={index === 1 ? (sample.navItem ?? item) : item} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  </ThemeProvider>
);

const MobileStepperStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ maxWidth: 420, width: "100%" }}>
      <Typography variant="subtitle1">{sample.title ?? "Connect your data warehouse"}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
        Step 2 of 4 — Meridian reads from Snowflake, BigQuery, or Postgres.
      </Typography>
      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={1}
        sx={{ maxWidth: 420, flexGrow: 1 }}
        nextButton={
          <Button size="small">
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small">
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  </ThemeProvider>
);

const TablePaginationStory: StoryRender = ({ sample }) => {
  const rows: Array<[string, string, string]> = [
    [sample.row1 ?? "INV-2041", "Keystone Coffee", "$1,280.00"],
    ["INV-2042", "Northwind Roastery", "$640.00"],
    ["INV-2043", "Atlas Studio", "$2,150.00"],
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ maxWidth: 640 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Invoice</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(([invoice, customer, amount]) => (
              <TableRow key={invoice}>
                <TableCell>{invoice}</TableCell>
                <TableCell>{customer}</TableCell>
                <TableCell align="right">{amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                rowsPerPageOptions={[5, 10, 25]}
                count={24}
                rowsPerPage={10}
                page={1}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

const DataGridStory: StoryRender = ({ sample }) => {
  interface InvoiceRow {
    id: number;
    invoice: string;
    customer: string;
    due: string;
    amount: string;
    status: string;
  }
  const rows: InvoiceRow[] = [
    { id: 1, invoice: sample.row1 ?? "INV-2041", customer: "Keystone Coffee", due: "Apr 14, 2026", amount: "$1,280.00", status: "Open" },
    { id: 2, invoice: "INV-2042", customer: "Northwind Roastery", due: "Apr 16, 2026", amount: "$640.00", status: "Paid" },
    { id: 3, invoice: "INV-2043", customer: "Atlas Studio", due: "Apr 18, 2026", amount: "$2,150.00", status: "Open" },
    { id: 4, invoice: "INV-2044", customer: "Harbor Fitness", due: "Apr 22, 2026", amount: "$890.00", status: "Overdue" },
    { id: 5, invoice: "INV-2045", customer: "Lumen Design Co.", due: "Apr 30, 2026", amount: "$3,200.00", status: "Paid" },
  ];
  const columns: GridColDef<InvoiceRow>[] = [
    { field: "invoice", headerName: sample.col1 ?? "Invoice", width: 110 },
    { field: "customer", headerName: "Customer", width: 170 },
    { field: "due", headerName: "Due", width: 120 },
    { field: "amount", headerName: "Amount", width: 110, align: "right", headerAlign: "right" },
    { field: "status", headerName: "Status", width: 100 },
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: "100%", maxWidth: 720 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
    </ThemeProvider>
  );
};

/**
 * The X date/time pickers are the Community (MIT) `@mui/x-date-pickers`
 * components, each wrapped in the documented date-fns adapter. Picker popovers
 * hold `open` so static screenshots capture the calendar and clock surfaces.
 */
const DatePickerStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1} sx={{ maxWidth: 320 }}>
        <Typography variant="subtitle2">{sample.title ?? "Create project"}</Typography>
        <DatePicker
          label={sample.label ?? "Kickoff date"}
          defaultValue={new Date(2026, 2, 14)}
          open
          onOpen={() => {}}
          onClose={() => {}}
        />
      </Stack>
    </LocalizationProvider>
  </ThemeProvider>
);

const DateFieldStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1} sx={{ maxWidth: 320 }}>
        <Typography variant="subtitle2">{sample.title ?? "Invoice INV-2041"}</Typography>
        <DateField label={sample.label ?? "Due date"} defaultValue={new Date(2026, 3, 14)} />
      </Stack>
    </LocalizationProvider>
  </ThemeProvider>
);

const DateCalendarStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1}>
        <Typography variant="subtitle2">{sample.title ?? "Choose a delivery date"}</Typography>
        <DateCalendar defaultValue={new Date(2026, 2, 14)} />
      </Stack>
    </LocalizationProvider>
  </ThemeProvider>
);

const TimePickerStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1} sx={{ maxWidth: 320 }}>
        <Typography variant="subtitle2">{sample.title ?? "Team rituals"}</Typography>
        <TimePicker
          label={sample.label ?? "Daily standup"}
          defaultValue={new Date(2026, 2, 14, 9, 30)}
          open
          onOpen={() => {}}
          onClose={() => {}}
        />
      </Stack>
    </LocalizationProvider>
  </ThemeProvider>
);

const TimeFieldStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1} sx={{ maxWidth: 320 }}>
        <Typography variant="subtitle2">{sample.title ?? "Digest settings"}</Typography>
        <TimeField label={sample.label ?? "Send at"} defaultValue={new Date(2026, 2, 14, 9, 30)} />
      </Stack>
    </LocalizationProvider>
  </ThemeProvider>
);

const TimeClockStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1}>
        <Typography variant="subtitle2">{sample.title ?? "Pick a call time"}</Typography>
        <TimeClock defaultValue={new Date(2026, 2, 14, 9, 30)} />
      </Stack>
    </LocalizationProvider>
  </ThemeProvider>
);

const DigitalClockStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1}>
        <Typography variant="subtitle2">{sample.title ?? "Pick a slot — Thursday"}</Typography>
        <DigitalClock defaultValue={new Date(2026, 2, 14, 9, 30)} timeStep={30} />
      </Stack>
    </LocalizationProvider>
  </ThemeProvider>
);

const DateTimePickerStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1} sx={{ maxWidth: 320 }}>
        <Typography variant="subtitle2">{sample.title ?? "Scheduled report — Revenue by region"}</Typography>
        <DateTimePicker
          label={sample.label ?? "Runs at"}
          defaultValue={new Date(2026, 2, 14, 9, 30)}
          open
          onOpen={() => {}}
          onClose={() => {}}
        />
      </Stack>
    </LocalizationProvider>
  </ThemeProvider>
);

const DateTimeFieldStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1} sx={{ maxWidth: 320 }}>
        <Typography variant="subtitle2">{sample.title ?? "Deploy window — release 2.4"}</Typography>
        <DateTimeField label={sample.label ?? "Opens"} defaultValue={new Date(2026, 2, 14, 9, 30)} />
      </Stack>
    </LocalizationProvider>
  </ThemeProvider>
);

export const storyRenders: Record<string, StoryRender> = {
  "mui/Container": ContainerStory,
  "mui/Grid": GridStory,
  "mui/Stack": StackStory,
  "mui/ImageList": ImageListStory,
  "mui/Backdrop": BackdropStory,
  "mui/ClickAwayListener": ClickAwayListenerStory,
  "mui/Modal": ModalStory,
  "mui/NoSsr": NoSsrStory,
  "mui/Popover": PopoverStory,
  "mui/Popper": PopperStory,
  "mui/Portal": PortalStory,
  "mui/TextareaAutosize": TextareaAutosizeStory,
  "mui/Masonry": MasonryStory,
  "mui/Timeline": TimelineStory,
  "mui/Icon": IconStory,
  "mui/SvgIcon": SvgIconStory,
  "mui/Collapse": CollapseStory,
  "mui/Fade": FadeStory,
  "mui/Grow": GrowStory,
  "mui/Slide": SlideStory,
  "mui/Zoom": ZoomStory,
  "mui/IconButton": IconButtonStory,
  "mui/NativeSelect": NativeSelectStory,
  "mui/Radio": RadioStory,
  "mui/ToggleButtonGroup": ToggleButtonGroupStory,
  "mui/AvatarGroup": AvatarGroupStory,
  "mui/SwipeableDrawer": SwipeableDrawerStory,
  "mui/MobileStepper": MobileStepperStory,
  "mui/TablePagination": TablePaginationStory,
  "mui/DataGrid": DataGridStory,
  "mui/DatePicker": DatePickerStory,
  "mui/DateField": DateFieldStory,
  "mui/DateCalendar": DateCalendarStory,
  "mui/TimePicker": TimePickerStory,
  "mui/TimeField": TimeFieldStory,
  "mui/TimeClock": TimeClockStory,
  "mui/DigitalClock": DigitalClockStory,
  "mui/DateTimePicker": DateTimePickerStory,
  "mui/DateTimeField": DateTimeFieldStory,
};
