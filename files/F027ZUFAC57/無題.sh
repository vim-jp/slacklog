function gh-fzf() {
  subcommand="$1"
  shift
  local GH="$(command -vp gh)"
  $GH $subcommand list "$@" \
    | fzf --preview "echo {} | sed -E 's/\s.*//' | xargs $GH $subcommand view" \
    | sed -E 's/\s.*//'  \
    | xargs $GH $subcommand view --web
}

function gh-wrapper() {
  if [[ $# == 1 ]]; then
    gh-fzf "$@"
  elif [[ "$2" == "--help" ]]; then
    command gh "$@"
  elif [[ "$2" =~ ^-.* ]] ; then
    gh-fzf "$@"
  else
    command gh "$@" 
  fi
}

function gh() {
  local listable="gist\nissue\npr\nrelease\nrepo\nactions\nrun\nworkflow"
  if echo -e "$listable" | /bin/grep -P "^${1}$"; then
    gh-wrapper "$@"
  else
    command gh "$@"
  fi
}

