## Setup

- Copy contents of config.example.ts to a new file config.ts and fill the details

```shell
yarn install
yarn dev
```

use `yarn format` to format

### To Test Pydiode

It will not work with Vite during dev mode due to web workers not being included in the dev build. So build and serve.

```shell
yarn build
serve dist -p 8000
```

### To run in Docker

```shell
docker-compose watch
```

### Reference.

react-py (Pyodide) : https://elilambnz.github.io/react-py/

Ion-Phaser : https://github.com/proyecto26/ion-phaser/tree/develop

### TypeError: Failed to fetch dynamically imported module (Phaser not working in PROD)

Ion-Phaser should work in dev properly, this step is optional.

See the readme of https://github.com/mharrish7/Modified_Ion_Phaser.
