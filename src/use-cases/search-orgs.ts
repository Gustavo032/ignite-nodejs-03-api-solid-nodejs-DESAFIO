import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface SearchOrgsUseCaseRequest {
  query: string
  page: number
}

// SOLID - 5 principios da programação
// D = Dependecy Inversion Princple
//

interface SearchOrgsUseCaseResponse {
  orgs: Org[]
}
export class SearchOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
  query, page
  }: SearchOrgsUseCaseRequest): Promise<SearchOrgsUseCaseResponse> {
		
    const orgs = await this.orgsRepository.searchMany(query, page)

    return {
      orgs: orgs,
    }
  }
}
