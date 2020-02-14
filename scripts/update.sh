#!/usr/bin/env bash
cd ..

if [ -z $(command -v git) ]; then
  echo "Git not installed!"
else
  git pull https://github.com/JaxTheWolf/SpecBot_DC.git
fi
