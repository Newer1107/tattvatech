export const ASSET_VERSION = "2026-10-16";

export function assetPath(path: string) {
  return `${path}?v=${ASSET_VERSION}`;
}
