set -e

WORKTREE="${@: -2:1}"

function worktree_list() {
  local PATTERN="^worktree\s+"
  command git worktree list --porcelain |
    command grep -E "$PATTERN" |
    sed -E -e "s/$PATTERN//g"
}

TARGETS="$(
  PATTERN="^[\?|\!]\s+"
  command git status --ignored --porcelain=2 \
    | command grep -E "$PATTERN" \
    | sed -E -e "s/$PATTERN//g" \
    | sed -E -e "s/^\.\//..\/$( basename "$( pwd )" )\//g"
)"

git worktree add "$@"

for TARGET in $TARGETS
do
  LINK="${WORKTREE}/$(
    echo "$TARGET" \
      | sed -E -e "s/^(\.\.\/)+//g" \
      | sed -E -e 's/\/$//g'
  )"
  mkdir -p "$( dirname $LINK )"
  ln -s "$TARGET" "$LINK"
done

