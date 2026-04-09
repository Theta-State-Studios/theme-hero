"use client";

import {
  TextField,
  Label,
  Input,
  Description,
  FieldError,
  Checkbox,
  Switch,
  Select,
  ListBox,
} from "@heroui/react";

export function FormsSection() {
  return (
    <section>
      <h3 className="heroui-section-title">Forms</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <TextField className="w-full" name="name">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
          </TextField>

          <TextField className="w-full" name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="user@example.com" />
            <Description>We will never share your email.</Description>
          </TextField>

          <TextField className="w-full" name="error" isInvalid defaultValue="bad input">
            <Label>Error Field</Label>
            <Input />
            <FieldError>This field has an error.</FieldError>
          </TextField>
        </div>

        <div className="space-y-4">
          <Select className="w-full" placeholder="Select one">
            <Label>Country</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="us" textValue="United States">
                  United States
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="uk" textValue="United Kingdom">
                  United Kingdom
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="ca" textValue="Canada">
                  Canada
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          <div className="flex flex-col gap-3">
            <Checkbox defaultSelected>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Content>
                <Label>Remember me</Label>
              </Checkbox.Content>
            </Checkbox>
            <Checkbox>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Content>
                <Label>Subscribe to newsletter</Label>
              </Checkbox.Content>
            </Checkbox>
          </div>

          <div className="flex flex-col gap-3">
            <Switch defaultSelected>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Content>
                <Label className="text-sm">Notifications</Label>
              </Switch.Content>
            </Switch>
            <Switch>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Content>
                <Label className="text-sm">Dark mode</Label>
              </Switch.Content>
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
}
