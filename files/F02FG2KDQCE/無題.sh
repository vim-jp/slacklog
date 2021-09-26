function start-zeno-server() {
  nohup ${ZENO_SERVER_BIN} > /dev/null 2>&1 &!
}

function restart-zeno-server() {
  kill ${ZENO_PID}
  export ZENO_PID=
  start-zeno-server
}

function zeno-onexit() {
  kill ${ZENO_PID}
}

function zeno-onchpwd() {
  kill ${ZENO_PID}
  export ZENO_PID=
}

function set-zeno-pid() {
  if [[ -S $ZENO_SOCK ]] && [[ -z $ZENO_PID ]]; then
    export ZENO_PID=$(zeno-client "--mode=pid")
  else
    start-zeno-server
  fi
}

add-zsh-hook precmd set-zeno-pid
add-zsh-hook chpwd zeno-onchpwd
add-zsh-hook zshexit zeno-onexit
