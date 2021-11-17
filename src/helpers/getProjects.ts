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

export function getProject(projectId: string) {
  const projectFilePath =
    process.cwd() + "/" + projectsDir + "/" + projectId + ".md";
  const parsed = readMarkdownFile(projectFilePath);
  const siblings = getSiblingProject(projectId);
  return {
    ...parsed,
    ...siblings,
  };
}

function getSiblingProject(projectId: string): {
  next: Project;
  prev: Project;
} {
  const allProjects = getAllProjects();
  const maxIndex = allProjects.length - 1;
  const index = allProjects.findIndex((project) => project.id === projectId);
  const nextIndex = index < maxIndex ? index + 1 : 0;
  const prevIndex = index > 0 ? index - 1 : maxIndex;
  return {
    next: allProjects[nextIndex]!,
    prev: allProjects[prevIndex]!,
  };
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
