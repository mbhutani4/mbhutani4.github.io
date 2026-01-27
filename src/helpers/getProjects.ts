import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project } from "./typeDefinitions";

const projectsDir = path.join("public", "projects");

export function getAllProjects() {
  const projectsDirPath = path.join(process.cwd(), projectsDir);
  const filePaths = getAllMarkdownFilePaths(projectsDirPath);
  const projects = filePaths.map((path) => getMdProjectDetails(path));
  return projects.sort(({ order: a = 0 }, { order: b = 0 }) => b - a);
}

export function getProject(projectId: string) {
  const projectFilePath = path.join(
    process.cwd(),
    projectsDir,
    projectId,
    "index.md",
  );

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

function getMdProjectDetails(filePath: string): Project {
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { data } = matter(fileContent);

  return {
    ...(data as Project),
    image: data.image
      ? replaceImagePath(data.image, path.dirname(filePath))
      : "",
  };
}

function readMarkdownFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { data, content } = matter(fileContent);
  const dirname = path.dirname(filePath);
  const contentWithUpdatedPaths = content.replace(
    /\]\(\.\//g,
    `](/${path.relative(path.join(process.cwd(), "public"), dirname)}/`,
  );

  return {
    content: contentWithUpdatedPaths,
    project: {
      ...(data as Project),
      image: data.image
        ? replaceImagePath(data.image, path.dirname(filePath))
        : "",
    },
  };
}

function getAllMarkdownFilePaths(dirPath: string): string[] {
  const mdFiles = fs.globSync("**/index.md", { cwd: dirPath });

  return mdFiles.map((file) => path.join(dirPath, file));
}

function replaceImagePath(imgPath: string, dirPath: string): string {
  return imgPath.replace(
    "./",
    `/${path.relative(path.join(process.cwd(), "public"), dirPath)}/`,
  );
}
