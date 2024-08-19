import { Publication, User } from "@/app/people/columns";
import { faker } from "@faker-js/faker";

faker.seed(123);
function createRandomUser(): User {
  const name = faker.person.fullName();
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];

  return {
    id: faker.string.uuid(),
    name,
    status: faker.helpers.arrayElement(["active", "inactive"]),
    role: faker.helpers.arrayElement([
      "Frontend Developer",
      "QA Engineer",
      "Backend Developer",
      "Engineering Manager",
      "Technical Lead",
      "System Administrator",
      "Software Engineer",
      "UI/UX Designer",
      "Data Analyst",
      "Full Stack Developer",
      "Marketing Specialist",
      "Sales Engineer",
      "HR Specialist",
      "Finance Analyst",
      "Support Engineer",
    ]),
    teams: Array.from({ length: faker.number.int({ min: 1, max: 6 }) }, () =>
      faker.helpers.arrayElement([
        "Design",
        "Product",
        "Marketing",
        "Sales",
        "Engineering",
        "Finance",
        "Customer Support",
        "Operations",
        "Human Resources",
      ])
    ),
    email: faker.internet.email({ firstName }),
    avatarUrl: faker.image.avatarLegacy(),
    dateOfBirth: faker.date.birthdate().toISOString(),
    gender: faker.person.sex(),
    nationality: faker.location.country(),
    contactNo: faker.phone.number(),
    workEmailId: faker.internet.exampleEmail({ firstName }),
    userId: faker.internet.displayName({ firstName }),
    researchPublications: Array.from(
      { length: faker.number.int({ min: 1, max: 1 }) },
      // () => ({
      //   title: faker.lorem.sentence(),
      //   summary: faker.lorem.paragraph(),
      //   publicationSource: faker.internet.domainName(),
      // })
      () =>
        faker.helpers.arrayElement([
          {
            title: "Continuous Deployment Pipelines: Best Practices",
            summary: `This research paper provides an overview of continuous deployment (CD) pipelines and outlines best practices 
                        for implementing CD in software development. The paper discusses the importance of automating the deployment 
                        process, integrating testing into the pipeline, and ensuring that deployments are both fast and reliable. 
                        The study includes case studies from companies that have successfully adopted CD practices.`,
            publicationSource: "DevOps Journal, 2021",
          },
        ])
    ) as Publication[],
  };
}
const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => createRandomUser());
};
export const fakerData = generateUsers(20);
