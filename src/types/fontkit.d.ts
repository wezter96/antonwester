declare module 'fontkit' {
  export interface GlyphRun { advanceWidth: number }
  export interface Font {
    unitsPerEm: number;
    layout(text: string): GlyphRun;
    getVariation(settings: Record<string, number>): Font;
  }
  export function openSync(path: string): Font;
}
