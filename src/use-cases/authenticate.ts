
import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../use-cases/errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest{
	email: string
	password: string
}

interface AuthenticateUseCaseResponse {
	user: User
}

export class AuthenticateUseCase{
	constructor(
		private usersRepository: UsersRepository,
	){}
	
	async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
		// auth
		// buscar email do usuário no banco
		// comparar hash da senha no banco de dados

		const user = await this.usersRepository.findByEmail(email)

		if(!user){
			throw new InvalidCredentialsError()
		}

		const doesPasswordsMatch = await compare(password, user.password_hash)

		if(!doesPasswordsMatch){
			throw new InvalidCredentialsError()
		}

		return {
			user
		}
	}
}