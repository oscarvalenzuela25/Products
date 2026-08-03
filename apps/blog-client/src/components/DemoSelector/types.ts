import type { DemoKey, DemoOption } from "../../hooks/useDemo";

export interface DemoSelectorProps {
  availableDemos: readonly DemoOption[];
  currentDemoKey: DemoKey;
}

export interface DemoChangeDetail {
  demoKey: DemoKey;
}
