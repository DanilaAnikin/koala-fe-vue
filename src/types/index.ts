// Used for typing data before transformation
export interface RawDataItem {
	data: Record<string, unknown>;
	children?: Record<string, { records: RawDataItem[] }>;
  }
  
  // Used to type data after transformation
  export interface DataItem {
	id: string; // Derived from raw data or generated
	children: DataItem[];
	[key: string]: unknown;
  }
  