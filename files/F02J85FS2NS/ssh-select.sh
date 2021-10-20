#!/bin/sh
host=""
# need backslash escape? ... currently not use backslash
if which fzf >/dev/null 2>&1; then
  host=$(grep -iEh "^host[[:space:]]" ~/.ssh/config ~/.ssh/conf.d/*.conf | sed -e 's/host[[:space:]]\(.*\)/\1/i' | tr ' ' '\n' |  grep -v -e '[*?]' -e '^[[:space:]]*$' | fzf  --prompt="Host\\> " --query="${*}" --select-1 | xargs -n 1)
  # use OPT env --ansi --reverse
elif which peco >/dev/null 2>&1; then
  host=$(grep -iEh "^host[[:space:]]" ~/.ssh/config ~/.ssh/conf.d/*.conf | sed -e 's/host[[:space:]]\(.*\)/\1/i' | tr ' ' '\n' |  grep -v -e '[*?]' -e '^[[:space:]]*$' | peco --prompt="Host\\> " --query="${*}" --select-1 | xargs -n 1)
else
  echo "selector not found"
fi

if [ ! -z "$host" ]; then
  echo "Connect " "$host"
  ssh "$host"
fi

# EOF
