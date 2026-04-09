"use client";

import { Table, Avatar, Kbd } from "@heroui/react";

export function DataSection() {
  return (
    <section>
      <h3 className="heroui-section-title">Data Display</h3>
      <div className="space-y-6">
        <div className="flex gap-3 items-center">
          <Avatar size="sm">
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          <Avatar size="md">
            <Avatar.Fallback>AB</Avatar.Fallback>
          </Avatar>
          <Avatar size="lg">
            <Avatar.Fallback>ZK</Avatar.Fallback>
          </Avatar>
        </div>

        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Example table">
              <Table.Header>
                <Table.Column isRowHeader>Name</Table.Column>
                <Table.Column>Role</Table.Column>
                <Table.Column>Status</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row id="1">
                  <Table.Cell>Jane Cooper</Table.Cell>
                  <Table.Cell>Developer</Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                </Table.Row>
                <Table.Row id="2">
                  <Table.Cell>Alex Morgan</Table.Cell>
                  <Table.Cell>Designer</Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                </Table.Row>
                <Table.Row id="3">
                  <Table.Cell>Sam Wilson</Table.Cell>
                  <Table.Cell>Manager</Table.Cell>
                  <Table.Cell>Away</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        <div className="flex gap-2 items-center">
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>C</Kbd>
          <span className="ml-4">Copy</span>
        </div>
      </div>
    </section>
  );
}
