# Gateway project

Sample project for managing gateways and their devices.

It counts with two projects: a server and a frontend, each one on a folder with that name.

# REST API

It was created using Node.js, Express.js, Prisma and a MongoDB Atlas database.

## Endpoints

- `GET /gateway/list`: return an array of gateways and its peripherals.
- `GET /gateway/:id`: receives an `id` and return, if found, all info about the gateway with that `id`.
- `POST /gateway/new`: receives a JSON with the `name`, `ip`, `peripherals` variables and creates it. It validates the ip address and make sure that there are no more than 10 peripheral devices per gateway.
- `POST /device/new`: receives a JSON with the `{ uid, vendor, dateCreated, status, id }` variables, where `id` is the Gateway's id, and creates a new peripheral device. It validates the ip address and make sure that there are no more than 10 peripheral devices per gateway.
- `DELETE /device/:id`: receives an `id` and deletes the associated peripheral device. It returns the other peripherals of the gateway.

# Frontend

It was created using React.js, TypeScript, Tailwind CSS and Vite. It's a single column layout, with a form to add new gateways on top and a gateway names list below. When a gateway name is clicked, it shows all the info for that specific gateway, including peripherals. Then you can add or remove peripherals from the gateway using buttons.
