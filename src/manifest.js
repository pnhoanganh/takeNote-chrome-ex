import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json' assert { type: 'json' }

const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/16.png',
    32: 'img/32.png',
    96: 'img/96.png',
    128: 'img/128.png',
    196: 'img/196.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/32.png',
  },
  options_page: 'options.html',

  background: {
    service_worker: 'src/background/index.js',
    type: 'module',
  },
  // content_scripts: [
  //   {
  //     matches: ['http://*/*', 'https://*/*'],
  //     js: ['src/contentScript/index.js'],
  //   },
  // ],
  side_panel: {
    default_path: 'sidepanel.html',
  },
  web_accessible_resources: [
    {
      resources: ['img/16.png', 'img/32.png', 'img/96.png', 'img/128.png', 'img/196.png'],
      matches: [],
    },
  ],
  permissions: ['sidePanel', 'storage'],
})
