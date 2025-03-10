import type { DataItem } from "../../types";

export interface TableProps {
  items: DataItem[];
  deleteItem: (path: string[]) => void;
  // When false, the component will not display "No data" if the items list is empty.
  showEmptyMessage?: boolean;
}
