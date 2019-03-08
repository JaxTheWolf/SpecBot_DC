#!/usr/bin/env bash

if [ ! -z $(cat "../configs/conf.json" | jq ".backPath") ]; then
  path=$(echo "$(cat "../configs/conf.json" | jq ".backPath")/backups" | tr -d "\"")
else
  path="$1/backups"
fi

createBackup() {
  cd "../DBs" || exit
  sqlite3 configurations.sqlite3 ".backup backup_$(date +"%F").sqlite3"
  mv "backup_$(date +"%F").sqlite3" "$path/backup_$(date +"%F").sqlite3"
}

if [ -d "$path" ]
then
  createBackup "$path"
else
  mkdir -p "$path"
  createBackup "$path"
fi
exit 0
