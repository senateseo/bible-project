# Send Cert file
scp -i ~/.ssh/bible-ext.pem -r ../server/cert ec2-user@54.244.1.148:~/bible-search-extension/server

# Send config.json file
scp -i ~/.ssh/bible-ext.pem ../server/config.json ec2-user@54.244.1.148:~/bible-search-extension/server

