
"use client";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

const sections = ["ABOUT", "PROJECTS", "EXPERIENCE", "CONTACT"];

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

export default function Home() {
  const [mainContent, setMainContent] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("ABOUT");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    let observer: IntersectionObserver;
    if (mainContent === null) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id.toUpperCase());
          }
        });
      }, options);

      // Store current refs in variable to avoid issues in cleanup
      const currentRefs = sectionRefs.current;
      sections.forEach((section) => {
        if (currentRefs[section]) {
          observer.observe(currentRefs[section] as HTMLElement);
        }
      });

      return () => {
        sections.forEach((section) => {
          if (currentRefs[section]) {
            observer.unobserve(currentRefs[section] as HTMLElement);
          }
        });
      };
    } else {
      setActiveSection("PROJECTS");
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [mainContent]);

  useEffect(() => {
    if (mainContent !== null) {
      document.getElementById("detail")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [mainContent]);

  const onBackClicked = () => {
    setMainContent(null);
  };

  const handleNavClick = (section: string) => {
    setMainContent(null);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const lineActive = (section: string, onClick: () => void) => (
    <li key={section} className="mb-4">
      <a onClick={onClick} className="group flex items-center py-3 cursor-pointer">
        <span className="nav-line nav-line-active mr-4 h-px w-16 bg-blue-500 transition-all group-hover:w-20"></span>
        <span className="nav-text text-xs font-bold uppercase tracking-widest text-blue-400 group-hover:text-blue-300">
          {section}
        </span>
      </a>
    </li>
  );

  const line = (section: string, onClick: () => void) => (
    <li key={section} className="mb-4">
      <a onClick={onClick} className="group flex items-center py-3 cursor-pointer">
        <span className="nav-line mr-4 h-px w-8 bg-gray-500 transition-all group-hover:w-16 group-hover:bg-blue-400"></span>
        <span className="nav-text text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-blue-300">
          {section}
        </span>
      </a>
    </li>
  );

  const BriefcaseIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        <path
          d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
        />
        <path
          d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
          className="stroke-zinc-400 dark:stroke-zinc-500"
        />
      </svg>
    )
  }

  const Role = ({ role }: { role: Role }) => {
    const startLabel =
      typeof role.start === 'string' ? role.start : role.start.label
    const startDate =
      typeof role.start === 'string' ? role.start : role.start.dateTime

    const endLabel = typeof role.end === 'string' ? role.end : role.end.label
    const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

    return (
      <li className="flex gap-4">
        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">

            <Image src={role.logo} alt="" className="h-8 w-8 rounded-full" width={28} height={28} unoptimized />

        </div>
        <dl className="flex flex-auto flex-wrap gap-x-2">
          <dt className="sr-only">Company</dt>
          <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {role.company}
          </dd>
          <dt className="sr-only">Role</dt>
          <dd className="text-xs text-zinc-500 dark:text-zinc-400">
            {role.title}
          </dd>
          <dt className="sr-only">Date</dt>
          <dd
            className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
            aria-label={`${startLabel} until ${endLabel}`}
          >
            <time dateTime={startDate}>{startLabel}</time>{' '}
            <span aria-hidden="true">—</span>{' '}
            <time dateTime={endDate}>{endLabel}</time>
          </dd>
        </dl>
      </li>
    )
  }

  const Resume = () => {
    const resume: Array<Role> = [
      {
        company: 'Red Piston',
        title: 'Software Developer',
        logo: '/images/redpiston.jpg',
        start: '2025',
        end: {
          label: 'Present',
          dateTime: new Date().getFullYear().toString(),
        },
      },
      {
        company: 'St. Clair College',
        title: 'Mobile Applications Development',
        logo: '/images/saintclair.jpg',
        start: '2020',
        end: '2024',
      },
    ]

    return (
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Work</span>
        </h2>
        <ol className="mt-6 space-y-4">
          {resume.map((role, roleIndex) => (
            <Role key={roleIndex} role={role} />
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen overflow-y-auto scroll-smooth bg-background">
      <div className="mx-auto min-h-screen max-w-screen-xl px-12 py-24 md:ps-28 sm:pe-12 sm:py-12 md:px-24 md:py-20 lg:px-24 lg:py-0 relative z-10">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div className="my-auto">
              <p className="text-xl max-sm:text-lg italic font-mono bg-gradient-to-tr from-sky-300 via-blue-500 to-blue-900 bg-clip-text text-transparent text-left">
                Hi, My Name is
              </p>
              <h1 className="mt-3 mb-3 font-semibold text-white text-7xl max-sm:text-6xl text-left">
                Nathan
                <br /> Schroeder.
              </h1>
              <p className="text-4xl max-sm:text-3xl mb-5 text-white italic font-mono text-left">
                Software Developer.
              </p>

              <a href="/nathan-schroeder-cv.pdf" download>
                <button className="relative h-12 overflow-hidden rounded-lg p-[1px] hidden lg:block md:block">
                  <span className="absolute inset-[-1000%] animate-spin bg-gradient-conic from-sky-300 via-blue-500 to-blue-900" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gray-800 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Download CV
                  </span>
                </button>
              </a>

              <nav className="mt-16 hidden lg:block">
                <ol className="list-none">
                  {sections.map((section) =>
                    section === activeSection
                      ? lineActive(section, () => handleNavClick(section))
                      : line(section, () => handleNavClick(section))
                  )}
                </ol>
              </nav>
            </div>
          </header>

          <main className="pt-12 lg:pt-24 md:pt-24 lg:w-1/2 lg:py-24">
            {mainContent == null ? (
              <>
                <section
                  id={"ABOUT"}
                  ref={(el) => {
                    sectionRefs.current["ABOUT"] = el;
                  }}
                  className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                >
                  <p className="text-white mb-8 font-bold text-xl">
                    About
                  </p>
                  <p className="text-gray-300">
                    Welcome to my portfolio! I&apos;m a software developer and UI
                    designer. I specialize in creating user-friendly,
                    scalable applications that solve real-world problems.
                    <br />
                    <br />
                    I ensure that every project I work on is both visually
                    appealing and highly functional. I enjoy collaborating
                    with others to bring creative ideas to life through
                    powerful applications.
                    <br />
                    <br />
                    Take a look around to explore my projects. I&apos;m always
                    excited to take on new challenges and work on innovative
                    solutions that can make a difference!
                  </p>
                </section>

                <section
                  id={"PROJECTS"}
                  ref={(el) => {
                    sectionRefs.current["PROJECTS"] = el;
                  }}
                  className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                >
                  <p className="text-white mb-8 font-bold text-xl">
                    Projects
                  </p>
                  <div className="text-gray-300">
                    Projects section content will go here...
                  </div>
                </section>

                <section
                  id={"EXPERIENCE"}
                  ref={(el) => {
                    sectionRefs.current["EXPERIENCE"] = el;
                  }}
                  className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                >
                  <p className="text-white mb-8 font-bold text-xl">
                    Experience
                  </p>
                  <div className="text-gray-300">
                    {/* <Card className="mb-8">
                      <h3 className="font-semibold text-white">Mobile Applications Development</h3>
                      <p className="text-blue-400">St. Clair College • 2020 - 2024</p>
                      <p className="mt-2">
                        In this program I learned to develop, test, and deploy a variety of native mobile and web applications for multiple platforms while also designing, modeling, implementing and maintain databases within.
                      </p>
                    </Card>

                    <div className="mb-8">
                      <h3 className="font-semibold text-white">Mobile App Developer</h3>
                      <p className="text-blue-400">Red Piston • 2025 - Present</p>
                      <p className="mt-2">
                        Current position working on mobile application development.
                      </p>
                    </div> */}

                    <Resume />
                  </div>
                </section>

                <section
                  id={"CONTACT"}
                  ref={(el) => {
                    sectionRefs.current["CONTACT"] = el;
                  }}
                  className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                >
                  <p className="text-white mb-8 font-bold text-xl">
                    Contact
                  </p>
                  <div className="text-gray-300">
                    Contact form will go here...
                  </div>
                </section>
              </>
            ) : (
              <div id="detail">
                <button onClick={onBackClicked} className="text-blue-400 hover:text-blue-300 mb-4">
                  ← Back to main
                </button>
                <div className="text-white">
                  Project detail view for item {mainContent}
                </div>
              </div>
            )}

            <p className="text-gray-500 mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              Portfolio designed and developed by me using Figma and Visual Studio Code.
              Built with React, TypeScript, Next.js and Tailwind CSS, and deployed on Vercel.
            </p>
          </main>

        </div>
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
