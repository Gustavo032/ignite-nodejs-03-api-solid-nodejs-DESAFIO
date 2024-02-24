import { hash } from 'bcryptjs'
import { RegisterAlreadyExistsError } from './errors/register-already-exists-error'
import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface CreateOrgUseCaseRequest {
  name: string
  description: string | null
	phone: string
	cnpj: string
	email: string
	address: string
	password: string
}


interface CreateOrgUseCaseResponse {
  org: Org
}
export class CreateOrgUseCase {
  constructor(
		private orgsRepository: OrgsRepository,
		private usersRepository: UsersRepository
		) {}

  async execute({
    name,
		description,
		phone,
		cnpj,
		email,
		address,
		password
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {

		const password_hash = await hash(password, 6)

		const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
		const userWithSameEmail = await this.usersRepository.findByEmail(email)
		
		if (orgWithSameEmail || userWithSameEmail) {
      // return reply.status(409).send() //http

      throw new RegisterAlreadyExistsError()
    }
		
    const org = await this.orgsRepository.create({
			name,
			description,
			phone,
			cnpj,
			email,
			address,
			password_hash
		})

    return {
      org,
    }
  }
}
