export const ASSET_VERSION = "2026-07-24";

export function assetPath(path: string) {
  return `${path}?v=${ASSET_VERSION}`;
}
