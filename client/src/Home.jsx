import { useEffect } from "react"
import { useNavigate, Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  return (
    <div className="bg-base-100">
      {/* Hero */}
      <section className="hero min-h-[55vh] bg-base-200">
        <div className="hero-content text-center max-w-5xl">
          <div>
            <div className="badge badge-secondary badge-lg mb-4">
              Transforming Lives Through Technology Education
            </div>

            <h1 className="text-5xl md:text-7xl font-bold">
              Building Software Engineers.
              <br />
              Creating Second Chances.
            </h1>

            <p className="py-6 text-lg max-w-3xl mx-auto">
              We provide incarcerated individuals with industry-focused
              education in Full Stack Software Engineering, equipping them
              with the technical and professional skills needed to secure
              meaningful employment and successfully reenter society.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn btn-primary btn-lg">
                Support Our Mission
              </button>

              <button className="btn btn-outline btn-lg">
                Become a Hiring Partner
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Impact That Matters</h2>
            <p className="text-base-content/70 mt-4">
              Our success is measured by outcomes, employment, and lives changed.
            </p>
          </div>

          <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-title">Students Trained</div>
              <div className="stat-value text-primary">1,250+</div>
              <div className="stat-desc">
                Across correctional facilities nationwide
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Tech Job Placements</div>
              <div className="stat-value text-success">340+</div>
              <div className="stat-desc">
                Software, IT, QA, and technical support roles
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Other Employment</div>
              <div className="stat-value text-secondary">520+</div>
              <div className="stat-desc">
                Skilled and professional careers after release
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Completion Rate</div>
              <div className="stat-value">92%</div>
              <div className="stat-desc">
                Full Stack Engineering curriculum
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-200 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Technology Education?
              </h2>

              <p className="mb-4 text-lg">
                Technology careers provide pathways to economic mobility,
                lifelong learning, and meaningful employment. By teaching
                modern software engineering skills, we help individuals
                prepare for careers in an increasingly digital economy.
              </p>

              <p className="mb-4">
                Students learn front-end development, back-end development,
                databases, APIs, cloud fundamentals, version control,
                professional communication, and collaborative software
                development practices.
              </p>

              <p>
                Beyond technical skills, we focus on problem solving,
                teamwork, accountability, and career readiness.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <h3 className="card-title justify-center">
                    Full Stack Development
                  </h3>
                  <p>Modern web application development</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <h3 className="card-title justify-center">
                    Career Readiness
                  </h3>
                  <p>Resume, interview, and workplace skills</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <h3 className="card-title justify-center">
                    Industry Projects
                  </h3>
                  <p>Real-world software development experience</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <h3 className="card-title justify-center">
                    Employment Support
                  </h3>
                  <p>Connecting graduates with opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Outcome Driven Results</h2>
            <p className="text-base-content/70 mt-4">
              Every program is measured against meaningful outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h3 className="card-title">Employment</h3>
                <p>
                  We track graduates who secure both technology and non-technology
                  employment after release.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h3 className="card-title">Program Completion</h3>
                <p>
                  Curriculum progress, certificate attainment, and
                  technical competency milestones are continuously measured.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h3 className="card-title">Long-Term Success</h3>
                <p>
                  We focus on sustainable career growth, community
                  reintegration, and economic opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">
              Help Change a Life Through Education
            </h2>

            <p className="max-w-3xl mx-auto text-lg opacity-90">
              Whether you're an employer, donor, volunteer, or advocate,
              your support helps create opportunities for individuals
              working to build a better future.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="card bg-primary-content text-primary shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Donate</h3>
                <p>
                  Fund curriculum development, technology resources, and
                  student support programs.
                </p>
                <button className="btn btn-secondary mt-4">
                  Donate Today
                </button>
              </div>
            </div>

            <div className="card bg-primary-content text-primary shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Hire Graduates</h3>
                <p>
                  Create employment opportunities for skilled and motivated
                  program graduates.
                </p>
                <button className="btn btn-secondary mt-4">
                  Become a Partner
                </button>
              </div>
            </div>

            <div className="card bg-primary-content text-primary shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Volunteer</h3>
                <p>
                  Mentor students and share industry expertise with future
                  software professionals.
                </p>
                <button className="btn btn-secondary mt-4">
                  Volunteer
                </button>
              </div>
            </div>

            <div className="card bg-primary-content text-primary shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Advocate</h3>
                <p>
                  Help expand access to education and workforce development
                  opportunities.
                </p>
                <button className="btn btn-secondary mt-4">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Education. Opportunity. Employment.
          </h2>

          <p className="text-lg mb-8">
            Together, we can help individuals develop valuable skills,
            secure employment, and build brighter futures.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn btn-primary btn-lg">
              Get Involved
            </button>

            <Link to="/impact" className="btn btn-outline btn-lg">
              View Impact Report
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home