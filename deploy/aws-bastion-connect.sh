#!/usr/bin/env bash

# Key File
KEY_FILE_PATH=~/.ssh/godspel.pem

# Remote Connection
LOCAL_PORT=3307
TARGET_DNS=godspel-mysql.c1hkbo7oylei.us-west-2.rds.amazonaws.com
TARGET_PORT=3306

# SSH Connection
USER=ec2-user
ENDPOINT=18.236.157.91



ssh -i $KEY_FILE_PATH -f -N -L $LOCAL_PORT:$TARGET_DNS:$TARGET_PORT $USER@$ENDPOINT -v