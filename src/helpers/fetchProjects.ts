import fs from "fs";
import matter from "gray-matter";
import type { Project } from "helpers/typeDefinitions";

const projectsPath = process.cwd() + "/public/projects/";

export const getMDFile = (folder: string) => {
  const folderPath = projectsPath + folder + "/";
  const fileName = "readme.md";
  const { data, content } = matter(
    fs.readFileSync(folderPath + fileName, {
      encoding: "utf-8",
    })
  );
  return {
    project: data as Project,
    markdown: content,
  };
};

export const getProjects = () => {
  return fs
    .readdirSync(projectsPath, { withFileTypes: true })
    .filter((f) => f.isDirectory())
    .map((dir) => getMDFile(dir.name).project)
    .sort(({ order: a = 0 }, { order: b = 0 }) => b - a);
};
