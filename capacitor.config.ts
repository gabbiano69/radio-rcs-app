import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'it.rcsradio.sicilia',
  appName: 'Radio RCS Sicilia',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    allowNavigation: ['sr10.inmystream.info']
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
