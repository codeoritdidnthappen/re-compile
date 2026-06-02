import { faker } from "@faker-js/faker"

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generateProgram = (state, year) => {
  return {
      name: state.name,
      year: year,
      abbreviation: state.abbreviation,
      applied: randomInt(10, 40) ,
      accepted: randomInt(8, 35),
      completed: randomInt(5, 20),
      retention: randomInt(80, 98),
      attendance: randomInt(80, 98),
      jobs: randomInt(5, 30),
      techJobs: randomInt(0, 2)
    }
}



export const generatePrograms = (length, state, year) => Array.from({ length }, (_, i) => generateProgram(state, year))
