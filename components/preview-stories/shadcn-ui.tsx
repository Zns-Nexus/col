import * as React from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { StoryRender } from "./type";

/**
 * Preview stories for shadcn/ui: the very component code the library
 * documents, as it ships in this app's `components/ui`, rendered with
 * realistic content. Sample strings replace the display text where a caller
 * labels the render.
 */

const ButtonStory: StoryRender = ({ sample }) => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Button size="lg">{sample.primaryLabel ?? "Start free trial"}</Button>
    <Button size="lg" variant="outline">
      {sample.secondaryLabel ?? "View the docs"}
    </Button>
  </div>
);

const CardStory: StoryRender = ({ sample }) => (
  <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>{sample.title1 ?? "Monthly revenue"}</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{sample.value1 ?? "$48,210"}</p>
        <p className="text-sm text-muted-foreground">{sample.change1 ?? "+12.4% from the previous period"}</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>{sample.title2 ?? "Active subscriptions"}</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{sample.value2 ?? "1,284"}</p>
        <p className="text-sm text-muted-foreground">{sample.change2 ?? "+3.1% from the previous period"}</p>
      </CardContent>
    </Card>
  </div>
);

const BadgeStory: StoryRender = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge>New</Badge>
    <Badge variant="secondary">Beta</Badge>
    <Badge variant="destructive">Deprecated</Badge>
    <Badge variant="outline">v2.4</Badge>
  </div>
);

const CheckboxStory: StoryRender = () => (
  <div className="grid gap-4">
    {["Email digests", "Product updates", "Security alerts"].map((label, index) => (
      <label key={label} className="flex items-center gap-3 text-sm">
        <Checkbox defaultChecked={index < 2} />
        {label}
      </label>
    ))}
  </div>
);

const DropdownMenuStory: StoryRender = () => (
  <DropdownMenu defaultOpen>
    <DropdownMenuTrigger className="rounded-md border border-border px-4 py-2 text-sm">Options</DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent className="min-w-[160px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
        <DropdownMenuItem className="rounded-sm px-2 py-1.5 text-sm">Duplicate</DropdownMenuItem>
        <DropdownMenuItem className="rounded-sm px-2 py-1.5 text-sm">Archive</DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 h-px bg-border" />
        <DropdownMenuItem className="rounded-sm px-2 py-1.5 text-sm text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenu>
);

const InputStory: StoryRender = () => (
  <div className="grid w-full max-w-sm gap-2">
    <label htmlFor="input-story-email" className="text-sm font-medium">
      Email address
    </label>
    <Input id="input-story-email" type="email" placeholder="you@example.com" />
  </div>
);

const SeparatorStory: StoryRender = () => (
  <div className="w-full max-w-md">
    <p className="text-sm font-medium">Col</p>
    <Separator className="my-4" />
    <p className="text-sm text-muted-foreground">Find the right UI library without the open tabs.</p>
  </div>
);

const SheetStory: StoryRender = () => (
  <Sheet defaultOpen>
    <SheetTrigger className="rounded-md border border-border px-4 py-2 text-sm">Open settings</SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Notification settings</SheetTitle>
        <SheetDescription>Choose what this workspace sends you.</SheetDescription>
      </SheetHeader>
      <div className="grid gap-3 px-4 text-sm">
        <p className="text-muted-foreground">Deployment alerts</p>
        <p className="text-muted-foreground">Weekly summaries</p>
      </div>
    </SheetContent>
  </Sheet>
);

const SkeletonStory: StoryRender = () => (
  <div className="flex w-full max-w-md items-center gap-4">
    <Skeleton className="size-12 rounded-full" />
    <div className="grid flex-1 gap-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const TabsStory: StoryRender = () => (
  <Tabs defaultValue="overview" className="w-full max-w-md">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="analytics">Analytics</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" className="pt-4 text-sm text-muted-foreground">
      Traffic grew 18% this week, led by the pricing page.
    </TabsContent>
    <TabsContent value="analytics" className="pt-4 text-sm text-muted-foreground">
      4,210 sessions across 2,900 visitors.
    </TabsContent>
    <TabsContent value="settings" className="pt-4 text-sm text-muted-foreground">
      Workspace defaults and member permissions.
    </TabsContent>
  </Tabs>
);

const ToggleGroupStory: StoryRender = () => (
  <ToggleGroup type="single" defaultValue="center">
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="center">Center</ToggleGroupItem>
    <ToggleGroupItem value="right">Right</ToggleGroupItem>
  </ToggleGroup>
);

const TooltipStory: StoryRender = () => (
  <TooltipProvider>
    <Tooltip defaultOpen>
      <TooltipTrigger className="rounded-md border border-border px-4 py-2 text-sm">Hover me</TooltipTrigger>
      <TooltipContent>
        <p>Adds the component to your project.</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const shadcnStoryRenders: Record<string, StoryRender> = {
  "shadcn-ui/Badge": BadgeStory,
  "shadcn-ui/Button": ButtonStory,
  "shadcn-ui/Card": CardStory,
  "shadcn-ui/Checkbox": CheckboxStory,
  "shadcn-ui/Dropdown Menu": DropdownMenuStory,
  "shadcn-ui/Input": InputStory,
  "shadcn-ui/Separator": SeparatorStory,
  "shadcn-ui/Sheet": SheetStory,
  "shadcn-ui/Skeleton": SkeletonStory,
  "shadcn-ui/Tabs": TabsStory,
  "shadcn-ui/Toggle Group": ToggleGroupStory,
  "shadcn-ui/Tooltip": TooltipStory,
};
