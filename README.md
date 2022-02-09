# Last

### run msql docker container
```
docker run -p 3306:3306 --name mysql1 -e MYSQL_ROOT_PASSWORD=secret -d mysql:latest --default-authentication-plugin=mysql_native_password
```
