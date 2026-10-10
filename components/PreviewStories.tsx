import * as React from "react";
import { Accordion } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Preview story renders — the documented component itself, with realistic
 * props, keyed by story id (`<library-slug>/<component name>`). The preview
 * page looks stories up here; a story id with no render fails the build rather
 * than shipping blank.
 */
export type StoryRender = () => React.ReactElement;

function ButtonStory() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="lg">Start free trial</Button>
      <Button size="lg" variant="outline">
        View the docs
      </Button>
    </div>
  );
}

function CardStory() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Monthly revenue</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">$48,210</p>
          <p className="text-sm text-muted-foreground">+12.4% from the previous period</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active subscriptions</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">1,284</p>
          <p className="text-sm text-muted-foreground">+3.1% from the previous period</p>
        </CardContent>
      </Card>
    </div>
  );
}

function AccordionTrigger({ children, ...props }: React.ComponentProps<typeof Accordion.Trigger>) {
  return (
    <Accordion.Trigger
      className="flex w-full items-center justify-between py-4 text-left text-sm font-medium"
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </Accordion.Trigger>
  );
}

function AccordionStory() {
  return (
    <Accordion.Root type="single" collapsible defaultValue="pricing" className="group w-full max-w-xl">
      <Accordion.Item value="pricing" className="border-b border-border">
        <Accordion.Header>
          <AccordionTrigger>How does pricing work?</AccordionTrigger>
        </Accordion.Header>
        <Accordion.Content className="pb-4 text-sm text-muted-foreground">
          Every plan includes the full component set. Paid tiers add team seats and priority support.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="license" className="border-b border-border">
        <Accordion.Header>
          <AccordionTrigger>Can I use the components commercially?</AccordionTrigger>
        </Accordion.Header>
        <Accordion.Content className="pb-4 text-sm text-muted-foreground">
          Yes. The code you install is yours to use in commercial products, per the library&apos;s license.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="frameworks" className="border-b border-border">
        <Accordion.Header>
          <AccordionTrigger>Does it work with my framework?</AccordionTrigger>
        </Accordion.Header>
        <Accordion.Content className="pb-4 text-sm text-muted-foreground">
          Each component page lists the frameworks and versions the library documents support for.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export const storyRenders: Record<string, StoryRender> = {
  "shadcn-ui/Button": ButtonStory,
  "shadcn-ui/Card": CardStory,
  "radix-ui/Accordion": AccordionStory,
};
