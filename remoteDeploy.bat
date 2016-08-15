rem @echo off 
rem bundle exec jekyll build
cd ./_site/
git add .
echo input commit message 
set /p cmt_msg=
rem git commit -m "\""+%cmt_msg%+"\""
rem git push blog
