import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterOrgUseCase } from './register-org'

// testes unitários: testam uma parte isolada do nosso código;
// a idéia é que consigamos testar a parte de cadastro da aplicação, fora das dependecias(sem DB etc...)
// Os teste unitários Nunca vão tocar em camadas externas da nossa aplicação

// Testes unitários são muitos por aplicações. Eles precisam ter muita velocidade e sem conflitos entre eles.
// Aqui tô testando o hash das senhas, tá sendo testado, mas com um Banco de Dados ficticios

let orgsRepository:InMemoryOrgsRepository
let usersRepository:InMemoryUsersRepository
let sut:RegisterOrgUseCase

describe('Create Org Use Case', () => {
	beforeEach(()=>{
		orgsRepository = new InMemoryOrgsRepository()
		usersRepository = new InMemoryUsersRepository()
  
		sut = new RegisterOrgUseCase(orgsRepository, usersRepository)
	})
	
  it('should be able to create org', async () => {
    const { org } = await sut.execute({
      name: 'JavaScript Org',
			description: null,
			phone: '11911911911',
			address: 'jandira',
			cnpj: '05.942.000/0000-00',
			email: 'gustavo@gmail.com',
			password: 'secretpassword',
		})
    expect(org.id).toEqual(expect.any(String))
  })

})
