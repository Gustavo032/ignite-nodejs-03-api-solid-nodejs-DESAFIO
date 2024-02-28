import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: GetUserMetricsUseCase

describe('Ger User Metrics Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetUserMetricsUseCase(petsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await petsRepository.create({
      orgId: 'org-02',
			name: '234', age: 10, race: 'race0123', category: 'dog2',
			userId: 'user-01',
    })

    await petsRepository.create({
      orgId: 'org-02',
			name: '234', age: 10, race: 'race0123', category: 'dog2',
			userId: 'user-01',
    })

    const { petsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(petsCount).toEqual(2)
  })
})