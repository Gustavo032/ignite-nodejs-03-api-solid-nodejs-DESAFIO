# ignite-nodejs-03-api-solid-nodejs-DESAFIO
Project developed to test my experience in the technologies seen during the "api-solid" module of the NodeJS course 🎉


[checkins] 
[pet] -- id
name
age
race 
observation

users
users -- id
name
cpf
email
phone
password

[gyms]
[orgs] -- id
name
cnpj
email
address
tel
password

@@lista de pets - 1(org) pra N(pets)


>>> criar useCase

>>> criar repositories

>>> criar in-memory 

>>> terminar useCase

>>> criar spec.ts

Após terminar todos usecases e testar:
>> criar PrismaRepositories

>> criar factories para todos use cases

>> criar controllers

#RFs (Requisito Funcional) (funcionalidade seca: ex> usuário pode fazer checkin)

	- [] Deve ser possível cadastrar uma org
	- [] Deve ser possível cadastrar um pet
	- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
	- [] Deve ser possível filtrar pets por suas características
	- [] Deve ser possível visualizar detalhes de um pet para adoção
	- [] Deve ser possível se cadastrar como uma ORG
	- [] Deve ser possível realizar login como uma ORG

#RNs (Regras de Negócio) (observações da funcionalidade seca: ex> usuário SÓ pode fazer checkin SE estiver a 10km da unidade)

	- [] Para listar os pets, obrigiatoramente precisamos informar a cidade 
	- [] Uma ORG precisa ter um endereço e um número de WhatsApp
	- [] Um pet deve estar ligado a uma ORG
	- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
	- [] Todos os filtros, além da cidade, são opcionais
	- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
	- [] O usuário não pode ter o mesmo email de uma org

#RNFs (requisitos não-funcionais) (requisitos mais tecnicos) (Qual estratégia de paginação, qual banco de dados usar, etc.)

	- [] a senha precisa estar criptografada
	- [] Os dados precisam estar em um banco PostgreSQL
	- [] Todas listas de dados precisam estar paginadas com 20 itens por página
	- [] JWT para fazer autenticação de uma ORG