const mongoose = require('mongoose')

let conn = null

const URI = 'mongodb+srv://secret:iagomg@cluster0.jlrhc.mongodb.net/secret?retryWrites=true&w=majority'

module.exports = async () => {
    if (!conn) {
        conn = mongoose.connect(URI, {
            userNewUrlParser: true,
            useNewUrlIndex: true,
        })

        await conn
    }
}