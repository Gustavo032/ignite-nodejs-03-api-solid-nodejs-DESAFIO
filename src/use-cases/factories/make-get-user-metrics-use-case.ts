import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { GetUserMetricsUseCase } from "../../use-cases/get-user-metrics"

export function makeGetUserMetricsUseCase(){
	const petsRepository = new PrismaPetsRepository()
	const useCase = new GetUserMetricsUseCase(petsRepository)
	
	return useCase
}	