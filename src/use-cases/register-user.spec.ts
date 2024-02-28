import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '@/use-cases/register-user'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

// testes unitários: testam uma parte isolada do nosso código;
// a idéia é que consigamos testar a parte de cadastro da aplicação, fora das dependecias(sem DB etc...)
// Os teste unitários Nunca vão tocar em camadas externas da nossa aplicação

// Testes unitários são muitos por aplicações. Eles precisam ter muita velocidade e sem conflitos entre eles.
// Aqui tô testando o hash das senhas, tá sendo testado, mas com um Banco de Dados ficticios

let usersRepository:InMemoryUsersRepository
let sut:RegisterUseCase

describe('Register Use Case', () => {
	beforeEach(()=>{
		usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
	})
	
  it('should HASH user PASSWORD upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'John12312@doe.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with SAME EMAIL twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'John@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
