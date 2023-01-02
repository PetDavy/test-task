export interface ErrorField {
  field: string;
  message: string;
}

export function isPrintableError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}
