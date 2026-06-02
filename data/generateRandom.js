import { faker } from "@faker-js/faker"

// docIds
const lenDocId = 10
for (let i = 0; i < lenDocId; i++) {
  console.log(`${faker.string.alpha()}${faker.number.int({ min: 1000000, max: 9999999 })}`)
}

// addresses
const lenAddress = 10
for (let i = 0; i < lenAddress; i++) {
  console.log(faker.location.streetAddress())
}
