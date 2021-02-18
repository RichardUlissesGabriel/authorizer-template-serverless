# Authorizer Template Serverless

Esse projeto tem como objetivo servir de base para a construção dos lambdas Layers

Esse projeto também é utilizado no projeto [project-template-serverless](https://github.com/RichardUlissesGabriel/authorizer-template-serverless).

 ## Configuração
Realizar a alteração do arquivo de configuração serverless.yml
````yaml
functions:
  authorizer:
    handler: src/handler.authorizer
    # Utilizado o layer se preciso
    layers:
      - arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:layer:MiddyDependenciesNodeModule-${self:provider.accountDeploy}:latest
````

O desenvolvimento da funcionalidade deve ser escrito no arquivo ***src/handler.js***

***Atenção!!!*** 
Caso o authorizer possua dependências as mesmas ***devem*** ser instaladas e mantidas ao fazer o deploy do layer.

Em resumo enviar a pasta **node_module** para frente.

## Deploy
A realização do deploy é muito simples, com tudo definido e desenvolvido realizar o seguinte comando **serverless**

```
sls deploy --stage={stage}
```

## Utilização
Para a utilização do authorizer nos outros serviços é preciso adicionar a definição do authorizer no ***serverless.yml*** do microservice-template-serverless
```yaml
  # Bloco de código para a criação do authorizer para API, método de verificação de autenticação
  # eh necessário a criação de um lambda que será utilizado para a autenticação da API
  # O padrão do nome {nome da api}-authorizer
  authorizerConfig: 
    name: ${self:provider.apiName}-authorizer
    arn: arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:provider.apiName}-authorizer
    type: REQUEST
```
---
Após isso o serviço em questão já estará sob a validação do authorizer

***Atenção!!!***
O Authorizer precisa ser criado ***antes*** da utilização pelos outros microserviços

## Autores
*  **Richard Ulisses Gabriel** - *Trabalho inicial*.