## Description

Running an apache2 reverse proxy in front of a nodejs app.
This setup is using Apache2 running on Debian.

To have Apache2 https enabled or disabled, use below docker directives inside the Dockerfile:
```bash
# Start HTTPS page
CMD ["apache2ctl", "-DFOREGROUND", "-DDEVOPSNATION"]

# Start only HTTP page
CMD ["apache2ctl", "-DFOREGROUND"]
```

## Prerequisites
Have docker engine running on your machine.
Have SSL certs available in the infra/ssl folder (included in .gitignore).

## How to start this setup with build.sh script

```bash
# build setup using default image version specified inside build.sh script
bash build.sh 0.0.17

# build setup using image version specified as positional param
bash build.sh

# cleanup containers
bash build.sh down

# Access webserver
curl localhost:80/
curl localhost:443/load
curl localhost:443/status

# pages available insode nodejs app
/
/500
/load
/status
```

## How to start this setup with docker commands (optional)

```bash
# Define variables
VERSION=0.0.1

# Build images (optional)
docker image build -f Dockerfile.apache -t apache:$VERSION .
docker image build -t nodeapp:$VERSION .

# Run containers. This builds images if not present
VERSION=$VERSION docker-compose up -d --build

# Cleaup containers and related resources
VERSION=$VERSION docker-compose down
```

## Container Debug && Cleanup commands
```bash
# run container
docker container run -it --rm -p 443:443 -p 80:80 --network web-server_node-net --name apache-test apache:0.0.17 bash

# check logs inside container
docker exec -ti apache tail -f /var/log/apache2/devopsnation.co.uk-access.log

# remove all containers
docker container rm -f `docker container ps -qa`
```