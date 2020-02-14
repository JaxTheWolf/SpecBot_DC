const { timeZone } = require(`./conf.json`)

exports.options = {
  dateBasedFileNaming: true,
  dateFormat: `YYYY_MM_D`,
  fileNameExtension: `.log`,
  fileNamePrefix: `DailyLogs_`,
  folderPath: `./logs/`,
  onlyFileLogging: false,
  timeFormat: `h:mm:ss A`,
  timeZone: timeZone
}
