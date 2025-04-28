import { Locator } from "@playwright/test";

/**
 * Scrolls the given locator into view if needed.
 * @param locator - The locator of the element you want to scroll into view.
 * @param options - Optional scroll options (e.g., 'behavior' and 'block').
 */

export async function scrollIntoView(locator: Locator): Promise<void> {
  await locator.scrollIntoViewIfNeeded();
}
