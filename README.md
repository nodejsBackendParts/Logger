# Logger

## Example
```javascript
'use strict';

const Logger = require('backendparts-logger');
//const logger = new Logger({logLevel: "error"});
const logger = new Logger();
const log = logger.createAgent('[server]');

log.log("log message");
log.debug("debug message");
log.info("info message");
log.warn("warn message");
log.error("error message");
log.fatal("fatal message");
```
## Default options
```json
"defaults": {
    "logLevel": "info",
    "logRecordLayout": ":date :level :prefix :message",
    "logDateFormat": "yyyy-MM-dd hh:mm:ss.SSS"
  }
```
Log levels: "debug", "info", "warn", "error", "fatal", "log"
