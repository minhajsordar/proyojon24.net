# Proyojon24 App (frontend)

Proyojonio Services

## Install the dependencies

```bashs
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
quasar dev -m android --ide
quasar dev -m capacitor -T android
quasar dev -m ios --ide
quasar dev -m capacitor -T ios
quasar build -m capacitor -T android
```

<!-- generate icon -->

$ icongenie generate [options]

    # generate icons for all installed Quasar modes
    $ icongenie generate -i /path/to/icon.png
    $ icongenie g -i icon.png

    # generate for (as example) PWA mode only
    $ icongenie generate -m pwa --icon /path/to/icon.png

    # generate for (as example) Cordova & Capacitor mode only
    $ icongenie g -m cordova,capacitor -i
         /path/to/icon.png -b /path/to/background.png

    # generate by using a profile file
    $ icongenie generate -p ./icongenie-profile.json

    # generate by using batch of profile files
    $ icongenie generate -p ./folder-containing-profile-files

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
