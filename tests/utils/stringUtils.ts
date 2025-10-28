// This is for the PART 3 of the Technical Assessment

export function tagWithTimestamp(input: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${input}-${timestamp}`;
}
