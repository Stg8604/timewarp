## Setup

 - Copy contents of config.example.ts to a new file config.ts and fill the details

```shell
yarn install
yarn dev
```

use `yarn format` to format

### To test Pydiode

It will not work with Vite during dev mode due to web workers not being included in the dev build. So build and serve.

```shell
yarn build
serve dist -p 8000
```
