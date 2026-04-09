"use client";

import { ButtonsSection } from "./sections/ButtonsSection";
import { CardsSection } from "./sections/CardsSection";
import { FormsSection } from "./sections/FormsSection";
import { FeedbackSection } from "./sections/FeedbackSection";
import { NavigationSection } from "./sections/NavigationSection";
import { DataSection } from "./sections/DataSection";

export function ComponentShowcase() {
  return (
    <div className="space-y-8 p-6">
      <ButtonsSection />
      <CardsSection />
      <FormsSection />
      <FeedbackSection />
      <NavigationSection />
      <DataSection />
    </div>
  );
}
