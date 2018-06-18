Hyperledger Explorer
=======

Hyperledger Explorer is a simple, powerful, easy-to-use, highly maintainable, open source browser for viewing activity on the underlying blockchain network.

## Directory Structure
```
├── app            Application backend root
	├── db		   Postgres script and help class
	├── listener       Websocket listener
	├── metrics        Metrics
	├── mock_server	   Mock server used for development
	├── service        The service
	├── socket	   Push real time data to front end
	├── test	   Endpoint tests
	├── timer          Timer to post information periodically
	└── utils          Various utility scripts
├── client          Web Ui
	├── build           Build
	├── node_modules    Node Modules
	├── public	    Holds the files for the tab bar
	└── src             Source Files


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

2. Navigate to the `blockchain-explorer` repository using the following command:

```
cd blockchain-explorer
```

## Building Docker Images

You can build all the necessary Docker images from the `bcmanager` project:

```
make buildDockerImages
```

To build an image using local changes from the `blockchain-explorer` project:

```
docker build --build-arg REACT_APP_CLIENT=Provider -t distributedid/explorer-provider -f ./docker/Dockerfile.provider-explorer .
```
```
docker build --build-arg REACT_APP_CLIENT=Consumer -t distributedid/explorer-consumer -f ./docker/Dockerfile.consumer-explorer .

```

## Starting blockchain-explorer

Steps:

### Window 1:

Note: Run within the __bcmanager__ repository

1. To run the `diid.network`. Enter the commands separately:

   ```
   bcmanager$ make startNetwork initChannels
   bcmanager$ make startRestApi startIdentityWriter
   bcmanager$ make sendIdentity sendEvent
   bcmanager$ (cd fixtures/environments/local ; docker-compose up -d postgres-provider postgres-consumer)
   ```

If all these commands are successful, you will have a Network running in docker with:

- two initialized channels
- services running to write identities and events
- Postgres services running for `blockchain-explorer`

### Window 2:

Note: Open a new window and run in the __bcmanager__ repository.

1. To start the Explorer services in the Network using your local Docker image: 

   ```
   bcmanager $ make startExplorer
   ```
   
   Note: If editing the source code, you'll need to rebuild the Docker images in
   `blockchain-explorer` and restart the Explorer services.

### Access the GUI

1. Open the web-browser and access the Provider Explorer at `http://localhost:11000`.
2. Open the Consumer Provider at `https://localhost:11001`.


## How to stop it?

To stop the explorer:

```
bcmanager $ make stopExplorer
```

To tear down the network and start over:
```
bcmanager$ make stopEnv
```

Note: These commands need to be preformed to properly tear down the networks so
that they can be built in the future. Many problems can occur if these commands
are not preformed.


## Troubleshooting:
Common problems experienced and easy solutions:

1. Ran into the problem `Error: listen EADDRINUSE :::11000`? Solution:
```
Run the commands explained in the 'How to stop it?' section
```


## License

Hyperledger Explorer Project source code is released under the Apache 2.0 license. The README.md, CONTRIBUTING.md files, and files in the "images", "__snapshots__", and "mockData" folders are licensed under the Creative Commons Attribution 4.0 International License. You may obtain a copy of the license, titled CC-BY-4.0, at http://creativecommons.org/licenses/by/4.0/.
