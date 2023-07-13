#!/usr/bin/bash

echo "Enter the message: "
read -r message
echo "Adding files..."
sleep 1
git add .
echo "Committing the changes to GitHub..."
sleep 1
git commit -m "$message"
echo "Pushing the changes..."

# Configure the Git credential helper with the username and password
git config credential.helper 'store --file ~/.git-credentials'
echo "https://krahul2024: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@github.com" > ~/.git-credentials

git push origin master