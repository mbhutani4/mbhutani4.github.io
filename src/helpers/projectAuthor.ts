/**
 * Project author CLI utilities
 * These helpers can be used to generate new project scaffolds and validate existing ones
 *
 * Example usage in scripts:
 * node -r ts-node/register scripts/createProject.ts --id my-project --name "My Project"
 */

import fs from "node:fs";
import path from "node:path";
import { validateProjectContent } from "./markdownProcessor";
import { validateProjectMetadata } from "./typeDefinitions";
import type { Project } from "./typeDefinitions";
import {
  generateProjectTemplate,
  validateProjectConfig,
  type ProjectAuthorConfig,
} from "./projectTemplates";

/**
 * Creates a new project directory structure with template files
 */
export function createNewProject(
  projectId: string,
  projectName: string,
  options?: {
    description?: string;
    tags?: string[];
    accent?: string;
    skipTemplate?: boolean;
  },
): {
  success: boolean;
  message: string;
  path?: string;
} {
  // Validate config
  const config: ProjectAuthorConfig = {
    id: projectId,
    name: projectName,
    image: "./project.jpg",
    description: options?.description,
    tags: options?.tags,
    accent: options?.accent,
  };

  const validation = validateProjectConfig(config);
  if (!validation.valid) {
    return {
      success: false,
      message: `Validation failed:\n${validation.errors.join("\n")}`,
    };
  }

  // Create directory
  const projectDir = path.join(process.cwd(), "public", "projects", projectId);

  if (fs.existsSync(projectDir)) {
    return {
      success: false,
      message: `Project directory already exists: ${projectDir}`,
    };
  }

  try {
    fs.mkdirSync(projectDir, { recursive: true });

    // Create template file
    if (!options?.skipTemplate) {
      const template = generateProjectTemplate(config);
      const templatePath = path.join(projectDir, "index.md");
      fs.writeFileSync(templatePath, template, "utf-8");
    }

    // Create assets directory
    const assetsDir = path.join(projectDir, "assets");
    fs.mkdirSync(assetsDir, { recursive: true });

    return {
      success: true,
      message: `Project created successfully at ${projectDir}`,
      path: projectDir,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create project: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Validates all projects in the portfolio
 * Returns detailed validation results
 */
export function validateAllProjects(projectsDir: string): {
  total: number;
  valid: number;
  invalid: number;
  results: Array<{
    id: string;
    path: string;
    valid: boolean;
    errors: string[];
    warnings: string[];
  }>;
} {
  const results = [];
  let validCount = 0;
  let invalidCount = 0;

  // Find all project markdown files
  const projectDirs = fs.readdirSync(projectsDir);

  for (const projectId of projectDirs) {
    const projectPath = path.join(projectsDir, projectId, "index.md");

    if (!fs.existsSync(projectPath)) {
      results.push({
        id: projectId,
        path: projectPath,
        valid: false,
        errors: ["No index.md file found"],
        warnings: [],
      });
      invalidCount++;
      continue;
    }

    try {
      const content = fs.readFileSync(projectPath, "utf-8");
      const { data } = parseMarkdownFrontmatter(content);

      // Validate metadata
      if (!validateProjectMetadata(data)) {
        results.push({
          id: projectId,
          path: projectPath,
          valid: false,
          errors: ["Invalid or missing required metadata"],
          warnings: [],
        });
        invalidCount++;
        continue;
      }

      // Validate content
      const project = data as Project;
      const markdown = extractMarkdownContent(content);
      const validation = validateProjectContent(project, markdown);

      results.push({
        id: projectId,
        path: projectPath,
        valid: validation.valid,
        errors: validation.errors,
        warnings: validation.warnings,
      });

      if (validation.valid) {
        validCount++;
      } else {
        invalidCount++;
      }
    } catch (error) {
      results.push({
        id: projectId,
        path: projectPath,
        valid: false,
        errors: [
          `Error reading project: ${error instanceof Error ? error.message : String(error)}`,
        ],
        warnings: [],
      });
      invalidCount++;
    }
  }

  return {
    total: projectDirs.length,
    valid: validCount,
    invalid: invalidCount,
    results,
  };
}

/**
 * Generates a validation report and optionally writes it to a file
 */
export function generateValidationReport(
  projectsDir: string,
  outputPath?: string,
): string {
  const validation = validateAllProjects(projectsDir);
  const timestamp = new Date().toISOString();

  let report = `# Project Validation Report\n\n`;
  report += `Generated: ${timestamp}\n`;
  report += `Total Projects: ${validation.total}\n`;
  report += `Valid: ${validation.valid} ✓\n`;
  report += `Invalid: ${validation.invalid} ✗\n\n`;

  if (validation.invalid > 0) {
    report += `## Issues Found\n\n`;

    for (const result of validation.results) {
      if (!result.valid || result.warnings.length > 0) {
        report += `### ${result.id}\n`;

        if (result.errors.length > 0) {
          report += `**Errors:**\n`;
          result.errors.forEach((error) => {
            report += `- ${error}\n`;
          });
        }

        if (result.warnings.length > 0) {
          report += `**Warnings:**\n`;
          result.warnings.forEach((warning) => {
            report += `- ${warning}\n`;
          });
        }

        report += "\n";
      }
    }
  } else {
    report += `## Status\nAll projects are valid! ✓\n\n`;
  }

  if (outputPath) {
    fs.writeFileSync(outputPath, report, "utf-8");
  }

  return report;
}

/**
 * Helper to parse markdown frontmatter
 */
function parseMarkdownFrontmatter(content: string): {
  data: Record<string, unknown>;
  markdown: string;
} {
  // Simple frontmatter parser (you can use gray-matter instead)
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    return { data: {}, markdown: content };
  }

  const [, yamlStr = "", markdown = ""] = frontmatterMatch;
  const data = parseYaml(yamlStr);

  return { data, markdown };
}

/**
 * Simple YAML parser for project frontmatter
 */
function parseYaml(yaml: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};

  // Parse key: value pairs
  const lines = yaml.split("\n");
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    // Handle array items
    if (trimmed.startsWith("- ")) {
      if (!currentArray) currentArray = [];
      currentArray.push(trimmed.substring(2).trim());
      continue;
    }

    // Handle key: value pairs
    if (trimmed.includes(":")) {
      if (currentArray && currentKey) {
        data[currentKey] = currentArray;
        currentArray = null;
      }

      const parts = trimmed.split(":");
      const key = parts[0];
      const valueParts = parts.slice(1);
      const value = valueParts.join(":").trim();

      if (!key) continue;

      currentKey = key.trim();

      // Parse different types
      if (value === "null") {
        data[currentKey] = null;
      } else if (value === "true") {
        data[currentKey] = true;
      } else if (value === "false") {
        data[currentKey] = false;
      } else if (!isNaN(Number(value))) {
        data[currentKey] = Number(value);
      } else {
        // Remove quotes if present
        data[currentKey] = value.replace(/^["']|["']$/g, "");
      }
    }
  }

  if (currentArray && currentKey) {
    data[currentKey] = currentArray;
  }

  return data;
}

/**
 * Helper to extract markdown content (remove frontmatter)
 */
function extractMarkdownContent(content: string): string {
  const match = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return match?.[1] ?? content;
}
