import fastify from 'fastify'

const server = fastify()

interface IQueryString {
    name: string;
}

interface IHeaders { }

interface GreetingReply {
    200: { greeting: string }
    302: { url: string }
    '4xx': { error: string }
}

server.get<{
    Querystring: IQueryString,
    Headers: IHeaders,
    Reply: GreetingReply
}>('/hello', async (request, reply) => {
    const { name } = request.query
    reply.code(200).send({greeting: `Hello ${name || 'World'}!`})
})

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
