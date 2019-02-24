#!/usr/bin/env bash

fn="backup_$(date +"%F").sqlite3"
path="$1/backups"
backdir="../backups"

createBackup() {
  cd "../DBs" || exit
  sqlite3 configurations.sqlite3 ".backup $fn"
  mv "$fn" "$1/$fn"
}

if [ -z "$1" ]
then
  if [ -d $backdir ]
  then
    createBackup $backdir
  else
    mkdir -p $backdir
    createBackup $backdir
  fi
  exit 0
else
  if [ -d "$path" ]
  then
    createBackup "$path"
  else
    mkdir -p "$path"
    createBackup "$path"
  fi
  exit 0
fi
