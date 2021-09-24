set -e

if ! command -v git &> /dev/null
then
    echo "git could be not found"
    exit 1
fi

git init

read -p "Are you sure to commit process? (y/n)" COMMIT_PERMISSION
if [[ "${COMMIT_PERMISSION}" = "y" ]]; then
    git add .
    read -p "Type commit message : " COMMIT_MESSAGE
    git commit -m "${COMMIT_MESSAGE}"
    read -p "Type origin url : " ORIGIN_URL
    git remote add origin ${ORIGIN_URL}
    git push origin $(git rev-parse --abbrev-ref @)
else
    exit 1
fi


