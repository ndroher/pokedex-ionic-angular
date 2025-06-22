export function getId(url: string): number {
  const urlParts = url.split('/').filter(Boolean);
  return parseInt(urlParts[urlParts.length - 1], 10);
}
