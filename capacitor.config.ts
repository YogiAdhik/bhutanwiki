import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'org.bhutanwiki.app',
  appName: 'BhutanWiki',
  webDir: 'out',
  server: {
    url: 'https://bhutanwiki.org',
    cleartext: false,
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#FFFBF5',
  },
  android: {
    backgroundColor: '#FFFBF5',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 1500,
      backgroundColor: '#7B1E3A',
      showSpinner: false,
    },
  },
}

export default config
