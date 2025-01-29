# zc-java-sdk-installer
This is a utility NodeJS script with which yous will be able to update their **ZC-JAVA-SDK** in their functions.

## Prerequisite
- NodeJS

## Usage
- Navigate to the folder of the function to be updated
- Execute the below script
```bash
curl -s https://java-sdk-downloader-development.zohostratus.com/zc-scripts/sdk-upload.js | node
```

Executing the script will download the latest java sdk from Catalyst and update the jar files in your function's `lib` folder

## Env Options
Using the environment variable options the developers can supply inputs to the script

### Beta
Using the `ZC_BETA=true` options you can choose to install the latest beta sdk in their functions folder

```bash
curl -s https://java-sdk-downloader-development.zohostratus.com/zc-scripts/sdk-upload.js | ZC_BETA=true node
```

### Version
Using the `ZC_VERSION=<version>` option you can choose to install a specific version of the sdk in their functions folder

```bash
curl -s https://java-sdk-downloader-development.zohostratus.com/zc-scripts/sdk-upload.js | ZC_VERSION=2.0.0-beta07 node
```

Executing the above script will install the `zc-java-sdk` version `v2.0.0-beta07` in your function

### Destination
Using the `ZC_DEST_PATH=<path>` option you can choose the installation location of the ZC-JAVA-SDK. Use this option to download the sdk to a specific file path. The destination option supports both absolute and relative file paths.
```bash
curl -s https://java-sdk-downloader-development.zohostratus.com/zc-scripts/sdk-upload.js | ZC_DEST_PATH=./lib node
```

> Note: The Version and Beta options contradicts each other. So only one option can be used at a time.
