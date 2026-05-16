export function inferTags(functionNames: string[]): string[] {
  const tags = new Set<string>();
  if (functionNames.includes('transfer') && functionNames.includes('balance')) tags.add('token');
  if (functionNames.includes('swap')) tags.add('defi');
  return [...tags];
}
