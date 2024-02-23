import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface FetchNeabyOrgsUseCaseRequest {
  city: string
}

// SOLID - 5 principios da programação
// D = Dependecy Inversion Princple
//

interface FetchNeabyOrgsUseCaseResponse {
  orgs: Org[]
}

export class FetchNeabyOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
  city
  }: FetchNeabyOrgsUseCaseRequest): Promise<FetchNeabyOrgsUseCaseResponse> {
		
    const orgs = await this.orgsRepository.findManyNearby({
			city: city
		})

    return {
      orgs: orgs,
    }
  }
}
