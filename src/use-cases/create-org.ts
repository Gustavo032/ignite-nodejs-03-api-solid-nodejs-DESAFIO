import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

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
  constructor(private orgsRepository: OrgsRepository) {}

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
		
		if (orgWithSameEmail) {
      // return reply.status(409).send() //http

      throw new OrgAlreadyExistsError()
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
