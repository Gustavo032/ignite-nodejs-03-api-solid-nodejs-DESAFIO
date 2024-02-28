import { PetsRepository } from '@/repositories/pets-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  petsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const petsCount = await this.petsRepository.countByUserId(userId)

    return {
      petsCount,
    }
  }
}