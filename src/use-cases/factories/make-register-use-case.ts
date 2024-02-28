import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../../use-cases/register-user"

export function makeRegisterUseCase(){
	const usersRepository = new PrismaUsersRepository()
	const registerUseCase = new RegisterUseCase(usersRepository)
	
	return registerUseCase
}	