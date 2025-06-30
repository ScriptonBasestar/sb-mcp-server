#!/usr/bin/env node
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, existsSync, readdirSync, writeFileSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the project root directory (parent of mcp-server)
const PROJECT_ROOT = resolve(__dirname, '../../');
const SCHEMAS_DIR = join(PROJECT_ROOT, 'schemas');

// Define schema types
const SCHEMA_TYPES = [
  'readme', 'api', 'architecture', 'features', 'tech_stack',
  'todo', 'backlog', 'changelog', 'contributing', 'prompt'
] as const;

type SchemaType = typeof SCHEMA_TYPES[number];

// Define license types
const LICENSE_TYPES = ['MIT', 'Apache-2.0', 'GPL-3.0'] as const;
type LicenseType = typeof LICENSE_TYPES[number];

// Define gitignore types
const GITIGNORE_TYPES = ['Node.js', 'Python', 'Go'] as const;
type GitignoreType = typeof GITIGNORE_TYPES[number];

// Template directories
const TEMPLATES_DIR = join(PROJECT_ROOT, 'schemas', 'templates');
const LICENSES_DIR = join(TEMPLATES_DIR, 'licenses');
const GITIGNORE_DIR = join(TEMPLATES_DIR, 'gitignore');

// Helper function to read schema files
function readSchemaFile(schemaType: SchemaType): string {
  const schemaPath = join(SCHEMAS_DIR, `schema.${schemaType}.md`);
  if (!existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }
  return readFileSync(schemaPath, 'utf-8');
}

// Helper function to read license templates
function readLicenseTemplate(licenseType: LicenseType): string {
  const licensePath = join(LICENSES_DIR, `${licenseType}.txt`);
  if (!existsSync(licensePath)) {
    throw new Error(`License template not found: ${licensePath}`);
  }
  return readFileSync(licensePath, 'utf-8');
}

