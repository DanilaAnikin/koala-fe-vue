import type { DataItem, RawDataItem } from "../types";
import { v4 as uuidV4 } from 'uuid';

/**
 * Transforms the nested raw data into a normalized DataItem structure.
 */
export function transformData(item: RawDataItem): DataItem {
  if (!item.data) {
    throw new Error("Invalid item");
  }

  if (!item.children) {
    return transformItem({ ...item.data, children: [] });
  }

  const childrenValues = Object.entries(item.children);

  if (childrenValues.length === 0) {
    return transformItem({ ...item.data, children: [] });
  }

  // Assumes one children object; otherwise, more validation is needed.
  const childrenValue = childrenValues[0][1];

  if (!childrenValue.records) {
    return transformItem({ ...item.data, children: [] });
  }

  return transformItem({
    ...item.data,
    children: childrenValue.records.map(r => transformData(r))
  });
}

/**
 * Ensures each item has an ID, converting non-string IDs to strings or generating a new UUID.
 */
function transformItem(item: Omit<DataItem, 'id'>): DataItem {
  return {
    ...item,
    id: item.id ? `${item.id}` : uuidV4(),
  } as DataItem;
}
