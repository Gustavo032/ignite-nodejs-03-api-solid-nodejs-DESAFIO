import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterOrgUseCase } from "../register-org"
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"

export function makeCreateGymUseCase(){
	const orgsRepository = new PrismaOrgsRepository()
	const usersRepository = new PrismaUsersRepository()
	const useCase = new RegisterOrgUseCase(orgsRepository, usersRepository)
	
	return useCase
}	