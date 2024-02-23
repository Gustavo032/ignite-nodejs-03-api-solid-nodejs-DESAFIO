import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-pets-repository copy"
import { CheckInUseCase } from "../../use-cases.old/check-in"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-orgs-repository"

export function makeCheckInUseCase(){
	const checkInsRepository = new PrismaCheckInsRepository()
	const gymsRepository = new PrismaGymsRepository() 
	const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)
	
	return useCase
}	