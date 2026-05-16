import { parseDeployFromEnvelope } from '../parsers/transaction_parser.js';

export function findDeploys(envelopes: Record<string, unknown>[]) {
  return envelopes.map(parseDeployFromEnvelope).filter((d): d is NonNullable<typeof d> => !!d);
}
