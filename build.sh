

#!/bin/bash

if [ "$1" == "down" ]; then
    echo "Cleanup ...."
    VERSION="${1:-0.0.11}" docker-compose down
    # docker container rm -f `docker container ps -qa`
    # docker system prune --all --volumes --force
    docker container ls -a
else
    # echo "Build containers ..."
    VERSION="${1:-0.0.11}" docker-compose up -d --build
    docker container ls
fi