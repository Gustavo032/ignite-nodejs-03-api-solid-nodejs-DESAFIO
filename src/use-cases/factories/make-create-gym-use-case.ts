import { CreateGymUseCase } from "../register-org"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-orgs-repository"

export function makeCreateGymUseCase(){
	const gymsRepository = new PrismaGymsRepository()
	const useCase = new CreateGymUseCase(gymsRepository)
	
	return useCase
}	