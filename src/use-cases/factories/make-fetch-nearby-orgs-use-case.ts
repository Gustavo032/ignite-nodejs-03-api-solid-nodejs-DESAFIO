import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { FetchNeabyOrgsUseCase } from "../fetch-nearby-pets"

export function makeFetchNearbyGymsUseCase(){
	const petsRepository = new PrismaOrgsRepository()
	const useCase = new FetchNeabyOrgsUseCase(petsRepository)
	
	return useCase
}	