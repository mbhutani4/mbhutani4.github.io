import fs from "fs";
import matter from "gray-matter";
import type { Project } from "./typeDefinitions";

const projectsDir = "projects";

export function getAllProjects() {
  const projectsDirPath = process.cwd() + "/" + projectsDir;
  const filePaths = getAllMarkdownFilePaths(projectsDirPath);
  const projects = filePaths.map((path) => readMarkdownFile(path).project);
  return projects.sort(({ order: a = 0 }, { order: b = 0 }) => b - a);
}

export function getProject(projectName: string) {
  const projectFilePath =
    process.cwd() + "/" + projectsDir + "/" + projectName + ".md";
  return readMarkdownFile(projectFilePath);
}

function readMarkdownFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { data, content } = matter(fileContent);
  return { content, project: data as Project };
}

function getAllMarkdownFilePaths(dirPath: string): string[] {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((file) => file.isFile() && file.name.endsWith("md"))
    .map((file) => `${dirPath}/${file.name}`);
}
