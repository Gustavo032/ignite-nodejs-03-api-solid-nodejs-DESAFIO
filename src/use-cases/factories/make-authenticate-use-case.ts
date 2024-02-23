import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../../use-cases.old/authenticate"

export function makeAuthenticateUseCase(){
	const usersRepository = new PrismaUsersRepository()
	const authenticateUseCase = new AuthenticateUseCase(usersRepository)
	
	return authenticateUseCase
}	