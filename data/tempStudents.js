import perryville from "./imports/Perryville Attendance Report 2026.json" with { type: "json" }
// console.log("perryville", perryville)

perryville.forEach(month => {
  month.students.forEach(student => {
    console.log(`${student.firstName} ${student.lastName}`)
  })
})