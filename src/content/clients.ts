import type { Client } from './types';

export const CLIENTS: Client[] = [
  { id: 'ivcevidensia', name: 'IVC Evidensia', kind: 'mask', file: '/clients/ivcevidensia.svg', ratio: 3.72, height: 2.17 },
  { id: 'evinova', name: 'Evinova', kind: 'mask', file: '/clients/evinova.svg', ratio: 4.34, height: 1.74 },
  { id: 'telia', name: 'Telia', kind: 'mask', file: '/clients/telia.svg', ratio: 2.54, height: 2.26 },
  { id: 'far', name: 'FAR', kind: 'mask', file: '/clients/far.svg', ratio: 2.05, height: 2.0 },
  { id: 'sejfa', name: 'Sejfa', kind: 'mask', file: '/clients/sejfa.svg', ratio: 2.25, height: 2.09 },
  { id: 'tiimo', name: 'Tiimo', kind: 'mask', file: '/clients/tiimo.png', ratio: 3.59, height: 1.83 },
  { id: 'futurememories', name: 'Future Memories', kind: 'symbol-text', file: '/clients/futurememories.svg', text: 'Future Memories' },
  { id: 'zodiapps', name: 'zodiapps', kind: 'text', text: 'zodiapps', dot: true },
  { id: 'weapp', name: 'weapp', kind: 'mask', file: '/clients/weapp.svg', ratio: 3.47, height: 1.65 },
];
