import type { Project } from "../src/helpers/typeDefinitions";

const delta: Project = {
  id: "delta",
  name: "Delta",
  // logo: "/images/delta.jpg",
  images: "/images/delta.jpg",
  description:
    "A mobile based platform where residents can engage with their community and can either benefit from it or help the other residents in their day-to-day work.",
};

const fa: Project = {
  id: "fa",
  name: "FA",
  images: [],
};

const projects: Project[] = [delta, fa];

export default projects;
