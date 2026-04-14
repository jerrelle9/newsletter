export const gdtdStructure = {
  leader: {
    name: "Marlon Persad",
    role: "General Manager",
    image: "/leaders/marlon.png",
  },
  teams: [
    {
      name: "Engineering Platforms",
      initials: "EP",
      color: "from-[var(--teal)] to-[var(--blue)]",
      seniorManager: {
        name: "Dmytro Larrinenko",
        role: "Senior Manager, Group Engineering",
      },
      managers: [{ name: "Adrian Lee", role: "Manager" }],
      reports: [
        {
          name: "Serhii Sypalo",
          role: "Engineering Manager/AWS DevOps Technical Lead",
        },
        { name: "Oleksandr Soshenko", role: "Technical Lead" },
        { name: "Satish Maharaj", role: "AWS DevOps Engineer" },
        { name: "Michael Sam", role: "AWS DevOps Engineer" },
        { name: "Jonathan Joseph", role: "AWS DevOps Engineer" },
        { name: "Danelle Modeste", role: "Azure DevOps Engineer" },
      ],
    },
    {
      name: "Digital Products",
      initials: "DP",
      color: "from-[var(--blue)] to-[var(--purple)]",
      seniorManager: {
        name: "Dmytro Larrinenko",
        role: "Senior Manager, Group Engineering",
      },
      managers: [{ name: "Kiran Ramkel", role: "Manager" }],
      reports: [
        { name: "Anh Diep", role: "GDO Technical Lead" },
        { name: "Vitalii Levash", role: "Cards Technical Lead" },
        { name: "Denys Bloshenko", role: "SuperApp Technical Lead" },
      ],
    },
    {
      name: "Group Digital Products",
      initials: "GDP",
      color: "from-[var(--green)] to-[var(--teal)]",
      seniorManager: {
        name: "David Kell",
        role: "Senior Manager, Group Digital Products",
      },
      managers: [{ name: "Sasha Ramoutar", role: "Manager" }],
      reports: [
        { name: "Kimone Baldeo", role: "IT BA" },
        { name: "Ihor Yehorov", role: "IT BA" },
        { name: "Vidhi Narendra Shah", role: "IT BA" },
        { name: "Vanessa Somra", role: "IT BA" },
        { name: "Nicholas Seegobin", role: "IT Project Lead" },
      ],
    },
  ],
};
