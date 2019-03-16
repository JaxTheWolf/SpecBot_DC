#!/usr/bin/env bash
path=$(jq ".backPath" < "../configs/conf.json" | tr -d "\"")backups

case "$1" in
  conf ) fn="configurations.sqlite3"
    ;;
  settings ) fn="settings.sqlite3"
    ;;
  scores ) fn="scores.sqlite3"
    ;;
  * ) echo "Invalid name. Exitting" && exit 1
    ;;
esac

createBackup() {
  cd "../DBs" || exit
  sqlite3 "$fn" ".backup backup_$(echo $fn | cut -f 1 -d ".")_$(date +"%F").sqlite3"
  mv "backup_$(echo $fn | cut -f 1 -d ".")_$(date +"%F").sqlite3" "$path/backup_$(echo $fn | cut -f 1 -d ".")_$(date +"%F").sqlite3"
}

if [ -d "$path" ]
then
  createBackup "$path"
else
  mkdir -p "$path"
  createBackup "$path"
fi
exit 0
