const resolvers = {
    Query: {
        ping: (a, b, c) => {
            console.log(a, b, c)
            return 'Pong madafaka'
        },
        hello: () => 'World'
    }
}

module.exports = resolvers
