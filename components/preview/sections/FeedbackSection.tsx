"use client";

import { Badge, Chip, ProgressBar, Spinner, Alert, Avatar, Label } from "@heroui/react";

export function FeedbackSection() {
  return (
    <section>
      <h3 className="heroui-section-title">Feedback</h3>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <Badge.Anchor>
            <Avatar>
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <Badge color="danger" size="sm">5</Badge>
          </Badge.Anchor>
          <Badge.Anchor>
            <Avatar>
              <Avatar.Fallback>AB</Avatar.Fallback>
            </Avatar>
            <Badge color="accent" size="sm">99+</Badge>
          </Badge.Anchor>
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip color="default">Default</Chip>
          <Chip color="accent">Accent</Chip>
          <Chip color="success">Success</Chip>
          <Chip color="warning">Warning</Chip>
          <Chip color="danger">Danger</Chip>
        </div>

        <div className="space-y-3">
          <ProgressBar aria-label="Progress" value={65} className="w-full">
            <Label>Progress</Label>
            <ProgressBar.Output />
            <ProgressBar.Track>
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
          <ProgressBar aria-label="Loading" isIndeterminate className="w-full">
            <Label>Loading...</Label>
            <ProgressBar.Track>
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
        </div>

        <div className="flex gap-4 items-center">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>

        <div className="space-y-2">
          <Alert>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Default Alert</Alert.Title>
              <Alert.Description>This is informational content.</Alert.Description>
            </Alert.Content>
          </Alert>
          <Alert color="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Success!</Alert.Title>
              <Alert.Description>Operation completed successfully.</Alert.Description>
            </Alert.Content>
          </Alert>
          <Alert color="warning">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Warning</Alert.Title>
              <Alert.Description>Please review this carefully.</Alert.Description>
            </Alert.Content>
          </Alert>
          <Alert color="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>Something went wrong.</Alert.Description>
            </Alert.Content>
          </Alert>
        </div>
      </div>
    </section>
  );
}
