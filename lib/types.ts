export interface GuestbookEntry {
  sender: string;
  timestamp: string;
  message: string;
  explorerUrl: string;
  myExplorerUrl: string;
  hash?: string;
}

export interface RawLogMessage {
  sender: string;
  message: string;
  timestamp: number;
  hash: string;
}
