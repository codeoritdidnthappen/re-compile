import { faker } from "@faker-js/faker"

// Real-world grantors that fund non-profits doing tech education with incarcerated individuals
const GRANTORS = [
  {
    organization: "Second Chance Act Program (DOJ/BJA)",
    contactTitle: "Program Officer",
    email: "askbja@usdoj.gov",
    phone: "202-514-6278",
    website: "https://bja.ojp.gov/program/second-chance-act",
    type: "government",
    purposePool: [
      "Reentry technology education and workforce development",
      "Digital literacy training for incarcerated individuals",
      "Post-release employment support and job placement services",
    ],
    amountRange: [250000, 1000000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "quarterly",
  },
  {
    organization: "Bureau of Justice Assistance (BJA) – Technology Innovation",
    contactTitle: "Grant Manager",
    email: "askbja@usdoj.gov",
    phone: "202-616-6500",
    website: "https://bja.ojp.gov",
    type: "government",
    purposePool: [
      "Technology-focused reentry programming and workforce development",
      "Cybersecurity and IT credentialing for justice-involved individuals",
    ],
    amountRange: [150000, 750000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "quarterly",
  },
  {
    organization: "Department of Labor – Reentry Employment Opportunities (REO)",
    contactTitle: "Grants Officer",
    email: "ETA.OSMIP@dol.gov",
    phone: "202-693-3045",
    website: "https://www.dol.gov/agencies/eta/reentry",
    type: "government",
    purposePool: [
      "Employment training and job placement for formerly incarcerated individuals",
      "Sector-based workforce development in technology industries",
    ],
    amountRange: [500000, 3000000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "quarterly",
  },
  {
    organization: "SAMHSA Offender Reentry Program",
    contactTitle: "Program Officer",
    email: "samhsainfo@samhsa.hhs.gov",
    phone: "1-877-726-4727",
    website: "https://www.samhsa.gov/criminal-juvenile-justice/orp",
    type: "government",
    purposePool: [
      "Substance abuse treatment integrated with digital skills training",
      "Mental health and reentry support services",
    ],
    amountRange: [200000, 900000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "quarterly",
  },
  {
    organization: "Ford Foundation – Creativity and Free Expression",
    contactTitle: "Program Officer",
    email: "office-of-communications@fordfoundation.org",
    phone: "212-573-5000",
    website: "https://www.fordfoundation.org",
    type: "foundation",
    purposePool: [
      "Criminal justice reform through education and technology access",
      "Digital equity and workforce development for marginalized communities",
    ],
    amountRange: [100000, 500000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "annual",
  },
  {
    organization: "JPMorgan Chase Foundation – Workforce Innovation",
    contactTitle: "Vice President, Philanthropy",
    email: "philanthropy@jpmorgan.com",
    phone: "212-270-6000",
    website: "https://www.jpmorganchase.com/impact/workforce-innovation",
    type: "corporate",
    purposePool: [
      "Second chance hiring and technology skills training",
      "Pathways to employment in financial technology and cybersecurity",
    ],
    amountRange: [50000, 300000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "biannual",
  },
  {
    organization: "Google.org",
    contactTitle: "Grants Manager",
    email: "googleorg@google.com",
    phone: "650-253-0000",
    website: "https://www.google.org",
    type: "corporate",
    purposePool: [
      "Digital skills and computer science education in correctional facilities",
      "Expanding access to technology education for underserved communities",
      "AI literacy and tech workforce development for justice-involved individuals",
    ],
    amountRange: [100000, 500000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "biannual",
  },
  {
    organization: "Microsoft Philanthropies",
    contactTitle: "Program Manager",
    email: "giving@microsoft.com",
    phone: "425-882-8080",
    website: "https://www.microsoft.com/en-us/corporate-responsibility/philanthropies",
    type: "corporate",
    purposePool: [
      "Technology skills training and Microsoft certification pathways",
      "Cloud computing and cybersecurity education for reentry populations",
    ],
    amountRange: [75000, 400000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "biannual",
  },
  {
    organization: "Arnold Ventures – Criminal Justice",
    contactTitle: "Senior Program Officer",
    email: "info@arnoldventures.org",
    phone: "713-554-0183",
    website: "https://www.arnoldventures.org/work/criminal-justice",
    type: "foundation",
    purposePool: [
      "Evidence-based reentry programming with technology components",
      "Reducing recidivism through education and workforce development",
    ],
    amountRange: [200000, 1500000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "annual",
  },
  {
    organization: "Lumina Foundation",
    contactTitle: "Program Director",
    email: "info@luminafoundation.org",
    phone: "317-951-5300",
    website: "https://www.luminafoundation.org",
    type: "foundation",
    purposePool: [
      "Postsecondary education access for incarcerated individuals",
      "Credential attainment and workforce readiness in technology fields",
    ],
    amountRange: [75000, 600000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "annual",
  },
  {
    organization: "Charles Koch Foundation – Criminal Justice",
    contactTitle: "Program Officer",
    email: "grants@charleskochfoundation.org",
    phone: "703-875-1770",
    website: "https://charleskochfoundation.org/our-work/criminal-justice",
    type: "foundation",
    purposePool: [
      "Vocational and technology education in prisons",
      "Second chance employment and reentry workforce development",
    ],
    amountRange: [50000, 250000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "annual",
  },
  {
    organization: "Pew Charitable Trusts – Public Safety Performance Project",
    contactTitle: "Director, Public Safety",
    email: "info@pewtrusts.org",
    phone: "215-575-9050",
    website: "https://www.pewtrusts.org/en/projects/public-safety-performance-project",
    type: "foundation",
    purposePool: [
      "Data-driven reentry programs and technology education",
      "Policy and programming to reduce recidivism through workforce skills",
    ],
    amountRange: [100000, 750000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "annual",
  },
  {
    organization: "Salesforce.org",
    contactTitle: "Philanthropy Program Manager",
    email: "foundation@salesforce.com",
    phone: "415-901-7000",
    website: "https://www.salesforce.org",
    type: "corporate",
    purposePool: [
      "Salesforce and CRM technology training for justice-involved individuals",
      "Tech workforce development and job placement for reentry populations",
    ],
    amountRange: [25000, 150000],
    states: ["AZ", "FL", "MA", "NE", "SC"],
    reportingFreq: "biannual",
  },
  {
    organization: "Arizona Community Foundation",
    contactTitle: "Grants Program Officer",
    email: "info@azfoundation.org",
    phone: "602-381-1400",
    website: "https://www.azfoundation.org",
    type: "foundation",
    purposePool: [
      "Workforce development and technology education for underserved Arizonans",
      "Community reentry support and digital skills programs",
    ],
    amountRange: [10000, 100000],
    states: ["AZ"],
    reportingFreq: "annual",
  },
  {
    organization: "The Boston Foundation",
    contactTitle: "Program Officer, Thriving Minds",
    email: "info@tbf.org",
    phone: "617-338-1700",
    website: "https://www.tbf.org",
    type: "foundation",
    purposePool: [
      "Workforce equity and technology access for justice-involved individuals in Greater Boston",
      "Digital skills and economic mobility for reentry populations",
    ],
    amountRange: [15000, 125000],
    states: ["MA"],
    reportingFreq: "annual",
  },
  {
    organization: "Nebraska Community Foundation",
    contactTitle: "Grants Coordinator",
    email: "ncf@nebraskacf.org",
    phone: "402-323-7330",
    website: "https://www.nebraskacf.org",
    type: "foundation",
    purposePool: [
      "Rural and statewide workforce development including technology training",
      "Reentry and second chance programs for Nebraskans",
    ],
    amountRange: [5000, 75000],
    states: ["NE"],
    reportingFreq: "annual",
  },
]

const STATUSES = ["active", "pending", "expired", "applied", "rejected"]
const STATUS_WEIGHTS = [0.45, 0.2, 0.15, 0.1, 0.1]

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomBool = (probability = 0.5) => Math.random() < probability

const weightedStatus = () => {
  const r = Math.random()
  let cumulative = 0
  for (let i = 0; i < STATUSES.length; i++) {
    cumulative += STATUS_WEIGHTS[i]
    if (r < cumulative) return STATUSES[i]
  }
  return "active"
}

const generateDates = (status) => {
  const now = new Date("2026-06-03")

  if (status === "active") {
    const startDate = faker.date.between({ from: "2023-01-01", to: "2025-06-01" })
    const endDate = faker.date.between({ from: "2026-06-04", to: "2028-12-31" })
    const nextReportDue = faker.date.between({ from: now, to: endDate })
    return { startDate, endDate, nextReportDue, applicationDeadline: null }
  }

  if (status === "pending") {
    const applicationDeadline = faker.date.between({ from: "2026-06-04", to: "2027-06-01" })
    const startDate = new Date(applicationDeadline)
    startDate.setMonth(startDate.getMonth() + randomInt(1, 3))
    const endDate = new Date(startDate)
    endDate.setFullYear(endDate.getFullYear() + randomInt(1, 3))
    return { startDate, endDate, nextReportDue: null, applicationDeadline }
  }

  if (status === "applied") {
    const applicationDeadline = faker.date.between({ from: "2025-01-01", to: "2026-06-03" })
    const startDate = new Date(applicationDeadline)
    startDate.setMonth(startDate.getMonth() + randomInt(2, 5))
    const endDate = new Date(startDate)
    endDate.setFullYear(endDate.getFullYear() + randomInt(1, 3))
    return { startDate, endDate, nextReportDue: null, applicationDeadline }
  }

  if (status === "expired") {
    const startDate = faker.date.between({ from: "2020-01-01", to: "2023-01-01" })
    const endDate = faker.date.between({ from: "2023-06-01", to: "2026-01-01" })
    const nextReportDue = null
    return { startDate, endDate, nextReportDue, applicationDeadline: null }
  }

  // rejected
  const applicationDeadline = faker.date.between({ from: "2022-01-01", to: "2025-12-31" })
  return { startDate: null, endDate: null, nextReportDue: null, applicationDeadline }
}

const generateGrant = (grantorOverride) => {
  const grantor = grantorOverride || faker.helpers.arrayElement(GRANTORS)
  const status = weightedStatus()
  const { startDate, endDate, nextReportDue, applicationDeadline } = generateDates(status)
  const amount = randomInt(...grantor.amountRange)
  const purpose = faker.helpers.arrayElement(grantor.purposePool)
  const renewalEligible = status === "active" ? randomBool(0.6) : status === "expired" ? randomBool(0.4) : false

  return {
    name: `${grantor.organization} – ${new Date(startDate || applicationDeadline || new Date()).getFullYear()} Grant`,
    grantor: {
      organization: grantor.organization,
      contactName: faker.person.fullName(),
      contactTitle: grantor.contactTitle,
      email: grantor.email,
      phone: grantor.phone,
      website: grantor.website,
    },
    type: grantor.type,
    purpose,
    amount,
    states: grantor.states,
    startDate,
    endDate,
    status,
    renewalEligible,
    reportingFreq: grantor.reportingFreq,
    nextReportDue,
    applicationDeadline,
    notes: randomBool(0.4) ? faker.lorem.sentence() : "",
  }
}

export const generateGrants = (length) =>
  Array.from({ length }, () => generateGrant())

export const generateGrantsFromAll = () =>
  GRANTORS.map((grantor) => generateGrant(grantor))
