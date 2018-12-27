export interface ValidationError {
  file: File;
  error: string;
}
export enum FileValidationTypes {
  fileMaxSize = 'FILE MAX SIZE',
  fileMaxCount = 'FILE MAX COUNT',
  totalMaxSize = 'TOTAL MAX SIZE',
  extensions = 'EXTENSIONS',
}
