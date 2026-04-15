export const gdtdStructure = {
  leader: {
    name: "Marlon Persad",
    role: "General Manager",
    image: "/staff/marlonpersad.png",
    message: "",
  },
  teams: [
    {
      name: "Engineering Platforms",
      initials: "EP",
      color: "from-[var(--teal)] to-[var(--blue)]",
      message: "Engineering Platforms ensure the Bank’s digital systems run reliably and securely, supporting online banking and internal services while delivering updates safely and in line with regulatory standards.",
      seniorManager: {
        name: "Dmytro Lavrinenko",
        // role: "Senior Manager, Group Engineering",
        image: "/staff/dmytrolavrinenko.jpg",
        message: "",
      },
      managers: [
        { name: "Adrian Lee", image: "staff/adrianlee2.png", message: "Adrian provides leadership for the Technology Platforms Engineering teams, managing DevOps and DevSecOps functions aligned with organizational strategy. His responsibilities include cloud infrastructure management, automated delivery pipelines, and integrated security controls across the development lifecycle." },
        // { name: "Adrian Lee", image: "", message: "" },
      ],
      reports: [
        { name: "Serhii Sypalo", role: "Engineering Manager / AWS DevOps Technical Lead", image: "/staff/serhii-sypalo.jpg", message: "" },
        { name: "Oleksandr Soshenko", role: "Azure Devops Technical Lead", image: "/staff/oleksandr-soshenko.jpg", message: "" },
        { name: "Satish Maharaj", role: "AWS DevOps Engineer", image: "/staff/satish-maharaj.jpg", message: "" },
        { name: "Michael Sam", role: "AWS DevOps Engineer", image: "/staff/michael-sam.jpg", message: "" },
        { name: "Jonathan Joseph", role: "AWS DevOps Engineer", image: "/staff/jonathan-joseph.jpg", message: "" },
        { name: "Danelle Modeste", role: "Azure DevOps Engineer", image: "/staff/danelle-modeste.jpg", message: "" },
        { name: "Nareina Mohammed", role: "Process Manager", image: "/staff/danelle-modeste.jpg", message: "" },
      ],
    },
    {
      name: "Digital Banking & Support Systems",
      initials: "DBBS",
      color: "from-[var(--teal)] to-[var(--blue)]",
      message: "",
      seniorManager: {
        name: "Dmytro Lavrinenko",
        // role: "Senior Manager, Group Engineering",
        image: "/staff/dmytrolavrinenko.jpg",
        message: "",
      },
      managers: [
        { name: "Nigel George", image: "/staff/nigelgeorge.jpg", message: "Nigel is responsible for the end‑to‑end oversight of the Bank’s digital banking platforms and supporting technologies. He ensures secure, resilient, and compliant Internet and Mobile Banking services through effective leadership of teams, vendors, and infrastructure." },
        // { name: "Adrian Lee", image: "", message: "" },
      ],
      reports: [
        { name: "Tsai-ann Chang", role: "AQA Engineer", image: "/staff/danelle-modeste.jpg", message: "" },
      ],
    },
    {
      name: "Engineering Products",
      initials: "DP",
      color: "from-[var(--blue)] to-[var(--purple)]",
      message: "Engineering Products leads teams that develop and improve the Bank’s systems, ensuring high‑quality delivery aligned with business objectives.",
      seniorManager: {
        name: "Dmytro Lavrinenko",
        role: "Senior Manager, Group Engineering",
        image: "/staff/dmytrolavrinenko.jpg",
        message: "",
      },
      managers: [
        { name: "Kiran Ramlakhan", role: "Manager", image: "/staff/kiranramlakhan.png", message: "" },
      ],
      reports: [
        { name: "Anh Diep", role: "GDO Technical Lead", image: "/staff/anh-diep.jpg", message: "" },
        { name: "Vitalii Levash", role: "Cards Technical Lead", image: "/staff/vitalii-levash.jpg", message: "" },
        { name: "Denys Bloshenko", role: "SuperApp Technical Lead", image: "/staff/denys-bloshenko.jpg", message: "" },
      ],
    },
    {
      name: "Digital Products",
      initials: "DP",
      color: "from-[var(--green)] to-[var(--teal)]",
      message: "Digital Products ensures the stability, security, and ongoing enhancement of the Bank’s Internet and Mobile Banking platforms.",
      seniorManager: {
        name: "David Kell",
        // role: "Senior Manager",
        image: "/staff/davidkell.png",
        message: "David works with a team of Digital Platform Owners and IT Business Analysts within GTDT, as well as designers, architect engineers, product owners and stakeholders from all parts of the business representing all the markets served by Republic Bank.",
      },
      managers: [
        { name: "Sasha Ramoutar", role: "Branch Digitalization", image: "/staff/sasharamoutar.png", message: "Sasha is leading the rollout of new digital tools in branches as part of the Bank’s digital transformation.Focusing on improving the customer journey and making daily work easier for branch staff, while supporting more efficient and modern branch operations." },
        { name: "Fahad Siddiqui", role: "Loan Management ", image: "/staff/fahadsiddiqui.png", message: "Fahad is leading the rollout of a group‑wide digital lending platform that enables faster, fully digital loan products across the Republic Group, replacing manual processes and supporting future growth." },
        { name: "Vasileios Kapralos", role: "Products", image: "/staff/vasileioskapralos.png", message: "Vasileios sets the long‑term vision and roadmap for the Bank's mobile and app platforms, ensuring they support business goals, regulatory needs, and deliver secure, customer‑focused solutions across all markets." },
        { name: "Kosti Reshetniak", role: "Instant Payment System (IPS)", image: "/staff/kostireshetniak.png", message: "Kosti leads the Group‑wide instant payments work, delivering one shared system that makes sending and receiving money faster, easier,and more reliable for customers." },
        { name: "Andrew Strelnykov", role: "Wealth Management", image: "/staff/andrewstrelnykov.png", message: "Andrew drives the strategy & delivery of the Bank's digital wealth capabilities. He leads the rollout of a new Wealth Management core system, and enhancements to the customer wealth portal, with a focus on delivering modern,accessible, and effective digital investing experiences for clients." },
        { name: "Nicholas Seegobin", role: "Digital Onboarding", image: "/staff/nicholaseegobin.png", message: "Nicholas leads the delivery of the Bank's Group Digital Onboarding platform, providing a seamless online onboarding experience for new and existing customers. He works closely with business and technology teams across the Group to deliver scalable, high‑qualitycapabilities that support the Bank's long-term digital transformation goals." },

      ],
      reports: [
              ],
    },
  ],
};
