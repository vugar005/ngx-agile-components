export interface TableModel {
  err: string;
  kv: any;
  tbl: Tbl[];
}
interface Tbl {
  c:  any;
  endLimit: string;
  hiddenColumn: string;
  r: any;
  rowCount: number;
  seqColumn: string;
  startLimit: string;
  tn?: string;
}
