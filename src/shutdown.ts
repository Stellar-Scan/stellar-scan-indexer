export function onShutdown(fn: () => Promise<void> | void) {
  const handler = async () => {
    await fn();
    process.exit(0);
  };
  process.on('SIGTERM', handler);
  process.on('SIGINT', handler);
}
