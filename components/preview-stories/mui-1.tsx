import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import AppBar from "@mui/material/AppBar";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme, styled, ThemeProvider, type Theme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import InboxIcon from "@mui/icons-material/Inbox";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MailIcon from "@mui/icons-material/Mail";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PrintIcon from "@mui/icons-material/Print";
import RemoveIcon from "@mui/icons-material/Remove";
import ShareIcon from "@mui/icons-material/Share";
import { Menu as BaseMenu, Menubar, NumberField } from "@base-ui/react";
import type { StoryRender } from "./type";

/**
 * Preview stories for MUI: each documented component rendered through the
 * real `@mui/material` API with realistic content on the preview canvas's
 * dark theme. Overlay components (menus, dialogs, drawers, tooltips,
 * snackbars) hold themselves open so a static screenshot captures the
 * interesting surface, not just the trigger. MUI's own theme is light, so
 * every render wraps itself in a dark `ThemeProvider`; no global CSS
 * baseline, because the canvas supplies the page.
 *
 * MUI documents three of these components as compositions rather than
 * package exports: "Number Field" (Base UI `NumberField` wired into MUI's
 * `FormControl`/`OutlinedInput` building blocks) and "Menubar" (Base UI
 * `Menubar` styled to Material Design), both exactly as the mui.com pages
 * describe, and "Transfer List" (composed from `List`, `Checkbox`, and
 * `Button`, which the page states outright).
 */

const darkTheme = createTheme({ palette: { mode: "dark" } });

/* --- Menubar building blocks: Base UI parts styled to Material Design. --- */

const MenubarBar = styled(Menubar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  width: "fit-content",
}));

const MenubarTrigger = styled(BaseMenu.Trigger)(({ theme }) => ({
  border: "none",
  background: "transparent",
  font: "inherit",
  color: theme.palette.text.primary,
  fontSize: theme.typography.button.fontSize,
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  "&:hover": { backgroundColor: theme.palette.action.hover },
}));

const MenubarPopup = styled(BaseMenu.Popup)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[8],
  padding: theme.spacing(1, 0),
  minWidth: 208,
}));

const MenubarItem = styled(BaseMenu.Item)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(3),
  padding: theme.spacing(1, 2),
  fontSize: theme.typography.body2.fontSize,
  cursor: "pointer",
  "&:hover": { backgroundColor: theme.palette.action.hover },
}));

const MenubarShortcut = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
}));

const MenubarSeparator = styled(BaseMenu.Separator)(({ theme }) => ({
  height: 1,
  backgroundColor: theme.palette.divider,
  margin: theme.spacing(1, 0),
  border: "none",
}));

/* --- Number Field building blocks: Base UI input inside MUI's outlined field. --- */

type NumberFieldInputAdapterProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ownerState?: unknown;
};

/**
 * InputBase renders non-host input slots through the styled `input`, passing
 * MUI internals alongside native input props; `NumberField.Input` takes only
 * native props, so the adapter drops the internals and forwards the rest.
 */
const NumberFieldInputAdapter = React.forwardRef<HTMLInputElement, NumberFieldInputAdapterProps>(
  function NumberFieldInputAdapter({ ownerState, value, defaultValue, ...inputProps }, ref) {
    return <NumberField.Input {...inputProps} ref={ref} />;
  },
);

const numberFieldStepStyles = ({ theme }: { theme: Theme }) => ({
  minWidth: 0,
  width: 28,
  height: 28,
  padding: 0,
  border: "none",
  borderRadius: 4,
  background: "transparent",
  color: theme.palette.action.hover,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": { backgroundColor: theme.palette.action.hover },
  "&:disabled": { color: theme.palette.action.disabled, cursor: "default" },
});

const NumberFieldDecrementButton = styled(NumberField.Decrement)(numberFieldStepStyles);
const NumberFieldIncrementButton = styled(NumberField.Increment)(numberFieldStepStyles);

/* --- Forced-open anchors for the Menu story. Popover resolves these lazily
   on the client and takes the container short-circuit on the server, so the
   static build never touches `document`. --- */

const menuAnchorId = "mui-menu-story-trigger";
const menuAnchor = () => (typeof document === "undefined" ? null : document.getElementById(menuAnchorId));
const menuContainer = () => document.body;

const AutocompleteStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Autocomplete
      open
      onClose={() => {}}
      options={["Northwind API", "Atlas redesign", "Beacon onboarding", "Juniper migration"]}
      defaultValue="Northwind API"
      sx={{ width: "100%", maxWidth: 320 }}
      renderInput={(params) => <TextField {...params} label={sample.label ?? "Project"} placeholder="Search projects" />}
    />
  </ThemeProvider>
);

const ButtonStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <Button variant="contained" size="large">
        {sample.primaryLabel ?? "Start free trial"}
      </Button>
      <Button variant="outlined" size="large">
        {sample.secondaryLabel ?? "View the docs"}
      </Button>
    </Box>
  </ThemeProvider>
);

const ButtonGroupStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <ButtonGroup variant="outlined" aria-label="date range">
      <Button>Day</Button>
      <Button>Week</Button>
      <Button>Month</Button>
    </ButtonGroup>
  </ThemeProvider>
);

const CheckboxStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Invoice paid" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Payment failed" />
      <FormControlLabel control={<Checkbox />} label="Weekly digest" />
    </FormGroup>
  </ThemeProvider>
);

const FabStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Fab variant="extended" color="primary" aria-label="create invoice">
      <AddIcon sx={{ mr: 1 }} />
      {sample.actionLabel ?? "New invoice"}
    </Fab>
  </ThemeProvider>
);

const NumberFieldStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <NumberField.Root id="seat-count" defaultValue={24} min={1} max={100}>
      <FormControl variant="outlined" size="small">
        <InputLabel htmlFor="seat-count" shrink>
          {sample.label ?? "Workspace seats"}
        </InputLabel>
        <OutlinedInput
          id="seat-count"
          label={sample.label ?? "Workspace seats"}
          inputComponent={NumberFieldInputAdapter}
          endAdornment={
            <InputAdornment position="end">
              <NumberFieldDecrementButton aria-label="decrease seats">
                <RemoveIcon fontSize="small" />
              </NumberFieldDecrementButton>
              <NumberFieldIncrementButton aria-label="increase seats">
                <AddIcon fontSize="small" />
              </NumberFieldIncrementButton>
            </InputAdornment>
          }
        />
        <FormHelperText>Enter a value between 1 and 100</FormHelperText>
      </FormControl>
    </NumberField.Root>
  </ThemeProvider>
);

const RadioGroupStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <FormControl>
      <FormLabel id="billing-plan-label">Billing plan</FormLabel>
      <RadioGroup aria-labelledby="billing-plan-label" defaultValue="annual" name="billing-plan">
        <FormControlLabel value="monthly" control={<Radio />} label="Monthly — $12 per seat" />
        <FormControlLabel value="annual" control={<Radio />} label="Annual — $120 per seat" />
        <FormControlLabel value="enterprise" control={<Radio />} label="Enterprise — custom pricing" />
      </RadioGroup>
    </FormControl>
  </ThemeProvider>
);

const RatingStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "grid", gap: 1, justifyItems: "center" }}>
      <Rating name="product-rating" defaultValue={4.5} precision={0.5} readOnly size="large" />
      <Typography variant="body2" color="textSecondary">
        {sample.caption ?? "4.5 average across 128 reviews"}
      </Typography>
    </Box>
  </ThemeProvider>
);

const SelectStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <FormControl size="small" sx={{ width: "100%", maxWidth: 320 }}>
      <InputLabel id="region-label">Region</InputLabel>
      <Select labelId="region-label" label="Region" defaultValue="fra" open onClose={() => {}}>
        <MenuItem value="fra">Europe (Frankfurt)</MenuItem>
        <MenuItem value="iad">US East (Virginia)</MenuItem>
        <MenuItem value="sin">Asia Pacific (Singapore)</MenuItem>
      </Select>
    </FormControl>
  </ThemeProvider>
);

const SliderStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ width: "100%", maxWidth: 320 }}>
      <Typography variant="body2" gutterBottom>
        Monthly ad budget
      </Typography>
      <Slider
        value={[2400]}
        onChange={() => {}}
        min={500}
        max={5000}
        step={100}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        aria-label="monthly ad budget"
      />
      <Typography variant="caption" color="textSecondary">
        $500 – $5,000 per month
      </Typography>
    </Box>
  </ThemeProvider>
);

const SwitchStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
      <FormControlLabel control={<Switch />} label="Auto-charge saved cards" />
    </FormGroup>
  </ThemeProvider>
);

const TextFieldStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "grid", gap: 2, width: "100%", maxWidth: 360 }}>
      <TextField
        label={sample.fieldLabel ?? "Work email"}
        defaultValue="nadia@northwind.io"
        type="email"
        helperText="Receipts are sent to this address."
        size="small"
      />
      <TextField label="Card number" defaultValue="4242 4242 4242" error helperText="Card number is incomplete." size="small" />
    </Box>
  </ThemeProvider>
);

