import { IStoreError } from "../types/index";

export function logStoreError(error: IStoreError) {
  const bold = "\x1b[1m";
  const reset = "\x1b[0m";

  // Obtenir la trace d'appel
  const stack = new Error().stack;
  let callerInfo = "Origine inconnue";

  if (stack) {
    // Extraire la ligne correspondant à l'appelant (ligne 3 dans la stack trace)
    const stackLines = stack.split("\n");
    if (stackLines.length > 2) {
      const match = stackLines[2].match(/at (.+?) \((.+):(\d+):\d+\)/) || stackLines[2].match(/at (.+):(\d+):\d+/);
      if (match) {
        const functionName = match[1]?.split(".").pop() || "Fonction anonyme"; // Extraire uniquement le nom de la fonction
        const fileName = match[2]?.split("/").pop() || "Fichier inconnu"; // Extraire uniquement le nom du fichier
        const lineNumber = match[3] || "Ligne inconnue";
        callerInfo = `${functionName} => ${fileName}:${lineNumber}`;
      }
    }
  }

  const formattedMessage = `${bold}${error.message}${reset}`;
  const formattedDetails = error.details.join("\n");

  console.error(`[${callerInfo}] ${formattedMessage}\n${formattedDetails}`);
}

// 1. Expression régulière améliorée :
//  - at (\S+) \(([^:]+):(\d+):\d+\) :
//    - Capture le nom de la fonction (\S+).
//    - Capture le chemin du fichier ([^:]+).
//    - Capture le numéro de ligne (\d+).
//    - Extraction du nom du fichier :
// 2. match[2].split("/").pop() permet d'extraire uniquement le nom du fichier sans le chemin complet
// 3. Formatage final : functionName => fileName:lineNumber