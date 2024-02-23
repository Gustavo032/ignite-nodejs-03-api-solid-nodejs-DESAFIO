import { FetchNeabyGymsUseCase } from "../fetch-nearby-orgs"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-orgs-repository"

export function makeFetchNearbyGymsUseCase(){
	const gymsRepository = new PrismaGymsRepository()
	const useCase = new FetchNeabyGymsUseCase(gymsRepository)
	
	return useCase
}	