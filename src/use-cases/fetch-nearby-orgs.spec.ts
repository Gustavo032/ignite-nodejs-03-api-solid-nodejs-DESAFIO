import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FetchNeabyOrgsUseCase } from './fetch-nearby-orgs'

let gymsRepository: InMemoryOrgsRepository
let sut: FetchNeabyOrgsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach( async () => {
    gymsRepository = new InMemoryOrgsRepository()
    // principal variável que está sendo testada
    sut = new FetchNeabyOrgsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby orgs', async () => {
		
		await gymsRepository.create({
			name: 'Near Org',
			description: null,
			phone: '11911911911',
			address: 'itapevi',
			cnpj: '05.942.000/0000-00',
			email: 'gustavo@gmail.com',
			password_hash: 'secretpassword'
		})
		
		await gymsRepository.create({
			name: 'Far Org',
			description: null,
			phone: '11911911911',
			address: 'jandira',
			cnpj: '05.942.000/0000-00',
			email: 'gustavo@gmail.com',
			password_hash: 'secretpassword',
		})
		
		const { orgs } = await sut.execute({
			city: 'itapevi'
    })
    
  
    expect(orgs).toHaveLength(1)
		expect(orgs).toEqual([
			expect.objectContaining({ address: 'itapevi'}),
		])
  })
})