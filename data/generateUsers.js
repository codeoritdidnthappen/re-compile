import { faker } from "@faker-js/faker"
import * as argon2 from "argon2"

const generateUser = async () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const password = await argon2.hash("test")
  return {
    firstName: firstName,
    lastName: lastName,
    email: `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}@${faker.internet.domainName()}`,
    username: `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`,
    password: password,
    roles: [ faker.helpers.arrayElement([ "Case Manager" ]) ],
    avatar: ""
  }
}

export const generateUsers = async (length) => {
  const users = []
  for (let i = 0; i < length; i++) {
    users.push(await generateUser())
  }
  return users
}