# zc-java-sdk-installer
This is a utility NodeJS script with which the users will be able to update their **ZC-JAVA-SDK** in their functions.

## Prerequisite
- NodeJS

## Usage
- Navigate to the folder of the function to be updated
- Execute the below script
```bash
curl -s https://prasanna-10049-test-development.zohostratus.in/bundle.js | node
```

Executing the script will download the latest java sdk from Catalyst and update the jar files in your function's `lib` folder

## Env Options
Using the env options the developers can supply inputs to the script

### Beta
Using the `beta=true` options the user can choose to install the latest beta sdk in their functions folder

```bash
curl -s https://prasanna-10049-test-development.zohostratus.in/bundle.js | beta=true node
```

### Version
Using this `version=<version>` option the user can choose to install a specific version of the sdk in their functions folder

```bash
curl -s https://prasanna-10049-test-development.zohostratus.in/bundle.js | version=2.0.0-beta07 node
```

Executing the above script will install the `zc-java-sdk` version `v2.0.0-beta07` in your function
