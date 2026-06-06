import "dotenv/config"
import { faker } from "@faker-js/faker"
import data from "./attendance/FSP Attendance Report.json" with { type: "json" }
console.log("data", data)

data.forEach(month => {
  console.log(month.month)
  month.students.forEach(student => {
    console.log(`firstName: ${student.firstName}, lastNAme: ${student.lastName}, docNumber: ${student.docNumber}`)
  })
})

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