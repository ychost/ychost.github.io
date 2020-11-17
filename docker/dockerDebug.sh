docker run  --restart=always -v $PWD:/usr/src/app -d --name blog -p 4008:4008  blog bash  /usr/src/app/localDeploy.sh


