import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-pets-repository copy"
import { GetUserMetricsUseCase } from "../../use-cases.old/get-user-metrics"

export function makeGetUserMetricsUseCase(){
	const checkInsRepository = new PrismaCheckInsRepository()
	const useCase = new GetUserMetricsUseCase(checkInsRepository)
	
	return useCase
}	