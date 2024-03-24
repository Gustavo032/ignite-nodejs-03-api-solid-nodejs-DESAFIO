import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Org, User, Pet } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'

interface FetchNeabyPetsUseCaseRequest {
  city: string
	page: number

}

// SOLID - 5 principios da programação
// D = Dependecy Inversion Princple
//

interface FetchNeabyPetsUseCaseResponse {
	pets: Pet[]
}

export class FetchNeabyPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
  city, page
  }: FetchNeabyPetsUseCaseRequest): Promise<FetchNeabyPetsUseCaseResponse> {
		
    const pets = await this.petsRepository.findManyNearby(city, page)

		return {
    	pets,
    }

  }
}
