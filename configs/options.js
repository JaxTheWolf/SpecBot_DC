const { timeZone } = require(`./conf.json`)

exports.options = {
  timeZone: timeZone,
  folderPath: `./logs/`,
  dateBasedFileNaming: true,
  fileNamePrefix: `DailyLogs_`,
  fileNameExtension: `.log`,
  dateFormat: `YYYY_MM_D`,
  timeFormat: `h:mm:ss A`,
  onlyFileLogging: false
}
