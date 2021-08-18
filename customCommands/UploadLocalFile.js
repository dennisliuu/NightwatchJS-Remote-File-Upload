const AdmZip = require('adm-zip');
const util = require('util');
const events = require('events');

function uploadLocalFile() {
  events.EventEmitter.call(this);
}

// inherit events class
util.inherits(uploadLocalFile, events.EventEmitter);

uploadLocalFile.prototype.command = async function commandFn(
  filePath,
  inputSelector,
) {
  this._stackTrace = commandFn.stackTrace;
  const self = this;
  const zip = new AdmZip();
  zip.addLocalFile(filePath);
  const file = zip.toBuffer().toString('base64');

  try {
    var returnValue = await this.httpRequest({
      path: '/session/:sessionId/file',
      sessionId: this.api.sessionId,
      data: { file },
      method: 'POST',
    });
  } catch (err) {
    console.error('An error occurred uploading file', err);
    return {
      status: -1,
      error: err.message,
    };
  }

  // using native api: setValue
  self.client.api.setValue(inputSelector, returnValue.value, function() {
    // emit 'complete' when command finished, and continue the testing
    self.emit('complete');
  });
  return this;
};

module.exports = uploadLocalFile;