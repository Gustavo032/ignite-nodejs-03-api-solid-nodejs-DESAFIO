export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('E-Mail Already Exists.')
  }
}
