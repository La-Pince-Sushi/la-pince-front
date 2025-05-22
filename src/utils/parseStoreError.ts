/**
 * Parses an error from the store and returns a structured object.
 * 
 * @param {unknown} error - The error to parse.
 * @returns {{ message: string; details: string[] }} - An object containing the error message and details.
 */
export function parseStoreError(error: unknown) {
  if (
    typeof error === "object"
    &&
    error !== null
    &&
    "message" in error
  ) {
    const backendError = error as { message: string; details?: string[] };

    return {
      message: backendError.message,
      details: backendError.details || [],
    };
  }

  // fallback générique en cas de crash / down du backend
  return {
    message: "Une erreur inattendue est survenue.",
    details: [],
  };
}
