#!/bin/bash

sudo apt update
sudo apt install ruby-full
sudo apt install wget

cd /home/ubuntu
wget https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto

sudo service codedeploy-agent status
sudo service codedeploy-agent start

sudo apt install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

source ~/.profile

nvm install node

exit 0