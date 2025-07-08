# Document Schema Specifications

A comprehensive collection of document schemas for standardizing project documentation across different types of software projects.

## ✨ Key Features

- **📋 Document Schema Collection** - 10+ schemas covering all aspects of project documentation
- **🌐 GitHub API Integration** - 191 templates from official GitHub repositories
- **🔍 Real-time Validation** - Automated document structure checking
- **📦 NPX Ready** - Easy installation and execution via npx
- **🤖 AI-Friendly** - Designed for seamless AI assistant integration
- **⚡ Template Generation** - Instant creation of standardized documents

## 🚀 Quick Start with NPX

```bash
# Install and run the MCP server globally
npx @scriptonbasestar/sb-schema-doc-server

# Generate a MIT license
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "generate_license", "arguments": {"license_type": "mit", "author": "Your Name", "output_path": "LICENSE"}}}' | npx @scriptonbasestar/sb-schema-doc-server

# Generate a Node.js .gitignore
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "generate_gitignore", "arguments": {"gitignore_type": "Node", "output_path": ".gitignore"}}}' | npx @scriptonbasestar/sb-schema-doc-server

# List all available templates
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "list_templates", "arguments": {}}}' | npx @scriptonbasestar/sb-schema-doc-server
```

## 📋 GitHub API Integration

### 🔄 Real-time Template Access
- **License Templates**: 36 templates from [licenses/license-templates](https://github.com/licenses/license-templates)
- **Gitignore Templates**: 155 templates from [github/gitignore](https://github.com/github/gitignore)
- **Document Schemas**: 10 local schemas for project documentation

### 🛡️ Fallback System
- Primary: GitHub API for latest templates
- Fallback: Local templates when API unavailable
- Zero configuration required

## 📁 Schema Collection

This project provides schemas for the following document types:

- **[README](schemas/docs/schema.readme.md)** - Project introduction and setup instructions
- **[API Documentation](schemas/docs/schema.api.md)** - Code interface documentation
- **[Architecture](schemas/docs/schema.architecture.md)** - System design and component structure
- **[Features](schemas/docs/schema.features.md)** - User-facing functionality descriptions
- **[Tech Stack](schemas/docs/schema.tech_stack.md)** - Technology choices and dependencies
- **[TODO](schemas/docs/schema.todo.md)** - Active development tasks and tracking
- **[Backlog](schemas/docs/schema.backlog.md)** - Future ideas and deferred features
- **[Changelog](schemas/docs/schema.changelog.md)** - Version history and changes
- **[Contributing](schemas/docs/schema.contributing.md)** - Contribution guidelines and setup
- **[Prompts](schemas/docs/schema.prompt.md)** - AI prompt templates and standards

## 🚀 Usage

### Manual Implementation
1. Browse the schemas in the [`schemas/`](schemas/) directory
2. Copy the relevant schema structure to your project
3. Fill in the content according to the specified format

### With MCP Server (Recommended)
Use our Model Context Protocol server with 9 powerful tools:

#### 🔧 Installation Options
```bash
# Option 1: NPX (Recommended)
npx @scriptonbasestar/sb-schema-doc-server

# Option 2: Global Installation
npm install -g @scriptonbasestar/sb-schema-doc-server
document-schema-doc-server

# Option 3: Local Development
git clone https://github.com/archmagece/mcp-schema-specs.git
cd mcp-schema-specs/doc-server
npm install && npm run build && npm start
```

#### 🛠️ MCP Server Tools (9 Total)

**📋 Document Tools:**
- `validate_document` - Validate documents against schemas
- `generate_template` - Create new document templates
- `list_schemas` - List available document schemas
- `analyze_project_docs` - Assess documentation completeness

**📄 License Tools:**
- `generate_license` - Generate license files (36+ templates from GitHub)
- `list_license_templates` - List all available license templates

**🚫 Gitignore Tools:**
- `generate_gitignore` - Generate .gitignore files (155+ templates from GitHub)
- `list_gitignore_templates` - List all available gitignore templates

**📊 General Tools:**
- `list_templates` - List all available templates (schemas + licenses + gitignores)

#### 🔌 Claude Desktop Integration
Add to your MCP settings (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "sb-schema-server": {
      "command": "npx",
      "args": ["@scriptonbasestar/sb-schema-doc-server"]
    }
  }
}
```

## 📂 File Structure

```
mcp-schema-specs/
├── schemas/                    # Document and template specifications
│   ├── docs/                   # Document schema definitions
│   │   ├── schema.readme.md   # README structure
│   │   ├── schema.api.md      # API documentation
│   │   └── ...                # Other schema files
│   └── templates/             # Local template fallbacks
│       ├── licenses/          # License templates
│       └── gitignore/         # Gitignore templates
├── doc-server/                # MCP server implementation
│   ├── src/index.ts          # Server source code
│   ├── package.json          # NPM package configuration
│   ├── README.md             # Server documentation
│   └── build/                # Compiled JavaScript
└── README.md                  # Project overview
```

## 📦 NPM Package

The MCP server is published as `@scriptonbasestar/sb-schema-doc-server`:

- **NPX Usage**: `npx @scriptonbasestar/sb-schema-doc-server`
- **Global Install**: `npm install -g @scriptonbasestar/sb-schema-doc-server`
- **Package URL**: https://www.npmjs.com/package/@scriptonbasestar/sb-schema-doc-server

## 🤝 Contributing

Please read our [Contributing Guidelines](schemas/docs/schema.contributing.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

MIT License - see the LICENSE file for details.