Hyperledger Explorer
=======

Hyperledger Explorer is a simple, powerful, easy-to-use, highly maintainable, open source browser for viewing activity on the underlying blockchain network.

## Building the required Docker Images

We need the following images to be built to use the `explorer`:

1. `distributedid/postgres`

This can be done by executing the following command inside the `bcmanager`:

```
bcmanager$ docker build -t distributedid/postgres -f ./docker/Dockerfile.postgres .
```

1. `distributedid/explorer`

This can be done by executing the command inside the `bcmanager`:

```
bcmanager$ docker build -t distributedid/explorer -f ./docker/Dockerfile.explorer .
```

## How to run it ?

Steps:

Note: run within the __bcmanager__ repository

1. To run the `diid.network`. Enter the commands separately:

```
bcmanager$ make startEnv
```
```
bcmanager$ make initExchChannel initPrivChannel
```
```
bcmanager$ make sendIdentity sendEvent
```
```
bcmanager$ make queryID
```

Note: run in a new window - still in the __bcmanager__ repository

1. Navigate to the root directory of the `postgres` image by entering:
(This will take you to the root of the `docker-compose.yml` file, which contains the image)

```
cd /github.com/distributedID/bcmanager/docker/explorer
```

1. Use the command to launch the `postgres` image:

```
bcmanager/docker/explorer$ docker-compose up postgres-provider.diid.network
```

Note: run within a new window within the __blockchain-explorer__ repository

1. Install the required packages in the blockchain-explorer repository:

```
blockchain-explorer$ npm install
blockchain-explorer/client$ npm install
blockchain-explorer/client$ npm run build
```

1. Use the command to launch the `explorer` and run this command in a separate
window in the `blockchain-explorer` repository:

```
blockchain-explorer$ npm start
```

1. Open the web-browser and access the `explorer` at `http://localhost:11000` .


## How to stop it?

Note: In the last window where the `blockchain-explorer` network was started.

1. Tear down the network by entering the following command:
```
blockchain-explorer$ ^C (Ctrl-C)
```

Note: In the window where the `postgres` image was built.

1. Tear down the image by entering the following command:

```
bcmanager/docker/explorer$ ^C (Ctrl-C)
```

Note: In the first window where the `diid.network` network was ran.

1. Tear down the network by entering:

```
bcmanager$ make stopEnv
```

Note: These commands need to be preformed to properly tear down the networks so that they can be built in the future.


## Directory Structure
```
├── app            Application backend root
	├── db			   Postgres script and help class
	├── listener       Websocket listener
	├── metrics        Metrics
	├── mock_server	   Mock server used for development
	├── service        The service
	├── socket		   Push real time data to front end
	├── test		   Endpoint tests
	├── timer          Timer to post information periodically
	└── utils          Various utility scripts
├── client          Web Ui

```


## Requirements

Following are the software dependencies required to install and run hyperledger explorer
* nodejs 6.9.x (Note that v7.x is not yet supported)
* PostgreSQL 9.5 or greater

Hyperledger Explorer works with Hyperledger Fabric 1.0.  Install the following software dependencies to manage fabric network.
* docker 17.06.2-ce [https://www.docker.com/community-edition]
* docker-compose 1.14.0 [https://docs.docker.com/compose/]

## Clone Repository

Clone this repository to get the latest using the following command.

- `git clone https://github.com/hyperledger/blockchain-explorer.git`.
- `cd blockchain-explorer`.

## Database setup

Connect to PostgreSQL database.

- `sudo -u postgres psql`

Run create database script.

- `\i app/db/explorerpg.sql`
- `\i app/db/updatepg.sql`

Run db status commands.

- `\l` view created fabricexplorer database
- `\d` view created tables

## Fabric network setup

 Setup your own network using [Build your network](http://hyperledger-fabric.readthedocs.io/en/latest/build_network.html) tutorial from Fabric. Once you setup the network, please modify the values in `config.json` accordingly.

## Running hyperledger-explorer

On another terminal.

- `cd blockchain-explorer`
- Modify config.json to update network-config.
	- Change "fabric-path" to your fabric network path,
	example: "/home/user1/workspace/fabric-samples" for the following keys: "tls_cacerts", "key", "cert".
	- Final path for key "tls_cacerts" will be:  "/home/user1/workspace/fabric-samples/first-network/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt".

- Modify config.json to update one of the channel
	- pg host, username, password details.
```json
 "channel": "mychannel",
 "pg": {
		"host": "127.0.0.1",
		"port": "5432",
		"database": "fabricexplorer",
		"username": "hppoc",
		"passwd": "password"
	}
```

If you are connecting to a non TLS fabric peer, please modify the
protocol (`grpcs->grpc`) and port (`9051-> 9050`) in the peer url and remove the `tls_cacerts`. Depending on this key, the application decides whether to go TLS or non TLS route.

## Build Hyperledger Explorer

On another terminal.

- `cd blockchain-explorer/app/test`
- `npm install`
- `npm run test`
- `cd blockchain-explorer`
- `npm install`
- `cd client/`
- `npm install`
- `npm test -- -u --coverage`
- `npm run build`

## Run Hyperledger Explorer

From new terminal.

- `cd blockchain-explorer/`
- `./start.sh`  (it will have the backend up).
- `tail -f log.log` (view log)
- Launch the URL http://localhost:8080 on a browser.

## License

Hyperledger Explorer Project source code is released under the Apache 2.0 license. The README.md, CONTRIBUTING.md files, and files in the "images", "__snapshots__", and "mockData" folders are licensed under the Creative Commons Attribution 4.0 International License. You may obtain a copy of the license, titled CC-BY-4.0, at http://creativecommons.org/licenses/by/4.0/.
