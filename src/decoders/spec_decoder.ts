export type SpecEntry = { name: string; kind: string };

export function decodeSpecFromWasm(_wasm: Buffer): SpecEntry[] {
  // Placeholder: real implementation parses Soroban XDR spec embedded in WASM.
  return [];
}
