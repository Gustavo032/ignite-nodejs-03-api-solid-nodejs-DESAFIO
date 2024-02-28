import { Pet, User } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface RegisterPetUseCaseRequest{
	id?: string | undefined,
	name: string,
	age: number,
	race: string,
	observation?: string | null | undefined,
	created_at?: string | Date | undefined,
	orgId: string
}

interface RegisterPetUseCaseResponse {
	pet: Pet
}

export class RegisterPetUseCase{
	constructor(
		private petsRepository: PetsRepository,
		private orgsRepository: OrgsRepository
	){}
	
	async execute({orgId, age, name, race, created_at, id, observation}: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse>{
		const org = await this.orgsRepository.findByOrgId(orgId)

		if(!org){
			throw new ResourceNotFoundError();
		}
		
		const pet = await this.petsRepository.create({
			orgId: org.id,
			age,
			name,
			race,
			created_at,
			id,
			observation,
		})
		
		return {
			pet
		}
	}
}