// Helper function to fetch gitignore from GitHub API
async function fetchGitignoreFromGitHub(gitignoreType: string): Promise<string> {
  try {
    const response = await fetch(`https://api.github.com/gitignore/templates/${gitignoreType}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.source;
  } catch (error) {
    throw new Error(`Failed to fetch gitignore from GitHub: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper function to get available gitignore templates from GitHub
async function getAvailableGitignoreTemplates(): Promise<string[]> {
  try {
    const response = await fetch('https://api.github.com/gitignore/templates');
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    // Fallback to predefined list
    return ['Node', 'Python', 'Go', 'Java', 'Rust', 'C++', 'C', 'TypeScript'];
  }
}

// License GitHub API helper functions
async function fetchLicenseFromGitHub(licenseType: string): Promise<string> {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/licenses/license-templates/master/templates/${licenseType}.txt`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch license from GitHub: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getAvailableLicenseTemplates(): Promise<string[]> {
  try {
    const response = await fetch('https://api.github.com/repos/licenses/license-templates/contents/templates');
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    const files = await response.json();
    return files
      .filter((file: any) => file.name.endsWith('.txt'))
      .map((file: any) => file.name.replace('.txt', ''));
  } catch (error) {
    // Fallback to predefined list
    return ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-2-Clause', 'BSD-3-Clause', 'LGPL-2.1', 'LGPL-3.0', 'MPL-2.0'];
  }
}

// Helper function to read gitignore templates (fallback to local files)
function readGitignoreTemplate(gitignoreType: GitignoreType): string {
  const gitignorePath = join(GITIGNORE_DIR, `${gitignoreType}.gitignore`);
  if (!existsSync(gitignorePath)) {
    throw new Error(`Gitignore template not found: ${gitignorePath}`);
  }
  return readFileSync(gitignorePath, 'utf-8');
}

// Helper function to generate license with variables
function generateLicense(licenseType: LicenseType, author: string, year?: number): string {
  const template = readLicenseTemplate(licenseType);
  const currentYear = year || new Date().getFullYear();
  
  return template
    .replace(/\{\{year\}\}/g, currentYear.toString())
    .replace(/\{\{author\}\}/g, author);
}

// Helper function to parse markdown structure
function parseMarkdownStructure(content: string): { sections: string[], headings: string[] } {
  const lines = content.split('\n');
  const sections: string[] = [];
  const headings: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) {
      const level = (trimmed.match(/^#+/) || [''])[0].length;
      const heading = trimmed.replace(/^#+\s*/, '');
      headings.push(`${'  '.repeat(level - 1)}${heading}`);
      sections.push(heading);
    }
  }
  
  return { sections, headings };
}

// Helper function to validate document structure
function validateDocumentStructure(content: string, schemaType: SchemaType): {
  isValid: boolean;
  score: number;
  issues: string[];
  suggestions: string[];
} {
  const schema = readSchemaFile(schemaType);
  const docStructure = parseMarkdownStructure(content);
  const schemaStructure = parseMarkdownStructure(schema);
  
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;
  
  // Check for required sections based on schema
  const requiredSections = schemaStructure.sections.filter(section => 
    !section.toLowerCase().includes('optional')
  );
  
  for (const requiredSection of requiredSections) {
    const found = docStructure.sections.some(section => 
      section.toLowerCase().includes(requiredSection.toLowerCase())
    );
    
    if (!found) {
      issues.push(`Missing required section: ${requiredSection}`);
      score -= 15;
    }
  }
  
  // Check document length
  if (content.length < 200) {
    issues.push("Document appears to be too short");
    suggestions.push("Consider adding more detailed content to each section");
    score -= 10;
  }
  
  // Check for proper heading hierarchy
  const headingLevels = docStructure.headings.map(h => h.search(/\S/));
  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] > headingLevels[i-1] + 2) {
      issues.push("Improper heading hierarchy detected");
      score -= 5;
      break;
    }
  }
  
  return {
    isValid: score >= 70,
    score: Math.max(0, score),
    issues,
    suggestions
  };
}

// Helper function to generate template
function generateTemplate(schemaType: SchemaType): string {
  const schema = readSchemaFile(schemaType);
  const lines = schema.split('\n');
  const template: string[] = [];
  
  let inStructureSection = false;
  let currentSection = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.includes('Structure Specification') || trimmed.includes('Recommended Structure')) {
      inStructureSection = true;
      continue;
    }
    
    if (inStructureSection) {
      if (trimmed.startsWith('##') && !trimmed.includes('Structure')) {
        break;
      }
      
      if (trimmed.startsWith('###')) {
        currentSection = trimmed.replace(/^###\s*/, '').replace(/\d+\.\s*/, '');
        template.push(`## ${currentSection}`);
        template.push('');
        template.push('<!-- Add your content here -->');
        template.push('');
      }
    }
  }
  
  // Add a title based on schema type
  const title = schemaType.charAt(0).toUpperCase() + schemaType.slice(1).replace('_', ' ');
  return `# ${title}\n\n${template.join('\n')}`;
}

// Create MCP server
const server = new McpServer({
  name: "document-schema-server",
  version: "0.1.0"
});

