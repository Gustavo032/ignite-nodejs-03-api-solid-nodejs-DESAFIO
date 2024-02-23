import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-pets-repository copy"
import { ValidateCheckInUseCase } from "../../use-cases.old/validate-check-in"

export function makeValidateCheckInUseCase(){
	const checkInsRepository = new PrismaCheckInsRepository()
	const useCase = new ValidateCheckInUseCase(checkInsRepository)
	
	return useCase
}	