import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-pets-repository copy"
import { FetchUserCheckInsHistoryUseCase } from "../../use-cases.old/fetch-user-check-ins-history"

export function makeFetchUserCheckInsUseCase(){
	const checkInsRepository = new PrismaCheckInsRepository()
	const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
	
	return useCase
}	