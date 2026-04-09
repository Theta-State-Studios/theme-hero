"use client";

import { Button } from "@heroui/react";

export function ButtonsSection() {
  return (
    <section>
      <h3 className="heroui-section-title">Buttons</h3>
      <div className="flex flex-wrap gap-3 mb-4">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Button variant="danger">Danger</Button>
        <Button variant="danger-soft">Danger Soft</Button>
        <Button isDisabled>Disabled</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </section>
  );
}
