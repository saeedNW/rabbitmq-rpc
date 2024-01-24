# RabbitMQ RPC Project

This is a simple RabbitMQ RPC (Remote Procedure Call) project that
consists of a server and a client. The server performs a computation
on a number received from the client and sends back the result.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (latest version)
- [Docker](https://www.docker.com) (latest version)

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/saeedNW/rabbitmq-rpc.git

   ```

2. Navigate to the project directory:

   ```shell
   cd rabbitmq-rpc
   ```

3. Install dependencies:

   ```shell
   npm install
   ```

## Running RabbitMQ with Docker

To run RabbitMQ using Docker, execute the following command:

```shell
docker run -d -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```

This command starts a RabbitMQ container with management UI available at <http://localhost:15672> (guest/guest).

## Running the Server

Start the server process by running:

```shell
node server.js
```

The server will be waiting for tasks to process.

## Running the Client

Start the client service by running:

```shell
node client.js <number>
```

Replace `<number>` with the numeric value you want to send to the server for processing. The client will communicate with the server via RabbitMQ.

## Example

1. Start the server:

   ```shell
   node server.js
   ```

2. In a separate terminal, start the client:

   ```shell
   node client.js 5
   ```

   This will send the number 5 to the server for processing.

3. Observe the server terminal for processing details, and the client terminal for the server's response.

## Notes

- The RabbitMQ server is assumed to be running locally on the default port (5672).
- The `amqplib` library is used for RabbitMQ communication, and `uuid` for generating unique identifiers.

## Contributors

We would like to thank the following individuals who have contributed to the
development of this project:

![avatar](https://images.weserv.nl/?url=https://github.com/erfanyousefi.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)
‎ ‎
‎ ![avatar](https://images.weserv.nl/?url=https://github.com/saeedNW.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)

[**Erfan Yousefi - Supervisor and instructor of the node.js programming course**](https://github.com/erfanyousefi/)

[**Saeed Norouzi - Back-end Developer**](https://github.com/saeedNW)

---

Feel free to explore and modify the project as needed.
