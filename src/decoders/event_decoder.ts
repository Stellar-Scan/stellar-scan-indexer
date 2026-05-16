export type DecodedEvent = { topics: string[]; value: unknown };

export function decodeEvent(raw: { topics?: unknown[]; value?: unknown }): DecodedEvent {
  return {
    topics: (raw.topics ?? []).map((t) => String(t)),
    value: raw.value ?? null,
  };
}
