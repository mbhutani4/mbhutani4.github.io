import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Project,
  ProjectMetadata,
  ParsedProject,
} from "./typeDefinitions";
import {
  validateProjectMetadata,
  ProjectValidationError,
} from "./typeDefinitions";

const projectsDir = path.join("public", "projects");

/**
 * Gets all projects sorted by order (descending)
 * Results are cached for performance
 */
export function getAllProjects(): Project[] {
  const cwd = process.cwd();
  const cachePath = path.join(cwd, projectsDir);

  const filePaths = getAllMarkdownFilePaths(cachePath);
  const projects = filePaths
    .map((filePath) => {
      try {
        return getMdProjectDetails(filePath);
      } catch (error) {
        console.error(`Failed to parse project at ${filePath}:`, error);
        return null;
      }
    })
    .filter((project): project is Project => project !== null);

  // Sort by order descending, handling undefined order values
  const sorted = projects.sort(({ order: a = 0 }, { order: b = 0 }) => b - a);

  return sorted;
}

/**
 * Gets a single project by ID with content and navigation siblings
 */
export function getProject(projectId: string): ParsedProject {
  const projectFilePath = path.join(
    process.cwd(),
    projectsDir,
    projectId,
    "index.md",
  );

  if (!fs.existsSync(projectFilePath)) {
    throw new Error(`Project not found: ${projectId}`);
  }

  const parsed = readMarkdownFile(projectFilePath);
  const siblings = getSiblingProjects(projectId);

  const result: ParsedProject = {
    ...parsed.project,
    content: parsed.content,
    ...siblings,
    project: parsed.project, // For backward compatibility
  };

  return result;
}

/**
 * Gets previous and next projects for navigation
 */
function getSiblingProjects(projectId: string): {
  next: Project;
  prev: Project;
} {
  const allProjects = getAllProjects();
  const maxIndex = allProjects.length - 1;
  const index = allProjects.findIndex((project) => project.id === projectId);

  if (index === -1) {
    throw new Error(`Project not found in list: ${projectId}`);
  }

  const nextIndex = index < maxIndex ? index + 1 : 0;
  const prevIndex = index > 0 ? index - 1 : maxIndex;

  return {
    next: allProjects[nextIndex]!,
    prev: allProjects[prevIndex]!,
  };
}

/**
 * Reads a markdown file and extracts frontmatter and content
 * Transforms relative image paths to absolute paths
 */
function readMarkdownFile(filePath: string): {
  content: string;
  project: Project;
} {
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { data, content } = matter(fileContent);
  const dirname = path.dirname(filePath);

  // Validate and type-assert the metadata
  if (!validateProjectMetadata(data)) {
    throw new ProjectValidationError(
      filePath,
      `Invalid or missing required fields. Expected: id (string), name (string)`,
    );
  }

  const metadata = data as ProjectMetadata;

  // Process content: transform relative paths to absolute
  const contentWithUpdatedPaths = processContentPaths(content, dirname);

  // Process metadata: validate and transform image paths
  const projectData: Project = {
    id: metadata.id,
    name: metadata.name,
    image: metadata.image ? replaceImagePath(metadata.image, dirname) : "",
    ...(metadata.description && { description: metadata.description }),
    ...(metadata.logo && { logo: replaceImagePath(metadata.logo, dirname) }),
    ...(metadata.accent && { accent: metadata.accent }),
    ...(metadata.tags && { tags: metadata.tags }),
    ...(metadata.order !== undefined && { order: metadata.order }),
  };

  return {
    content: contentWithUpdatedPaths,
    project: projectData,
  };
}

/**
 * Gets project details from frontmatter only (without content)
 */
function getMdProjectDetails(filePath: string): Project {
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { data } = matter(fileContent);

  // Validate metadata
  if (!validateProjectMetadata(data)) {
    throw new ProjectValidationError(
      filePath,
      `Invalid or missing required fields. Expected: id (string), name (string)`,
    );
  }

  const metadata = data as ProjectMetadata;
  const dirname = path.dirname(filePath);

  return {
    id: metadata.id,
    name: metadata.name,
    image: metadata.image ? replaceImagePath(metadata.image, dirname) : "",
    ...(metadata.description && { description: metadata.description }),
    ...(metadata.logo && { logo: replaceImagePath(metadata.logo, dirname) }),
    ...(metadata.accent && { accent: metadata.accent }),
    ...(metadata.tags && { tags: metadata.tags }),
    ...(metadata.order !== undefined && { order: metadata.order }),
  };
}

/**
 * Finds all markdown files in projects directory
 */
function getAllMarkdownFilePaths(dirPath: string): string[] {
  try {
    const mdFiles = fs.globSync("**/index.md", { cwd: dirPath });
    return mdFiles.map((file) => path.join(dirPath, file));
  } catch (error) {
    console.error(`Error reading markdown files from ${dirPath}:`, error);
    return [];
  }
}

/**
 * Transforms relative image paths in markdown content to absolute paths
 * Handles markdown image syntax: ![alt](./path)
 */
function processContentPaths(content: string, dirPath: string): string {
  const relativePath = path.relative(
    path.join(process.cwd(), "public"),
    dirPath,
  );

  // Replace relative markdown image links
  return content.replace(
    /\]\(\.\//g,
    `](/${relativePath.replace(/\\/g, "/")}/`,
  );
}

/**
 * Transforms image paths from relative to absolute public-relative paths
 * Handles both ./filename and filename formats
 */
function replaceImagePath(imgPath: string, dirPath: string): string {
  const cleanPath = imgPath.replace(/^\.\//, "");
  const relativePath = path.relative(
    path.join(process.cwd(), "public"),
    dirPath,
  );

  return `/${relativePath.replace(/\\/g, "/")}/${cleanPath}`;
}
