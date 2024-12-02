export class DatabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export const handleFirestoreError = (error: any): never => {
  console.error('Firestore error:', error);

  // Map Firebase error codes to user-friendly messages
  const errorMap: Record<string, { code: string; message: string }> = {
    'permission-denied': {
      code: 'ACCESS_DENIED',
      message: 'You do not have permission to perform this action',
    },
    'not-found': {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found',
    },
    'already-exists': {
      code: 'DUPLICATE',
      message: 'This resource already exists',
    },
    'resource-exhausted': {
      code: 'RATE_LIMIT',
      message: 'Too many requests. Please try again later',
    },
    'failed-precondition': {
      code: 'INVALID_STATE',
      message: 'Operation cannot be performed in current state',
    },
    'invalid-argument': {
      code: 'INVALID_INPUT',
      message: 'Invalid input provided',
    },
  };

  const errorCode = error.code?.split('/')[1] || 'unknown';
  const mappedError = errorMap[errorCode] || {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
  };

  throw new DatabaseError(
    mappedError.message,
    mappedError.code,
    error
  );
};