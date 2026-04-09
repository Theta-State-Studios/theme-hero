"use client";

import { Card } from "@heroui/react";

export function CardsSection() {
  return (
    <section>
      <h3 className="heroui-section-title">Cards</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <Card.Header>
            <Card.Title>Card Title</Card.Title>
            <Card.Description>A brief description of the card content.</Card.Description>
          </Card.Header>
          <Card.Content>
            <p>This is a standard card component with header and content sections.</p>
          </Card.Content>
          <Card.Footer>
            <p className="text-sm opacity-60">Footer content</p>
          </Card.Footer>
        </Card>

        <Card variant="secondary">
          <Card.Header>
            <Card.Title>Secondary Card</Card.Title>
            <Card.Description>With secondary variant applied.</Card.Description>
          </Card.Header>
          <Card.Content>
            <p>Secondary cards show the surface secondary color from your theme.</p>
          </Card.Content>
        </Card>
      </div>
    </section>
  );
}
