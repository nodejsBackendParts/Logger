'use strict';

const EventEmitter = require('events');

const def = require(__dirname + '/defines');
const dateFormatter = require(__dirname + '/dateFormatter');

module.exports = class extends EventEmitter{
  constructor(opt) {

    super();

    this.on(def.newLogEventName, this.addLogRecord);

    this.options = def.defaults;
    Object.assign(this.options, opt);

    this.levels = Object.keys(def.logLevels);
    const currentLevel = this.options.logLevel;
    const currentLevelAttributes = def.logLevels[currentLevel];
    const currentRank = currentLevelAttributes ? currentLevelAttributes.rank : Number.MAX_SAFE_INTEGER;

    this.loggers = {};

    this.levels.forEach((l) => {

      const la = def.logLevels[l];

      if(currentRank <= la.rank) {
        this.loggers[l] = (message, prefix) => {
          this.emit(def.newLogEventName,{
            message: message,
            prefix: prefix,
            level: l,
            date: new Date()
          });
        };
      }

    });

  }

  createAgent(prefix = '') {
    const res = {};

    this.levels.forEach((l) => {

      const logger = this.loggers[l];

      if(logger) {
        res[l] = (message) => {
          logger(message, prefix);
        };
      } else {
        res[l] = () => {};
      }

    });

    return res;

  }

  addLogRecord(data) {
    const ld = def.logLevels[data.level];
    const cc = def.colorCodes[ld.color];
    const ccd = def.colorCodes.default;
    const d = dateFormatter(data.date, this.options.logDateFormat);

    let m = this.options.logRecordLayout;

    m = m.replace(':prefix', data.prefix);
    m = m.replace(':message', data.message);
    m = m.replace(':level', ld.label);
    m = m.replace(':date', d);

    const a = `\x1B[${cc}m${m}\x1B[${ccd}m`;

    console.log(a);
  }

};
