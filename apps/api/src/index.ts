import fastify from 'fastify'

const server = fastify()

server.get('/', async (request, response) => {
  return response.send('hello world')
})

server.listen({ port: 8080 }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at http://localhost:8080`)
})