#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <argument>"
    exit 1
fi

num_changes="$1"

echo "Making $num_changes patches"
read -p "Press Enter to continue..."

apply_diff.py index.html index.html.edited index.html.test $num_changes
# read -p "Press Enter to continue..."

# Prompt user for input
read -p "Do you want to continue? (y/n): " answer

# Check user input
case "$answer" in
    y|Y )
        echo "Continuing with the script...";;
    n|N )
        echo "Exiting the script.";
        exit 1;;
    * )
        echo "Invalid input. Please enter 'y' or 'n'."
        exit 1;;
esac

# Rest of your script goes here
# cp index.html.backup index.html.backup.backup 
# cp index.html        index.html.backup

timestamp=$(date +"%Y-%m-%d-%H-%M-%S")
filename='index.html'
backup_filename="${filename}.$timestamp"

# echo 'cp "$filename $backup_filename"'
# echo 'cp index.html.edited index.html'

cp $filename $backup_filename
cp index.html.test index.html


