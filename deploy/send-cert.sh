# Send Cert file
scp -i ~/.ssh/aws-sangwon.pem -r ../server/cert ubuntu@43.200.172.223:~/bible-search-extension/server

# Send config.json file
scp -i ~/.ssh/aws-sangwon.pem ../server/config.json ubuntu@43.200.172.223:~/bible-search-extension/server