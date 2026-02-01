import type { Project } from "./typeDefinitions";

/**
 * Enhanced markdown content processor
 * Handles image path transformations, relative links, and content validation
 */
export class MarkdownProcessor {
  /**
   * Processes markdown content to ensure all relative paths are properly transformed
   * @param content - Raw markdown content
   * @param projectDir - The project's directory path (relative to public/)
   * @returns Processed content with updated paths
   */
  static processContent(content: string, projectDir: string): string {
    let processed = content;

    // Transform markdown image links: ![alt](./image.jpg) -> ![alt](/projects/id/image.jpg)
    processed = this.transformImageLinks(processed, projectDir);

    // Transform relative links
    processed = this.transformRelativeLinks(processed, projectDir);

    // Enhance with additional features
    processed = this.enhanceMarkdown(processed);

    return processed;
  }

  /**
   * Transforms markdown image syntax
   */
  private static transformImageLinks(
    content: string,
    projectDir: string,
  ): string {
    return content.replace(
      /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
      (_match, alt, filename) => {
        return `![${alt}](/${projectDir.replace(/\\/g, "/")}/${filename})`;
      },
    );
  }

  /**
   * Transforms relative markdown links
   */
  private static transformRelativeLinks(
    content: string,
    projectDir: string,
  ): string {
    return content.replace(
      /\[([^\]]+)\]\(\.\/([^)]+)\)/g,
      (_match, text, path) => {
        return `[${text}](/${projectDir.replace(/\\/g, "/")}/${path})`;
      },
    );
  }

  /**
   * Enhances markdown with additional formatting and features
   */
  private static enhanceMarkdown(content: string): string {
    // Add support for images with captions (optional enhancement)
    // This can be extended based on specific needs

    return content;
  }

  /**
   * Validates markdown content for common issues
   */
  static validateContent(content: string): {
    valid: boolean;
    warnings: string[];
  } {
    const warnings: string[] = [];

    // Check for unclosed code blocks
    const codeBlockMatches = content.match(/```/g) || [];
    if (codeBlockMatches.length % 2 !== 0) {
      warnings.push("Possible unclosed code block detected");
    }

    // Check for broken image references
    const imageMatches = content.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || [];
    imageMatches.forEach((match) => {
      if (match.includes("](./")) {
        warnings.push(
          `Found relative image path that might not be processed: ${match}`,
        );
      }
    });

    // Check for empty alt text on images
    const emptyAltMatches = content.match(/!\[\]\(/g) || [];
    if (emptyAltMatches.length > 0) {
      warnings.push(
        `Found ${emptyAltMatches.length} image(s) with empty alt text`,
      );
    }

    return {
      valid: warnings.length === 0,
      warnings,
    };
  }

  /**
   * Extracts text summary from markdown content (first N characters of first paragraph)
   */
  static extractSummary(content: string, maxLength = 150): string {
    // Remove markdown formatting
    const cleaned = content
      .replace(/^#+\s+/gm, "") // Remove headings
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // Remove images
      .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1") // Remove bold/italic
      .trim();

    // Get first paragraph
    const firstPara = cleaned.split("\n\n")[0] || cleaned;

    if (firstPara.length <= maxLength) {
      return firstPara;
    }

    return firstPara.substring(0, maxLength).trim() + "...";
  }

  /**
   * Extracts all headings from markdown content
   */
  static extractHeadings(
    content: string,
  ): Array<{ level: number; text: string }> {
    const headings: Array<{ level: number; text: string }> = [];
    const headingMatches = content.matchAll(/^(#{1,6})\s+(.+)$/gm);

    for (const match of headingMatches) {
      if (match[1] && match[2]) {
        headings.push({
          level: match[1].length,
          text: match[2].trim(),
        });
      }
    }

    return headings;
  }
}

/**
 * Validates and processes project metadata and content together
 */
export function validateProjectContent(
  project: Project,
  content: string,
): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate project metadata
  if (!project.id?.trim()) {
    errors.push("Project ID is missing or empty");
  }

  if (!project.name?.trim()) {
    errors.push("Project name is missing or empty");
  }

  if (!project.image) {
    warnings.push("Project has no image");
  }

  if (!project.tags || project.tags.length === 0) {
    warnings.push("Project has no tags");
  }

  // Validate content
  const contentValidation = MarkdownProcessor.validateContent(content);
  warnings.push(...contentValidation.warnings);

  // Check for minimum content
  if (content.trim().length < 100) {
    warnings.push("Project content is very short (less than 100 characters)");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
