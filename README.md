## Setup and Run in Docker

Clone the github repository:

```
git clone https://github.com/nawad0/react-hakkaton
```

Navigate to the project directory:

```
cd react-app-dockerize
```

Run the command to build image and run containe in detach mode:

```
docker-compose up -d
```

Stop the container (if your want)

```
docker-compose down
```
Зайти в контейнер, там можно писать команды npm 
```
docker exec -it react-docker sh
```
