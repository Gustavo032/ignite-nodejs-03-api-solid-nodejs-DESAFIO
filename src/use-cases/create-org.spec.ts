import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org'

// testes unitários: testam uma parte isolada do nosso código;
// a idéia é que consigamos testar a parte de cadastro da aplicação, fora das dependecias(sem DB etc...)
// Os teste unitários Nunca vão tocar em camadas externas da nossa aplicação

// Testes unitários são muitos por aplicações. Eles precisam ter muita velocidade e sem conflitos entre eles.
// Aqui tô testando o hash das senhas, tá sendo testado, mas com um Banco de Dados ficticios

let orgsRepository:InMemoryOrgsRepository
let sut:CreateOrgUseCase

describe('Create Org Use Case', () => {
	beforeEach(()=>{
		orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
	})
	
  it('should be able to create gym', async () => {
    const { org } = await sut.execute({
      name: 'JavaScript Org',
			description: null,
			phone: '11971689500',
			address: 'itapevi',
			cnpj: '05.942.000/0000-00',
			email: 'gustavoramosrock@gmail.com',
			password: 'testepassword',
		})

    expect(org.id).toEqual(expect.any(String))
  })

})
