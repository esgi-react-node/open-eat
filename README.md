# open-eat

## Requirements

- Git
- Docker
- Docker Compose
- GNU/Make

## Installation

```console
$ git clone https://github.com/esgi-react-node/open-eat.git
$ cd open-eat
```

## Commands

Command | Description
---|---
`make start` | Start the Docker Compose services.
`make install` | Install all the dependencies.
`make firebase` | Start the Firebase Cloud Functions emulator.
`make client` | Start the client application.
`make restart` | Restart the Docker Compose services.
`make stop` | Stop the Docker Compose services.

## Yarn

Where `[CMD]` is the yarn command to run.

### Client

```console
$ docker-compose exec client yarn [CMD]
```

### Firebase

```console
$ docker-compose exec firebase yarn [CMD]
```

### Firebase Functions

```console
$ docker-compose exec firebase yarn --cwd functions [CMD]
```

