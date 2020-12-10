const { v4: uuidv4 } = require('uuid')

require('../resource/db/connection') ()

const SecretModel = require('../resource/db/models/Secret')

module.exports.create = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop =  false

    const { id: secretId } = event.pathParameters
    const { name, email } = JSON.parse(event.body)
    const externalId = uuidv4()

    try {

        const result = await SecretModel.updateOne(
            {
                externalId: secretId,
                'participants.email': { $ne: email }
            },
            {
                $push: {
                    participants: {
                        externalId,
                        name,
                        email,
                    }
                }
            }
        )

        if (!result.nModified) {
            throw new Error()
        }

        return {
            statusCode: 201,
            body: JSON.stringify({
                success: true,
                id: externalId,
            })
        }
        
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                succes: false,
            })
        }      
    }   
}

module.exports.delete = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop =  false

    const { id , participantId} = event.pathParameters
    const adminKey = event.headers['admin-key']

    try {
        const restult = await SecretModel.updateOne(
        {
            externalId: secretId,
        },
        {
            $pull: {
                participants: {
                    externalId: participantId,
                }
            }
        }
        )

        if (!restult.nModified) {
            throw new Error()
        }

        return {
            statusCode: 204,
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                succes: false,
            })
        }      
    }    
}