'use strict'

function generateAuthResponse (principalId, effect, methodArn, dataError) {
  const policyDocument = generatePolicyDocument(effect, methodArn)

  return {
    principalId,
    policyDocument,
    context: {
      retorno: JSON.stringify(
        {
          data: [],
          errors: [dataError]
        }
      )
    }
  }
}

// Política utilizada pelo AWS para permitir ou não o acesso aos recursos do apiGateway
function generatePolicyDocument (effect, methodArn) {
  if (!effect || !methodArn) return null

  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: methodArn
      }
    ]
  }
  return policyDocument
}

module.exports.authorizer = async (event) => {
  const methodArn = event.methodArn

  const allowAccess = true
  if (allowAccess) {
    // Permitir acesso
    return generateAuthResponse('user', 'Allow', methodArn, {})
  }

  // Ao negar o acesso pode ser por erro de execução, informa-lo ao contexto
  const dataError = {
    msg: 'Caso exista algum error'
  }

  // Negar acesso
  return generateAuthResponse('user', 'Deny', methodArn, dataError)
}
