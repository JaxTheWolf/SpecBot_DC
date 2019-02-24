#!/usr/bin/env bash

FN=backup_$(date +"%F").sqlite3

createBackup() {
  cd ../DBs
  sqlite3 configurations.sqlite3 ".backup $FN"
  mv $FN ../backups/$FN
}

if [ -d "../backups" ]
then
  createBackup
else
  mkdir ../backups
  createBackup
fi
