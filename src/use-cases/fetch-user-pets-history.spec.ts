import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchUserPetsHistoryUseCase } from './fetch-user-pets-history'

// testes unitários: testam uma parte isolada do nosso código;
// a idéia é que consigamos testar a parte de cadastro da aplicação, fora das dependecias(sem DB etc...)
// Os teste unitários Nunca vão tocar em camadas externas da nossa aplicação

// Testes unitários são muitos por aplicações. Eles precisam ter muita velocidade e sem conflitos entre eles.
// Aqui tô testando o hash das senhas, tá sendo testado, mas com um Banco de Dados ficticios

let petsRepository: InMemoryPetsRepository
let sut: FetchUserPetsHistoryUseCase

describe('Fetch User Pets History Use Case', () => {
  beforeEach( async () => {
    petsRepository = new InMemoryPetsRepository()
    // principal variável que está sendo testada
    sut = new FetchUserPetsHistoryUseCase(petsRepository)

  })

  it('should be able to fetch pets history', async () => {
		
		await petsRepository.create({
			orgId: 'org-01',
			name: 'Scar', age: 10, race: 'race01', category: 'dog',
			userId: 'user-01',
		})
		
		await petsRepository.create({
			orgId: 'org-02',
			name: '234', age: 10, race: 'race0123', category: 'dog2',
			userId: 'user-01',
		})
		
		const { pets } = await sut.execute({
			userId: 'user-01',
			page:1
    })
    
  
    expect(pets).toHaveLength(2)
		expect(pets).toEqual([
			expect.objectContaining({ orgId: 'org-01'}),
			expect.objectContaining({ orgId: 'org-02'})
		])
  })

	it('should be able to fetch paginated user pets history', async () => {
		
		for (let i = 1; i <= 22; i++){
			await petsRepository.create({
				orgId: `org-${i}`,
				name: 'Scar', age: 10, race: 'race01', category: 'dog',
				userId: 'user-01',
			})
		}
		
		const { pets } = await sut.execute({
			userId: 'user-01',
			page: 2
    })
    
    expect(pets).toHaveLength(2)
		expect(pets).toEqual([
			expect.objectContaining({ orgId: 'org-21'}),
			expect.objectContaining({ orgId: 'org-22'})
		])
  })
})