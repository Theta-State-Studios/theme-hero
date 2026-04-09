"use client";

import { Tabs, Accordion } from "@heroui/react";

export function NavigationSection() {
  return (
    <section>
      <h3 className="heroui-section-title">Navigation</h3>
      <div className="space-y-6">
        <Tabs>
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              <Tabs.Tab id="overview">Overview</Tabs.Tab>
              <Tabs.Tab id="features">Features</Tabs.Tab>
              <Tabs.Tab id="pricing">Pricing</Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel id="overview">
            <p className="p-3 text-sm">Overview content goes here.</p>
          </Tabs.Panel>
          <Tabs.Panel id="features">
            <p className="p-3 text-sm">Features content goes here.</p>
          </Tabs.Panel>
          <Tabs.Panel id="pricing">
            <p className="p-3 text-sm">Pricing content goes here.</p>
          </Tabs.Panel>
        </Tabs>

        <Accordion className="w-full">
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                What is HeroUI?
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                HeroUI is a component library built on Tailwind CSS and React Aria.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                How does theming work?
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                Theming uses CSS custom properties with oklch color space.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                Is it accessible?
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                Yes, built on React Aria for full accessibility support.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </section>
  );
}