// Tool: Validate Document
server.tool(
  "validate_document",
  {
    content: z.string().describe("Document content to validate"),
    schema_type: z.enum(SCHEMA_TYPES).describe("Type of schema to validate against"),
  },
  async ({ content, schema_type }) => {
    try {
      const validation = validateDocumentStructure(content, schema_type);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              schemaType: schema_type,
              isValid: validation.isValid,
              score: validation.score,
              issues: validation.issues,
              suggestions: validation.suggestions,
              summary: validation.isValid ? 
                "✅ Document structure is valid" : 
                `❌ Document has ${validation.issues.length} issues (score: ${validation.score}/100)`
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Generate Template
server.tool(
  "generate_template",
  {
    schema_type: z.enum(SCHEMA_TYPES).describe("Type of schema template to generate"),
    output_path: z.string().optional().describe("Optional output file path"),
  },
  async ({ schema_type, output_path }) => {
    try {
      const template = generateTemplate(schema_type);
      
      if (output_path) {
        writeFileSync(output_path, template, 'utf-8');
        return {
          content: [
            {
              type: "text",
              text: `✅ Template generated and saved to: ${output_path}`,
            },
          ],
        };
      }
      
      return {
        content: [
          {
            type: "text",
            text: template,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Template generation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: List Available Schemas
server.tool(
  "list_schemas",
  {},
  async () => {
    try {
      const schemas = SCHEMA_TYPES.map(type => {
        const schemaPath = join(SCHEMAS_DIR, `schema.${type}.md`);
        const exists = existsSync(schemaPath);
        return {
          type,
          available: exists,
          description: exists ? `Schema for ${type.replace('_', ' ')} documentation` : 'Not available'
        };
      });
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              availableSchemas: schemas,
              totalSchemas: schemas.filter(s => s.available).length,
              schemaDirectory: SCHEMAS_DIR
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing schemas: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Analyze Project Documentation
server.tool(
  "analyze_project_docs",
  {
    project_path: z.string().describe("Path to project directory to analyze"),
  },
  async ({ project_path }) => {
    try {
      const projectPath = resolve(project_path);
      const commonDocFiles = [
        'README.md', 'FEATURES.md', 'TODO.md', 'BACKLOG.md',
        'CHANGELOG.md', 'CONTRIBUTING.md', 'ARCHITECTURE.md'
      ];
      
      const analysis = {
        projectPath,
        existingDocs: [] as string[],
        missingDocs: [] as string[],
        recommendations: [] as string[]
      };
      
      for (const docFile of commonDocFiles) {
        const filePath = join(projectPath, docFile);
        if (existsSync(filePath)) {
          analysis.existingDocs.push(docFile);
        } else {
          analysis.missingDocs.push(docFile);
        }
      }
      
      // Generate recommendations
      if (!analysis.existingDocs.includes('README.md')) {
        analysis.recommendations.push('Create a README.md file to introduce your project');
      }
      
      if (!analysis.existingDocs.includes('CONTRIBUTING.md')) {
        analysis.recommendations.push('Add CONTRIBUTING.md to help new contributors');
      }
      
      if (analysis.existingDocs.length < 3) {
        analysis.recommendations.push('Consider adding more documentation files for better project organization');
      }
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              ...analysis,
              completionScore: Math.round((analysis.existingDocs.length / commonDocFiles.length) * 100),
              summary: `Found ${analysis.existingDocs.length}/${commonDocFiles.length} standard documentation files`
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Analysis error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Generate License (with GitHub API support)
server.tool(
  "generate_license",
  {
    license_type: z.string().describe("Type of license to generate (e.g., 'MIT', 'Apache-2.0', 'GPL-3.0', etc.)"),
    author: z.string().describe("Author name for the license"),
    year: z.number().optional().describe("Copyright year (defaults to current year)"),
    output_path: z.string().optional().describe("Optional output file path"),
    use_github_api: z.boolean().optional().default(true).describe("Whether to fetch from GitHub API (default: true)"),
  },
  async ({ license_type, author, year, output_path, use_github_api }) => {
    try {
      let licenseTemplate: string;
      let source = "local template";
      
      if (use_github_api) {
        try {
          licenseTemplate = await fetchLicenseFromGitHub(license_type);
          source = "GitHub API";
        } catch (error) {
          // Fallback to local template if GitHub API fails
          console.error('GitHub API failed, falling back to local template:', error);
          if (LICENSE_TYPES.includes(license_type as LicenseType)) {
            licenseTemplate = readLicenseTemplate(license_type as LicenseType);
            source = "local template (GitHub API failed)";
          } else {
            throw new Error(`Template '${license_type}' not available locally and GitHub API failed`);
          }
        }
      } else {
        if (LICENSE_TYPES.includes(license_type as LicenseType)) {
          licenseTemplate = readLicenseTemplate(license_type as LicenseType);
        } else {
          throw new Error(`Local template for '${license_type}' not found. Try using GitHub API instead.`);
        }
      }
      
      // Replace template variables
      const currentYear = year || new Date().getFullYear();
      const license = licenseTemplate
        .replace(/\{\{year\}\}/g, currentYear.toString())
        .replace(/\{\{author\}\}/g, author)
        .replace(/\[year\]/g, currentYear.toString())
        .replace(/\[fullname\]/g, author)
        .replace(/\[name of copyright owner\]/g, author)
        .replace(/Copyright \(c\) \[yyyy\]/g, `Copyright (c) ${currentYear}`)
        .replace(/Copyright \[yyyy\]/g, `Copyright ${currentYear}`);
      
      if (output_path) {
        writeFileSync(output_path, license, 'utf-8');
        return {
          content: [
            {
              type: "text",
              text: `✅ ${license_type} license generated and saved to: ${output_path} (source: ${source})`,
            },
          ],
        };
      }
      
      return {
        content: [
          {
            type: "text",
            text: license,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `License generation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: Generate Gitignore (with GitHub API support)
server.tool(
  "generate_gitignore",
  {
    gitignore_type: z.string().describe("Type of gitignore to generate (e.g., 'Node', 'Python', 'Go', 'Java', etc.)"),
    output_path: z.string().optional().describe("Optional output file path"),
    use_github_api: z.boolean().optional().default(true).describe("Whether to fetch from GitHub API (default: true)"),
  },
  async ({ gitignore_type, output_path, use_github_api }) => {
    try {
      let gitignore: string;
      let source = "local template";
      
      if (use_github_api) {
        try {
          gitignore = await fetchGitignoreFromGitHub(gitignore_type);
          source = "GitHub API";
        } catch (error) {
          // Fallback to local template if GitHub API fails
          console.error('GitHub API failed, falling back to local template:', error);
          if (GITIGNORE_TYPES.includes(gitignore_type as GitignoreType)) {
            gitignore = readGitignoreTemplate(gitignore_type as GitignoreType);
            source = "local template (GitHub API failed)";
          } else {
            throw new Error(`Template '${gitignore_type}' not available locally and GitHub API failed`);
          }
        }
      } else {
        if (GITIGNORE_TYPES.includes(gitignore_type as GitignoreType)) {
          gitignore = readGitignoreTemplate(gitignore_type as GitignoreType);
        } else {
          throw new Error(`Local template for '${gitignore_type}' not found. Try using GitHub API instead.`);
        }
      }
      
      if (output_path) {
        writeFileSync(output_path, gitignore, 'utf-8');
        return {
          content: [
            {
              type: "text",
              text: `✅ ${gitignore_type} .gitignore generated and saved to: ${output_path} (source: ${source})`,
            },
          ],
        };
      }
      
      return {
        content: [
          {
            type: "text",
            text: gitignore,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Gitignore generation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: List Available License Templates from GitHub
server.tool(
  "list_license_templates",
  {},
  async () => {
    try {
      const githubTemplates = await getAvailableLicenseTemplates();
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              availableLicenseTemplates: githubTemplates,
              totalTemplates: githubTemplates.length,
              source: "GitHub API",
              usage: "Use any of these names with the generate_license tool"
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching GitHub license templates: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: List Available GitIgnore Templates from GitHub
server.tool(
  "list_gitignore_templates",
  {},
  async () => {
    try {
      const githubTemplates = await getAvailableGitignoreTemplates();
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              availableGitignoreTemplates: githubTemplates,
              totalTemplates: githubTemplates.length,
              source: "GitHub API",
              usage: "Use any of these names with the generate_gitignore tool"
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching GitHub templates: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool: List Available Templates
server.tool(
  "list_templates",
  {},
  async () => {
    try {
      const githubGitignores = await getAvailableGitignoreTemplates();
      const githubLicenses = await getAvailableLicenseTemplates();
      const templates = {
        schemas: SCHEMA_TYPES.map(type => ({
          type,
          category: 'documentation',
          description: `Schema for ${type.replace('_', ' ')} documentation`
        })),
        licenses: githubLicenses.map(type => ({
          type,
          category: 'license',
          description: `${type} license template (from GitHub)`
        })),
        gitignores: githubGitignores.map(type => ({
          type,
          category: 'gitignore',
          description: `${type} .gitignore template (from GitHub)`
        }))
      };
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              availableTemplates: templates,
              totalTemplates: {
                schemas: templates.schemas.length,
                licenses: templates.licenses.length,
                gitignores: templates.gitignores.length
              },
              note: "License and Gitignore templates are fetched from GitHub API repositories"
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error listing templates: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Resource: Schema files
for (const schemaType of SCHEMA_TYPES) {
  server.resource(
    `schema_${schemaType}`,
    `schema://${schemaType}`,
    async (uri: URL) => {
      try {
        const content = readSchemaFile(schemaType);
        
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "text/markdown",
              text: content,
            },
          ],
        };
      } catch (error) {
        throw new Error(`Schema resource error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  );
}

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Document Schema MCP server running on stdio');