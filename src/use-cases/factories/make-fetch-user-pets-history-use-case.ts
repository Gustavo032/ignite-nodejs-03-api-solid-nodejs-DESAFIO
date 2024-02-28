import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { FetchUserCheckInsHistoryUseCase } from "../../use-cases.old/fetch-user-pets-history"

export function makeFetchUserCheckInsUseCase(){
	const petsRepository = new PrismaPetsRepository()
	const useCase = new FetchUserCheckInsHistoryUseCase(petsRepository)
	
	return useCase
}	