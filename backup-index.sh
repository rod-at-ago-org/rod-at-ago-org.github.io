datetime=`datetime.sh`
backup=`file-insert-string-before-extension.sh index.html $datetime`
echo $datetime
echo $backup
cp index.html $backup
