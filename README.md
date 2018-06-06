Hyperledger Explorer
=======

Hyperledger Explorer is a simple, powerful, easy-to-use, highly maintainable, open source browser for viewing activity on the underlying blockchain network.

## Directory Structure
```
├── app            Application backend root
	├── db			Postgres script and help class
	├── listener       Websocket listener
	├── metrics        Metrics
	├── mock_server	   Mock server used for development
	├── service        The service
	├── socket	Push real time data to front end
	├── test	Endpoint tests
	├── timer          Timer to post information periodically
	└── utils          Various utility scripts
├── client          Web Ui
	├── build       	Build
	├── node_modules    Node Modules
	├── public	   		Holds the files for the tab bar
	└── src          	Source Files


```

## Requirements

Following are the software dependencies required to install and run hyperledger explorer
* nodejs 6.9.x (Note that v7.x is not yet supported)
* PostgreSQL 9.5 or greater

Hyperledger Explorer works with Hyperledger Fabric 1.0.  Install the following software dependencies to manage fabric network.
* docker 17.06.2-ce [https://www.docker.com/community-edition]
* docker-compose 1.14.0 [https://docs.docker.com/compose/]

## Clone Repository

1. Clone the `blockchain-explorer` repository into your local DistributedID folder. To get the latest version use the following command:

```
git clone https://github.com/distributedID/blockchain-explorer
```

1. Navigate to the `blockchain-explorer` repository using the following command:

```
cd blockchain-explorer
```

## Database setup

1. Connect to PostgreSQL database by entering the following command:

```
sudo -u postgres psql
```

1. Run create database script by entering the following commands:

```
\i app/db/explorerpg.sql
```
```
\i app/db/updatepg.sql

```

1. Run db status commands by entering the following commands:

```
\l
```
Note: view created fabricexplorer database

```
\d
```
Note: view created tables


## Building the required Docker Images

We need to build two images to properly use the `explorer`:

1. Build the postgres image, located at `distributedid/postgres`. To build this image enter the following command:

```
bcmanager$ docker build -t distributedid/postgres -f ./docker/Dockerfile.postgres .
```

1.  Build the explorer image, located at `distributedid/explorer`. To build this image enter the following command:

```
bcmanager$ docker build -t distributedid/explorer -f ./docker/Dockerfile.explorer .
```

## How to start it?

Steps:

### Window 1:

Note: Run within the __bcmanager__ repository

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

### Window 2:

Note: Open a new window and run in the __bcmanager__ repository

1. Navigate to the root directory of the `postgres` image by entering:
(This will take you to the root of the `docker-compose.yml` file, which contains the image)

```
cd /github.com/distributedID/bcmanager/docker/explorer
```

1. Use the command to launch the `postgres` image:

```
bcmanager/docker/explorer$ docker-compose up postgres-provider.diid.network
```

### Window 3:

Note: Open a new window and run within the __blockchain-explorer__ repository. These install commands must be run when a new branch is started or a navigated to.

1. Install the required packages in the blockchain-explorer repository. By executing the following commands:

```
blockchain-explorer$ npm install
```
```
blockchain-explorer/client$ npm install
```

### Window 4:

Note: Open a new window and run within the __blockchain-explorer__ repository

1. Use the following commands to launch the `explorer` network:

```
blockchain-explorer/client$ npm run build
```
```
blockchain-explorer$ npm start
```
Note: If editing the source code, the two commands above must be re-run to compile any changes made. If this is not done the explorer will not display any changes!

1. Open the web-browser and access the `explorer` at `http://localhost:11000` .


## How to stop it?

Note: In the last window where the `explorer` network was started.

1. Tear down the network by entering the following command:
```
blockchain-explorer$ ^C (Ctrl-C)
```

Note: In the window where the `postgres` image was built.

1. Tear down the image by entering the following command:

```
bcmanager/docker/explorer$ ^C (Ctrl-C)
```
```
bcmanager/docker/explorer$ docker-compose down
```

Note: In the first window where the `diid.network` network was ran.

1. Tear down the network by entering:

```
bcmanager$ make stopEnv
```

Note: These commands need to be preformed to properly tear down the networks so that they can be built in the future. Many problems can occur if these commands are not preformed.


## Troubleshooting:
Common problems experienced and easy solutions:

1. Ran into the problem `Error: listen EADDRINUSE :::11000`? Solution:
```
Run the commands explained in the 'How to stop it?' section
```


## License

Hyperledger Explorer Project source code is released under the Apache 2.0 license. The README.md, CONTRIBUTING.md files, and files in the "images", "__snapshots__", and "mockData" folders are licensed under the Creative Commons Attribution 4.0 International License. You may obtain a copy of the license, titled CC-BY-4.0, at http://creativecommons.org/licenses/by/4.0/.
