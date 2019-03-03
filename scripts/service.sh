#!/usr/bin/env bash
servicename="bot"

function restart() {
    sudo systemctl restart $servicename
}

function status() {
    sudo systemctl status $servicename | tail -10
}

case $1 in
  restart ) restart
    ;;
  status ) status
    ;;
esac
