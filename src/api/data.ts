import data from '../data/data.json'
import type { RawDataItem } from "../types";

/**
 * Loads and returns data from the JSON file.
 */
export function apiLoadData(): RawDataItem[] {
  return data as RawDataItem[];
}
