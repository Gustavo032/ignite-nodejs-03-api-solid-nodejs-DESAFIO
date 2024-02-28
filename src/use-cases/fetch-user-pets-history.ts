import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "../use-cases/errors/resource-not-found";

interface FetchUserPetsHistoryUseCaseRequest{
	userId: string
	page: number
}

interface FetchUserPetsHistoryUseCaseResponse {
	pets: Pet[]
}

export class FetchUserPetsHistoryUseCase{
	constructor(
		private petsRepository: PetsRepository,
	){}
	
	async execute({userId, page}: FetchUserPetsHistoryUseCaseRequest): Promise<FetchUserPetsHistoryUseCaseResponse>{
		const pets = await this.petsRepository.findManyByUserId(userId, page)
		
		return {
			pets
		}
	}
}