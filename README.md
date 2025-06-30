# Document Schema Specifications

A comprehensive collection of document schemas for standardizing project documentation across different types of software projects.

## 리소스

- docs: ./schemas/docs/*
- gitignore: https://github.com/orgs/github/gitignore
- license: https://github.com/licenses/license-templates
- 


## 📋 Features

- **Comprehensive Schema Collection** - 11 different document schemas covering all aspects of project documentation
- **Standardized Structure** - Consistent formatting and organization across all schema types
- **AI-Friendly** - Designed to work seamlessly with AI assistants like Claude for automated documentation
- **Best Practices** - Incorporates industry standards and proven documentation patterns

## 📁 Schema Collection

This project provides schemas for the following document types:

- **[README](schemas/schema.readme.md)** - Project introduction and setup instructions
- **[API Documentation](schemas/schema.api.md)** - Code interface documentation
- **[Architecture](schemas/schema.architecture.md)** - System design and component structure
- **[Features](schemas/schema.features.md)** - User-facing functionality descriptions
- **[Tech Stack](schemas/schema.tech_stack.md)** - Technology choices and dependencies
- **[TODO](schemas/schema.todo.md)** - Active development tasks and tracking
- **[Backlog](schemas/schema.backlog.md)** - Future ideas and deferred features
- **[Changelog](schemas/schema.changelog.md)** - Version history and changes
- **[Contributing](schemas/schema.contributing.md)** - Contribution guidelines and setup
- **[Prompts](schemas/schema.prompt.md)** - AI prompt templates and standards

## 🚀 Usage

### Manual Implementation
1. Browse the schemas in the [`schemas/`](schemas/) directory
2. Copy the relevant schema structure to your project
3. Fill in the content according to the specified format

### With MCP Server (Recommended)
Use our Model Context Protocol server for automated validation and generation:

```bash
# Validate existing documentation
validate_document README.md readme

# Generate new documentation templates
generate_template features ./FEATURES.md

# Analyze project documentation status
analyze_project_docs ./
```

## 🛠️ Development

This project includes an MCP server implementation for seamless integration with AI assistants.

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd mcp-schema-specs

# Install MCP server dependencies
cd mcp-server
npm install
npm run build
```

### MCP Server Tools
- `validate_document` - Validate documents against schemas
- `generate_template` - Create new document templates
- `analyze_project_docs` - Assess documentation completeness
- `suggest_improvements` - Provide enhancement recommendations

## 📂 File Structure

```
mcp-schema-specs/
├── schemas/                    # Document schema definitions
│   ├── schema.readme.md       # README structure
│   ├── schema.api.md          # API documentation
│   ├── schema.architecture.md # Architecture documentation
│   └── ...                    # Other schema files
├── mcp-server/                # MCP server implementation
│   ├── src/                   # Server source code
│   ├── package.json          # Dependencies and scripts
│   └── build/                # Compiled JavaScript
└── README.md                  # This file
```

## 🤝 Contributing

Please read our [Contributing Guidelines](schemas/schema.contributing.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

MIT License - see the LICENSE file for details.