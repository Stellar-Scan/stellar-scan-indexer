import pino from 'pino';

export function createLogger(level: string) {
  return pino({ level, base: { service: 'stellar-scan-indexer' } });
}
