# NightwatchJS-Remote-File-Upload

Custom NightwatchJS command for file upload using remote selenium grid

## Dependencies

This works only for NightwatchJS v1.4+

This project requires [adm-zip](https://www.npmjs.com/package/adm-zip)

```
npm i adm-zip
```

## Installation

1. Place the folder customCommands in the root of your project
2. Update NightwatchJs Config:

```javascript
  custom_commands_path: ["customCommands"],
```

## Sample Test

```javascript
module.exports = {
  "File Upload Test": (browser) => {
    sessionQueue.push({ sessionId: browser.sessionId, GUID: GUID });
    setSessionName(browser.sessionId, `${GUID}: test file upload`).then(() => {
      browser
        .url("https://the-internet.herokuapp.com/upload")
        .uploadLocalFile(
          "/path/to/file",
          '[data-qa="File-Input"]'
        )
        .click("#file-submit")
        .pause(10000)
        .end();
    });
  },
};
```

## Ref:

1. https://github.com/nightwatchjs/nightwatch/issues/890
