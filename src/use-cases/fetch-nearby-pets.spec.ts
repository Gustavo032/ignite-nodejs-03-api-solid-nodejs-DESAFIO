import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNeabyPetsUseCase } from './fetch-nearby-pets';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FetchNeabyPetsUseCase;

describe('Fetch Nearby Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchNeabyPetsUseCase(petsRepository);
  });

  it('should be able to fetch nearby pets', async () => {
    // Criar uma organização com a cidade correta
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
			
		 
		 // Criar pets associados à organização
			await petsRepository.create({
				name: 'Max',
				age: 3,
				race: 'Golden Retriever',
				category: 'Dog',
				address: 'itapevi',
				observation: 'Friendly dog',
				orgId: org.id // Usar o ID da organização
			});
			
			await petsRepository.create({
				name: 'Bella',
        age: 2,
        race: 'Labrador',
        category: "Dog",
				address: 'jandira',
        observation: 'Active dog',
        orgId: org.id // Usar o ID da organização
			});
			
			const { pets } = await sut.execute({
				city: 'itapevi', // Certifique-se de usar a cidade correta
				page: 1
			});
						
			expect(pets).toHaveLength(1)
			expect(pets).toEqual([
			expect.objectContaining({ name: 'Max'}),
		])
		});
		
	});