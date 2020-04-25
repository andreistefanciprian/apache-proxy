# Description

Running an apache2 reverse proxy in front of a nodejs app.


```bash
# Define variables
VERSION=0.0.1

# Build images
docker image build -f Dockerfile.apache -t apache:$VERSION .
docker image build -t nodeapp:$VERSION .

# Run containers. This builds images if not present
VERSION=$VERSION docker-compose up -d --build

# or
bash build.sh 0.0.17
bash build.sh
bash build.sh down

# Debug && Cleanup

docker container run -it --rm -p 443:443 -p 80:80 --network web-server_node-net --name apache-test apache:0.0.17 bash

docker exec -ti apache tail -f /var/log/apache2/devopsnation.co.uk-access.log

docker-compose down
docker container rm -f `docker container ps -qa`
```