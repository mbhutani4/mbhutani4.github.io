import fs from "fs";
import type { Project } from "helpers/typeDefinitions";

export const getProjects = (): Project[] =>
  fs
    .readdirSync(process.cwd() + "/projects")
    .map((file) => require("../../projects/" + file).default)
    .sort(({ order: a = 0 }: Project, { order: b = 0 }: Project) => b - a);
