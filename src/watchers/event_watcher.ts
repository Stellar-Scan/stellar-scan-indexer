import { decodeEvent } from '../decoders/event_decoder.js';

export function normalizeEvents(rawEvents: Record<string, unknown>[]) {
  return rawEvents.map((e) => decodeEvent(e));
}
