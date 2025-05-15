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