const transferListLeft = ["Web traffic", "Product usage", "Support tickets", "Referral links"];
const transferListRight = ["Billing events", "Checkout sessions"];

const TransferListStory: StoryRender = () => {
  const list = (title: string, items: string[], label: string, checkedIndex: number) => (
    <Paper variant="outlined" sx={{ width: 216 }}>
      <List dense disablePadding component="div" aria-label={label}>
        <ListItem component="li" sx={{ pt: 0.5 }}>
          <ListItemText
            primary={title}
            slotProps={{ primary: { variant: "caption", color: "textSecondary" } }}
          />
        </ListItem>
        {items.map((name, index) => (
          <ListItem key={name} disablePadding component="div">
            <ListItemButton dense>
              <ListItemIcon sx={{ minWidth: 34 }}>
                <Checkbox edge="start" size="small" defaultChecked={index === checkedIndex} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, width: "100%", flexWrap: "wrap" }}>
        {list("Not synced", transferListLeft, "datasets not synced", 1)}
        <Box sx={{ display: "grid", gap: 1 }}>
          <Button size="small" variant="outlined" sx={{ minWidth: 0, px: 1 }} aria-label="move all right">
            <KeyboardDoubleArrowRightIcon fontSize="small" />
          </Button>
          <Button size="small" variant="outlined" sx={{ minWidth: 0, px: 1 }} aria-label="move selected right">
            <ChevronRightIcon fontSize="small" />
          </Button>
          <Button size="small" variant="outlined" sx={{ minWidth: 0, px: 1 }} aria-label="move selected left">
            <ChevronLeftIcon fontSize="small" />
          </Button>
          <Button size="small" variant="outlined" sx={{ minWidth: 0, px: 1 }} aria-label="move all left">
            <KeyboardDoubleArrowLeftIcon fontSize="small" />
          </Button>
        </Box>
        {list("Syncing nightly", transferListRight, "datasets syncing nightly", 0)}
      </Box>
    </ThemeProvider>
  );
};

const ToggleButtonStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <ToggleButtonGroup value="center" exclusive onChange={() => {}} aria-label="text alignment">
      <ToggleButton value="left" aria-label="align left">
        <FormatAlignLeftIcon />
      </ToggleButton>
      <ToggleButton value="center" aria-label="align center">
        <FormatAlignCenterIcon />
      </ToggleButton>
      <ToggleButton value="right" aria-label="align right">
        <FormatAlignRightIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  </ThemeProvider>
);

const AvatarStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>AK</Avatar>
      <Box>
        <Typography variant="subtitle2">{sample.name ?? "Amara Koll"}</Typography>
        <Typography variant="body2" color="textSecondary">
          Platform lead · joined March 2024
        </Typography>
      </Box>
    </Box>
  </ThemeProvider>
);

const BadgeStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton aria-label="inbox">
        <Badge badgeContent={4} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <Typography variant="body2" color="textSecondary">
        4 unread replies in support@northwind.io
      </Typography>
    </Box>
  </ThemeProvider>
);

const ChipStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      <Chip label={sample.chipLabel ?? "Net 30"} variant="outlined" />
      <Chip label="Paid" color="success" />
      <Chip label="Overdue" color="error" />
      <Chip label="Draft" />
    </Box>
  </ThemeProvider>
);

const DividerStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ width: "100%", maxWidth: 480 }}>
      <Typography variant="subtitle1">Northwind Billing</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="textSecondary">
        Invoices, receipts, and tax documents in one ledger.
      </Typography>
    </Box>
  </ThemeProvider>
);

const ListStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <List sx={{ width: "100%", maxWidth: 420 }} aria-label="workspace members">
      {[
        ["AK", "Amara Koll", "amara@northwind.io"],
        ["PR", "Priya Raman", "priya@northwind.io"],
        ["JL", "Jonas Lind", "jonas@northwind.io"],
      ].map(([initials, name, email]) => (
        <ListItem
          key={name}
          secondaryAction={
            <IconButton edge="end" aria-label={`more actions for ${name}`}>
              <MoreHorizIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>{initials}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={email} />
        </ListItem>
      ))}
    </List>
  </ThemeProvider>
);

