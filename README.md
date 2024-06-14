# Instructions

If you want to try out the tests above,  follow along the instructions:

## Installation

Open one of the above folders containing tests.

Use the node package manager [npm](https://www.npmjs.com/) to install the required packages.

```bash
npm install
```
Read the `package.json` for required scipts and run the test accordingly.

## Usage

For Unit Testing and Integrated Testing using Jest,
```bash
npm test
```
OR
```bash
npm run test:unit
```
OR
```bash
npm run test:int
```


For End-to-End Testing using Cypress,

1. First build using parcel bundler using the command
```bash
npm run build
```
2. Then run the `test:e2e` script to actually start the server as well as Cypress and start testing:
```bash
npm run test:e2e
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
