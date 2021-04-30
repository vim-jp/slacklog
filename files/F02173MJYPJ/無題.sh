#!/bin/sh
#+[USAGE] $0
#+[STDOUT]
#+   0: IME OFF
#+   1: IME ON

if [ -z "$XMODIFIERS" ]; then
  # on CUI
  UIM_GET_FILE=$UIM_FEP_GETMODE
  if [ -n "$UIM_GET_FILE" ]; then
    cat "$UIM_GET_FILE"
  else
    echo 0
  fi
else
  # on GUI
  if [ "$(fcitx-remote)" = "2" ]; then
    echo 1
  else
    echo 0
  fi
fi