const invoiceRows = [
  ["INV-1042", "Northwind Trading", "Oct 18", "$4,820", "Paid", "success"],
  ["INV-1041", "Harbor & Co.", "Oct 12", "$1,240", "Overdue", "error"],
  ["INV-1040", "Beacon Health", "Oct 9", "$3,110", "Pending", "warning"],
  ["INV-1039", "Juniper Labs", "Oct 4", "$980", "Paid", "success"],
] as const;

const TableStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <TableContainer component={Paper}>
      <Table size="small" aria-label="recent invoices">
        <TableHead>
          <TableRow>
            <TableCell>Invoice</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Due date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceRows.map(([invoice, customer, due, amount, status, color]) => (
            <TableRow key={invoice}>
              <TableCell>{invoice}</TableCell>
              <TableCell>{customer}</TableCell>
              <TableCell>{due}</TableCell>
              <TableCell align="right">{amount}</TableCell>
              <TableCell align="right">
                <Chip label={status} color={color} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </ThemeProvider>
);

const TooltipStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="subtitle1">May charges</Typography>
      <Tooltip open title="Charges cover the current billing period only." arrow placement="top">
        <IconButton size="small" aria-label="billing info">
          <InfoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  </ThemeProvider>
);

const TypographyStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "grid", gap: 1.5, width: "100%", maxWidth: 560 }}>
      <Typography variant="h3">{sample.headline ?? "Know what you're owed, the moment it's due."}</Typography>
      <Typography variant="body1" color="textSecondary">
        {sample.subhead ?? "Northwind Billing tracks every invoice, receipt, and tax document in one ledger."}
      </Typography>
    </Box>
  </ThemeProvider>
);

const AlertStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Alert
      severity="warning"
      sx={{ width: "100%", maxWidth: 560 }}
      action={
        <Button color="inherit" size="small">
          Update card
        </Button>
      }
    >
      <AlertTitle>{sample.title ?? "Payment method expiring"}</AlertTitle>
      Card ending in 4242 expires on Oct 31 — add a new card to keep invoices auto-charging.
    </Alert>
  </ThemeProvider>
);

const DialogStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Dialog open onClose={() => {}} aria-labelledby="invite-dialog-title" maxWidth="xs" fullWidth>
      <DialogTitle id="invite-dialog-title">Invite a teammate</DialogTitle>
      <DialogContent>
        <DialogContentText>They receive an email with a link to join the Northwind workspace.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Work email"
          type="email"
          fullWidth
          variant="outlined"
          defaultValue="priya@northwind.io"
        />
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained">Send invite</Button>
      </DialogActions>
    </Dialog>
  </ThemeProvider>
);

const CircularProgressStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <CircularProgress variant="determinate" value={68} size={48} thickness={4} />
      <Box>
        <Typography variant="body2">Compiling the October report</Typography>
        <Typography variant="body2" color="textSecondary">
          68% · 1,204 invoices processed
        </Typography>
      </Box>
    </Box>
  </ThemeProvider>
);

const LinearProgressStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ width: "100%", maxWidth: 420 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2">Uploading ledger</Typography>
        <Typography variant="body2" color="textSecondary">
          64%
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={64} />
    </Box>
  </ThemeProvider>
);

const SkeletonStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", width: "100%", maxWidth: 420 }}>
      <Skeleton variant="circular" width={48} height={48} animation={false} />
      <Box sx={{ flex: 1, display: "grid", gap: 1 }}>
        <Skeleton variant="text" width="50%" height={20} animation={false} />
        <Skeleton variant="text" width="75%" height={20} animation={false} />
      </Box>
    </Box>
  </ThemeProvider>
);

const SnackbarStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Snackbar
      open
      onClose={() => {}}
      message={sample.message ?? "Invoice #1042 sent to billing@northwind.io"}
      action={
        <React.Fragment>
          <Button color="primary" size="small">
            Undo
          </Button>
          <IconButton size="small" aria-label="close">
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  </ThemeProvider>
);

const AccordionStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ width: "100%", maxWidth: 560 }}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="billing-panel" id="billing-panel-header">
          <Typography component="span">{sample.question1 ?? "How does per-seat billing work?"}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="textSecondary">
            Each active teammate counts as one seat. Seats added mid-cycle are billed pro rata on your next invoice.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="cancel-panel" id="cancel-panel-header">
          <Typography component="span">Can I cancel at any time?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="textSecondary">
            Yes. Your workspace stays open until the end of the paid period, and exports remain available after.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="tax-panel" id="tax-panel-header">
          <Typography component="span">Do you handle sales tax?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="textSecondary">
            Tax is calculated per invoice from your customer's region and listed separately on every receipt.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  </ThemeProvider>
);

const AppBarStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {sample.title ?? "Northwind Billing"}
        </Typography>
        <Button color="inherit">Pricing</Button>
        <Button color="inherit">Docs</Button>
        <Button color="inherit">Sign in</Button>
      </Toolbar>
    </AppBar>
  </ThemeProvider>
);

const CardStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, width: "100%", maxWidth: 640 }}>
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {sample.title1 ?? "Monthly revenue"}
          </Typography>
          <Typography variant="h5">{sample.value1 ?? "$48,210"}</Typography>
          <Typography variant="body2" color="textSecondary">
            {sample.change1 ?? "+12.4% from September"}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {sample.title2 ?? "Outstanding invoices"}
          </Typography>
          <Typography variant="h5">{sample.value2 ?? "$9,180"}</Typography>
          <Typography variant="body2" color="textSecondary">
            {sample.change2 ?? "6 invoices awaiting payment"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </ThemeProvider>
);

const PaperStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: 360 }}>
      <Typography variant="h6">Tax details</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Northwind Trading · VAT GB-4471-22
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Button variant="contained" fullWidth>
        Download tax summary
      </Button>
    </Paper>
  </ThemeProvider>
);

const BottomNavigationStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ width: "100%" }}>
      <BottomNavigation showLabels value={0} onChange={() => {}}>
        <BottomNavigationAction label="Inbox" icon={<InboxIcon />} />
        <BottomNavigationAction label="Reports" icon={<AssessmentIcon />} />
        <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  </ThemeProvider>
);

const BreadcrumbsStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="#" underline="hover" color="inherit">
        Dashboard
      </Link>
      <Link href="#" underline="hover" color="inherit">
        Invoices
      </Link>
      <Typography color="textPrimary">INV-1042</Typography>
    </Breadcrumbs>
  </ThemeProvider>
);

const DrawerStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Drawer anchor="right" open onClose={() => {}}>
      <Box sx={{ width: 280, p: 2 }} role="presentation">
        <Typography variant="h6">Filters</Typography>
        <FormGroup sx={{ mt: 2 }}>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Overdue" />
          <FormControlLabel control={<Checkbox />} label="Draft" />
          <FormControlLabel control={<Checkbox />} label="Paid" />
        </FormGroup>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" fullWidth>
          Apply filters
        </Button>
      </Box>
    </Drawer>
  </ThemeProvider>
);

const LinkStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", alignItems: "center" }}>
      <Link href="#" underline="hover">
        Documentation
      </Link>
      <Link href="#" underline="hover">
        API reference
      </Link>
      <Link href="#" underline="always" variant="body2">
        System status
      </Link>
    </Box>
  </ThemeProvider>
);

const MenuStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <Button id={menuAnchorId} variant="outlined" endIcon={<ExpandMoreIcon />}>
        {sample.menuLabel ?? "Invoice actions"}
      </Button>
      <Menu open anchorEl={menuAnchor} container={menuContainer} onClose={() => {}}>
        <MenuItem>
          <ListItemIcon>
            <FileCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Duplicate invoice" secondary="Ctrl+D" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ArchiveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Archive invoice" />
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete invoice" />
        </MenuItem>
      </Menu>
    </Box>
  </ThemeProvider>
);

const MenubarStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ width: "100%" }}>
      <MenubarBar>
        <BaseMenu.Root open onOpenChange={() => {}}>
          <MenubarTrigger>{sample.menuLabel ?? "File"}</MenubarTrigger>
          <BaseMenu.Portal>
            <BaseMenu.Positioner sideOffset={6}>
              <MenubarPopup>
                <MenubarItem>
                  New invoice
                  <MenubarShortcut>Ctrl+N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Import from Stripe
                  <MenubarShortcut>Ctrl+I</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Export ledger</MenubarItem>
              </MenubarPopup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        </BaseMenu.Root>
        <BaseMenu.Root>
          <MenubarTrigger>Edit</MenubarTrigger>
          <BaseMenu.Portal>
            <BaseMenu.Positioner sideOffset={6}>
              <MenubarPopup>
                <MenubarItem>
                  Undo
                  <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo
                  <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Duplicate invoice</MenubarItem>
              </MenubarPopup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        </BaseMenu.Root>
        <BaseMenu.Root>
          <MenubarTrigger>View</MenubarTrigger>
          <BaseMenu.Portal>
            <BaseMenu.Positioner sideOffset={6}>
              <MenubarPopup>
                <MenubarItem>Invoices</MenubarItem>
                <MenubarItem>Reports</MenubarItem>
                <MenubarItem>Customers</MenubarItem>
              </MenubarPopup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        </BaseMenu.Root>
      </MenubarBar>
    </Box>
  </ThemeProvider>
);

const PaginationStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Pagination count={12} defaultPage={2} variant="outlined" color="primary" />
  </ThemeProvider>
);

const SpeedDialStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ position: "relative", width: "100%", height: 240 }}>
      <SpeedDial ariaLabel="invoice actions" open icon={<SpeedDialIcon />} sx={{ position: "absolute", bottom: 16, right: 16 }}>
        <SpeedDialAction icon={<EditIcon />} title="Edit invoice" />
        <SpeedDialAction icon={<PrintIcon />} title="Print invoice" />
        <SpeedDialAction icon={<ShareIcon />} title="Share invoice" />
      </SpeedDial>
    </Box>
  </ThemeProvider>
);

const StepperStory: StoryRender = () => (
  <ThemeProvider theme={darkTheme}>
    <Stepper activeStep={1} sx={{ width: "100%" }}>
      <Step>
        <StepLabel>Account details</StepLabel>
      </Step>
      <Step>
        <StepLabel>Billing information</StepLabel>
      </Step>
      <Step>
        <StepLabel>Review and confirm</StepLabel>
      </Step>
    </Stepper>
  </ThemeProvider>
);

const TabsStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ width: "100%" }}>
      <Tabs defaultValue={1} aria-label="analytics sections">
        <Tab label="Overview" value={0} />
        <Tab label={sample.tabLabel ?? "Revenue"} value={1} />
        <Tab label="Customers" value={2} />
      </Tabs>
      <Typography variant="body2" color="textSecondary" sx={{ pt: 2 }}>
        {sample.panelText ?? "Revenue grew 12% in September, led by annual renewals."}
      </Typography>
    </Box>
  </ThemeProvider>
);

const BoxStory: StoryRender = ({ sample }) => (
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, width: "100%" }}>
      <Box>
        <Typography variant="subtitle1">{sample.title ?? "Deployment pipeline"}</Typography>
        <Typography variant="body2" color="textSecondary">
          Last run 12 minutes ago · 3 checks passing
        </Typography>
      </Box>
      <Button variant="outlined">View runs</Button>
    </Box>
  </ThemeProvider>
);

export const storyRenders: Record<string, StoryRender> = {
  "mui/Autocomplete": AutocompleteStory,
  "mui/Button": ButtonStory,
  "mui/ButtonGroup": ButtonGroupStory,
  "mui/Checkbox": CheckboxStory,
  "mui/Fab": FabStory,
  "mui/Number Field": NumberFieldStory,
  "mui/RadioGroup": RadioGroupStory,
  "mui/Rating": RatingStory,
  "mui/Select": SelectStory,
  "mui/Slider": SliderStory,
  "mui/Switch": SwitchStory,
  "mui/TextField": TextFieldStory,
  "mui/Transfer List": TransferListStory,
  "mui/ToggleButton": ToggleButtonStory,
  "mui/Avatar": AvatarStory,
  "mui/Badge": BadgeStory,
  "mui/Chip": ChipStory,
  "mui/Divider": DividerStory,
  "mui/List": ListStory,
  "mui/Table": TableStory,
  "mui/Tooltip": TooltipStory,
  "mui/Typography": TypographyStory,
  "mui/Alert": AlertStory,
  "mui/Dialog": DialogStory,
  "mui/CircularProgress": CircularProgressStory,
  "mui/LinearProgress": LinearProgressStory,
  "mui/Skeleton": SkeletonStory,
  "mui/Snackbar": SnackbarStory,
  "mui/Accordion": AccordionStory,
  "mui/AppBar": AppBarStory,
  "mui/Card": CardStory,
  "mui/Paper": PaperStory,
  "mui/BottomNavigation": BottomNavigationStory,
  "mui/Breadcrumbs": BreadcrumbsStory,
  "mui/Drawer": DrawerStory,
  "mui/Link": LinkStory,
  "mui/Menu": MenuStory,
  "mui/Menubar": MenubarStory,
  "mui/Pagination": PaginationStory,
  "mui/SpeedDial": SpeedDialStory,
  "mui/Stepper": StepperStory,
  "mui/Tabs": TabsStory,
  "mui/Box": BoxStory,
};
