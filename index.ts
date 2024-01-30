import fastify from "fastify";

const server = fastify();

server.register(require("@fastify/multipart"));

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.post("/upload", async function (req, reply) {
  try {
    const data = await req.file();

    reply.status(200).send({
      fileName: data.filename,
    });
  } catch (error) {
    reply.status(400).send("something went wrong");
  }
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
