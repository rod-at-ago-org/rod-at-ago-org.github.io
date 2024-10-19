# echo "scp -P 21098 $1 $NAMECHEAP_USERNAME:aieda.technology/public_html"
scp -P 21098 -r $1 $NAMECHEAP_USERNAME@aieda.technology:public_html
# mbp16-m2[10:59 08242024]aieda.technology-website$ scp -P 21098 -r fonts/lexend/Lexend-VariableFont_wght.ttf  $NAMECHEAP_USERNAME@aieda.technology:public_htmlaiedkucg@aieda.technology's password:
# scp -P 21098 empty.html $NAMECHEAP_USERNAME@aieda.technology:public_html
