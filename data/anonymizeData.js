// import "dotenv/config"
// import { faker } from "@faker-js/faker"
// import data from "./attendance/FSP Attendance Report.json" with { type: "json" }
// console.log("data", data)

// data.forEach(month => {
//   console.log(month.month)
//   month.students.forEach(student => {
//     console.log(`firstName: ${student.firstName}, lastNAme: ${student.lastName}, docNumber: ${student.docNumber}`)
//   })
// })

import fs from "fs/promises"
import { faker } from "@faker-js/faker"

// Faker settings
faker.locale = "en_US"

// Site data
const filePath = "./attendance/Lowell Attendance Report.json"
const filePathScrubbed = "./attendance/Lowell Attendance Report.scrubbed.json"
const sex = "male" // faker.helpers.arrayElement([ "female", "male"])

try {
  // Read file
  const rawData = await fs.readFile(filePath, "utf8")

  // Parse JSON
  const data = JSON.parse(rawData)

  // Make student map
  const map = new Map()
  
  data.forEach(month => {
    month.students.forEach(student => {
      if (!map.get(student.docNumber)) {
        const firstName = faker.person.firstName(sex)
        const lastName = faker.person.lastName(sex)
        map.set(student.docNumber, { firstName: faker.person.firstName(sex), lastName: faker.person.lastName(sex), docId: `${faker.string.alpha()}${faker.number.int({ min: 1000000, max: 9999999 })}` })
      }
    })
  })

  // Anonymize data
  data.forEach(month => {
    console.log(month.month)
    month.students.forEach(student => {
      if (map.get(student.docNumber)) {
        const { firstName, lastName, docId } = map.get(student.docNumber)
        student.firstName = firstName
        student.lastName = lastName
        student.docId = docId
        delete student.docNumber
      }
    })
  })

  // Convert back to string (with 2-space indentation for readability)
  const updatedJson = JSON.stringify(data, null, 2)

  // Write updated JSON file
  await fs.writeFile(filePathScrubbed, updatedJson, "utf8")
  console.log("JSON file successfully updated!")

} catch (error) {
  console.error("Error processing the file:", error)
}



// April 2026
// firstName: Philip, lastNAme: Angulo, docNumber: W36203
// firstName: Judance, lastNAme: Barber, docNumber: W37547
// firstName: Charles, lastNAme: Eaton, docNumber: 460002
// firstName: Korey, lastNAme: Farley , docNumber: E71132
// firstName: Daniel, lastNAme: Gibbs, docNumber: E54775
// firstName: Michael, lastNAme: Greg, docNumber: K72611
// firstName: Glenn, lastNAme: Jones, docNumber: J37089
// firstName: Christopher, lastNAme: Lindsay, docNumber: U07958
// firstName: Kennedy, lastNAme: Lumpkin, docNumber: B61780
// firstName: Chase, lastNAme: Mongillo, docNumber: B52624
// firstName: Jerry, lastNAme: Pifer, docNumber: J21995
// firstName: Samuel, lastNAme: Thomas, docNumber: 451519
// firstName: Ricardo, lastNAme: Zamora, docNumber: X68349
// firstName: Kamaron, lastNAme: Ingram, docNumber: X98125
// firstName: Naytron, lastNAme: Enoch, docNumber: G15295
// firstName: Miguel, lastNAme: Herrera, docNumber: R74394
// firstName: Jarvis, lastNAme: Vaughn, docNumber: G15970
// firstName: Phillip, lastNAme: James, docNumber: J10274
// May 2026
// firstName: Philip, lastNAme: Angulo, docNumber: W36203
// firstName: Judance, lastNAme: Barber, docNumber: W37547
// firstName: Charles, lastNAme: Eaton, docNumber: 460002
// firstName: Korey, lastNAme: Farley , docNumber: E71132
// firstName: Daniel, lastNAme: Gibbs, docNumber: E54775
// firstName: Michael, lastNAme: Greg, docNumber: K72611
// firstName: Glenn, lastNAme: Jones, docNumber: J37089
// firstName: Christopher, lastNAme: Lindsay, docNumber: U07958
// firstName: Kennedy, lastNAme: Lumpkin, docNumber: B61780
// firstName: Chase, lastNAme: Mongillo, docNumber: B52624
// firstName: Samuel, lastNAme: Thomas, docNumber: 451519
// firstName: Ricardo, lastNAme: Zamora, docNumber: X68349
// firstName: Kamaron, lastNAme: Ingram, docNumber: X98125
// firstName: Naytron, lastNAme: Enoch, docNumber: G15295
// firstName: Miguel, lastNAme: Herrera, docNumber: R74394
// firstName: Jarvis, lastNAme: Vaughn, docNumber: G15790
// firstName: Phillip, lastNAme: James, docNumber: J10274