import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'

// testes unitários: testam uma parte isolada do nosso código;
// a idéia é que consigamos testar a parte de cadastro da aplicação, fora das dependecias(sem DB etc...)
// Os teste unitários Nunca vão tocar em camadas externas da nossa aplicação

// Testes unitários são muitos por aplicações. Eles precisam ter muita velocidade e sem conflitos entre eles.
// Aqui tô testando o hash das senhas, tá sendo testado, mas com um Banco de Dados ficticios

let orgsRepository:InMemoryOrgsRepository
let petsRepository:InMemoryPetsRepository
let sut:RegisterPetUseCase

describe('Create a Pet UseCase', () => {
	beforeEach(()=>{
		orgsRepository = new InMemoryOrgsRepository()
		petsRepository = new InMemoryPetsRepository()
  
		sut = new RegisterPetUseCase(petsRepository, orgsRepository)
	})
	
  it('should be able to register a pet in org', async () => {

		const org = await orgsRepository.create({
			id: '1',
			description: 'Grooming service',
			phone: '123456789',
			cnpj: '12345678901234',
			email: 'grooming@example.com',
			address: 'itapevi', // Certifique-se de que a cidade está correta
			password_hash: 'hashedpassword',
			name: 'Pet Grooming',
		});

    const { pet } = await sut.execute({
			age: 10,
			name: 'namedog-01',
			orgId: org.id,
			race: 'Javascript',
			created_at: new Date(),
			id: 'dog-01',
			observation: 'cachorro com suspeitas de tal coisas',
			category: 'dog',
			userId: null,
			address: 'itapevi',
		})

    expect(pet.id).toEqual(expect.any(String))
  })
''
})
