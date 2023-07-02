## Install My SQL

```
#  this command updates all packages to the latest version
sudo dnf install mariadb105-server


# This command allows you to check if package was installed
sudo dnf info package-name

# Start MariaDB Server
sudo systemctl start mariadb

# Run mysql_secure_installation
sudo mysql_secure_installation

# Enable
sudo vi /etc/my.cnf.d/server.cnf

then add `bind-address = 0.0.0.0`

then restart `sudo systemctl restart mariadb`
```
