export class RegisterAlreadyExistsError extends Error {
  constructor() {
    super('E-Mail Already Exists.')
  }
}
