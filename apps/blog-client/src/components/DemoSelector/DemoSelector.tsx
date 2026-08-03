import { useEffect, useState, type ChangeEvent } from "react";
import {
  Select,
  SelectorContainer,
  SelectorLabel,
  SelectWrapper,
} from "./styles";
import type {
  DemoChangeDetail,
  DemoSelectorProps,
} from "./types";
import type { DemoKey } from "../../hooks/useDemo";

const STORAGE_KEY = "blog-client:selected-demo:v1";

const isAvailableDemo = (
  demoKey: string,
  availableDemos: DemoSelectorProps["availableDemos"],
): demoKey is DemoKey =>
  availableDemos.some((demo) => demo.key === demoKey);

const readStoredDemo = (
  availableDemos: DemoSelectorProps["availableDemos"],
): DemoKey | null => {
  try {
    const storedDemo = window.localStorage.getItem(STORAGE_KEY);
    return storedDemo && isAvailableDemo(storedDemo, availableDemos)
      ? storedDemo
      : null;
  } catch {
    return null;
  }
};

const persistDemo = (demoKey: DemoKey) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, demoKey);
  } catch {
    // The selector remains usable when storage is unavailable.
  }
};

const notifyDemoChange = (demoKey: DemoKey) => {
  window.dispatchEvent(
    new CustomEvent<DemoChangeDetail>("demo:change", {
      detail: { demoKey },
    }),
  );
};

const DemoSelector = ({
  availableDemos,
  currentDemoKey,
}: DemoSelectorProps) => {
  const [selectedDemoKey, setSelectedDemoKey] =
    useState<DemoKey>(currentDemoKey);

  useEffect(() => {
    const storedDemo = readStoredDemo(availableDemos);

    if (storedDemo) {
      setSelectedDemoKey(storedDemo);
      return;
    }

    persistDemo(currentDemoKey);
  }, [availableDemos, currentDemoKey]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextDemoKey = event.target.value;

    if (!isAvailableDemo(nextDemoKey, availableDemos)) return;

    setSelectedDemoKey(nextDemoKey);
    persistDemo(nextDemoKey);
    notifyDemoChange(nextDemoKey);
  };

  return (
    <SelectorContainer data-demo-selector>
      <SelectorLabel htmlFor="demo-selector">Demo</SelectorLabel>
      <SelectWrapper>
        <Select
          id="demo-selector"
          aria-label="Seleccionar demo"
          value={selectedDemoKey}
          onChange={handleChange}
        >
          {availableDemos.map((demo) => (
            <option key={demo.key} value={demo.key}>
              {demo.label}
            </option>
          ))}
        </Select>
      </SelectWrapper>
    </SelectorContainer>
  );
};

export default DemoSelector;
