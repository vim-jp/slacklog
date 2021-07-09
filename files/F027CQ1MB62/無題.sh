function f() {
  local project dir repository session current_session
  dir=$(ghq list -p | sed -e "s|${HOME}|~|" | fzf-tmux -p 70%,70% --prompt='Project >' --preview "bat \$(eval echo {})/README.md" --bind ctrl-d:preview-page-down,ctrl-u:preview-page-up)

  if [[ $dir == "" ]]; then
    return 1
  fi

  if [[ ! -z ${TMUX} ]]; then
    repository=${dir##*/}
    session=${repository//./-}
    current_session=$(tmux list-sessions | grep 'attached' | cut -d":" -f1)

    if [[ $current_session =~ ^[0-9]+$ ]]; then
      eval cd "${dir}"
      tmux rename-session $session
    else
      tmux list-sessions | cut -d":" -f1 | grep -e "^${session}\$" > /dev/null
      if [[ $? != 0 ]]; then
        tmux new-session -d -c $(eval echo "${dir}") -s $session
      fi
      tmux switch-client -t $session
    fi
  else
    eval cd "${dir}"
  fi
}
