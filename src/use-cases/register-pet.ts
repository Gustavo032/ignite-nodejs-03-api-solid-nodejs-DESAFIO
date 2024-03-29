import { Pet, User } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface RegisterPetUseCaseRequest{
	id: string,
	name: string,
	age: number,
	race: string,
	observation: string | null,
	created_at: Date,
	orgId: string,
	userId: string | null,
	category: string,
	address: string
}

interface RegisterPetUseCaseResponse {
	pet: Pet
}

export class RegisterPetUseCase{
	constructor(
		private petsRepository: PetsRepository,
		private orgsRepository: OrgsRepository
	){}
	
	async execute({orgId, age, name, race, created_at, id, observation, category, userId, address}: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse>{
		const org = await this.orgsRepository.findByOrgId(orgId)

		console.log(org + " has been registeredAAAAAAAAAAAAAAAAAAAregisteredAAAAAAAAAAAAAAAAAAAregisteredAAAAAAAAAAAAAAAAAAAregisteredAAAAAAAAAAAAAAAAAAAregisteredAAAAAAAAAAAAAAAAAAAregisteredAAAAAAAAAAAAAAAAAAAregisteredAAAAAAAAAAAAAAAAAAAregisteredAAAAAAAAAAAAAAAAAAAregisteredAAAAAAAAAAAAAAAAAAAregisteredAAAAAAAAAAAAAAAAAAA")
		if(!org?.id){
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
			category,
			userId,
			address,
		})
		
		return {
			pet
		}
	}
}