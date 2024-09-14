import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'prueba-app',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: false
    }
  }
};

export default config;
