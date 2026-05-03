export function extractHost(url: string): string {
  const regex = /^(?:https?:\/\/)?([^\/?:#]+)/i;
  const match = url.match(regex);
  return match ? match[1] : "";
}
