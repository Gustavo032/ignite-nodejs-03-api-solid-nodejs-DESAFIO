import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SearchOrgsUseCase } from './search-orgs'

let orgsRepository: InMemoryOrgsRepository
let sut: SearchOrgsUseCase

describe('Search Orgs Use Case', () => {
  beforeEach( async () => {
    orgsRepository = new InMemoryOrgsRepository()
    // principal variável que está sendo testada
    sut = new SearchOrgsUseCase(orgsRepository)

  })

  it('should be able to search for orgs', async () => {
		
		await orgsRepository.create({
			name: 'JavaScript Org',
			description: null,
			phone: '11911911911',
			address: 'jandira',
			cnpj: '05.942.000/0000-00',
			email: 'gustavo@gmail.com',
			password_hash: 'secretpassword',
		})
		
		await orgsRepository.create({
			name: 'TypeScript Org',
			description: null,
			phone: '11911911911',
			address: 'jandira',
			cnpj: '05.942.000/0000-00',
			email: 'gustavo@gmail.com',
			password_hash: 'secretpassword',
		})
		
		
		const { orgs } = await sut.execute({
			query: 'JavaScript',
			page:1
    })
    
  
    expect(orgs).toHaveLength(1)
		expect(orgs).toEqual([
			expect.objectContaining({ name: 'JavaScript Org'}),
		])
  })

	it('should be able to fetch paginated org search', async () => {
		
		for (let i = 1; i <= 22; i++){
			await orgsRepository.create({
				name: `TypeScript Org ${i}`,
				description: null,
				phone: '11911911911',
				address: 'jandira',
				cnpj: '05.942.000/0000-00',
				email: 'gustavo@gmail.com',
				password_hash: 'secretpassword',
			})		
		}
		
		const { orgs } = await sut.execute({
			query: 'TypeScript',
			page: 2
    })
    
    expect(orgs).toHaveLength(2)
		expect(orgs).toEqual([
			expect.objectContaining({ name: 'TypeScript Org 21'}),
			expect.objectContaining({ name: 'TypeScript Org 22'})
		])
  })
})