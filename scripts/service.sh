#!/usr/bin/env bash
servicename="bot"

case $1 in
  restart ) systemctl restart $servicename
    ;;
  status ) systemctl status $servicename | tail -10
    ;;
esac
