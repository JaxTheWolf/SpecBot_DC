#!/usr/bin/env bash
servicename="bot"

case $1 in
  restart ) sudo systemctl restart $servicename
    ;;
  status ) sudo systemctl status $servicename | tail -10
    ;;
esac
