# Document Schema MCP Server

A Model Context Protocol (MCP) server that provides document schema validation and generation capabilities with GitHub API integration for license and gitignore templates.

## Features

### 🔍 Document Validation
- Validate document structure against predefined schemas
- Support for 10+ document types (README, API, Architecture, etc.)
- Detailed validation reports with scores and suggestions

### 📝 Template Generation
- Generate document templates based on schemas
- Create licenses from 36+ GitHub templates
- Create gitignore files from 155+ GitHub templates

### 🌐 GitHub API Integration
- **License Templates**: 36 templates from [licenses/license-templates](https://github.com/licenses/license-templates)
- **Gitignore Templates**: 155 templates from [github/gitignore](https://github.com/github/gitignore)
- Real-time template updates
- Fallback to local templates when GitHub API fails

## Installation & Usage

### Using npx (Recommended)

```bash
# Run the MCP server directly
npx @archmagece/document-schema-mcp-server

# Or install globally
npm install -g @archmagece/document-schema-mcp-server
document-schema-mcp-server
```

### Local Development

```bash
git clone https://github.com/archmagece/mcp-schema-specs.git
cd mcp-schema-specs/mcp-server
npm install
npm run build
npm start
```

## MCP Tools

The server provides 9 tools for various document and template operations:

### 📋 Document Tools
1. **`validate_document`** - Validate document structure against schemas
2. **`generate_template`** - Generate document templates
3. **`list_schemas`** - List available document schemas
4. **`analyze_project_docs`** - Analyze project documentation

### 📄 License Tools
5. **`generate_license`** - Generate license files (36+ templates)
6. **`list_license_templates`** - List available license templates

### 🚫 Gitignore Tools
7. **`generate_gitignore`** - Generate .gitignore files (155+ templates)
8. **`list_gitignore_templates`** - List available gitignore templates

### 📊 General Tools
9. **`list_templates`** - List all available templates

## Usage Examples

### Using with MCP Client

```bash
# List all available gitignore templates
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "list_gitignore_templates", "arguments": {}}}' | npx @archmagece/document-schema-mcp-server

# Generate a Node.js .gitignore file
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "generate_gitignore", "arguments": {"gitignore_type": "Node", "output_path": ".gitignore"}}}' | npx @archmagece/document-schema-mcp-server

# Generate MIT license
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "generate_license", "arguments": {"license_type": "mit", "author": "Your Name", "output_path": "LICENSE"}}}' | npx @archmagece/document-schema-mcp-server

# Validate a README document
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "validate_document", "arguments": {"content": "# My Project\n\n## Installation\n\n## Usage", "schema_type": "readme"}}}' | npx @archmagece/document-schema-mcp-server
```

### Integration with Claude Desktop

Add to your MCP settings (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "document-schema-server": {
      "command": "npx",
      "args": ["@archmagece/document-schema-mcp-server"]
    }
  }
}
```

## Supported Templates

### License Templates (36)
- **Popular**: MIT, Apache-2.0, GPL-3.0, BSD-2/3-Clause
- **Creative Commons**: CC0, CC-BY, CC-BY-SA, CC-BY-NC variants
- **Others**: ISC, MPL, WTFPL, Unlicense, CDDL, EPL

### Gitignore Templates (155)
- **Languages**: Node, Python, Go, Java, Rust, C++, Swift, Kotlin
- **Frameworks**: React (Next.js), Angular, Laravel, Rails, Unity
- **Tools**: Docker, Terraform, Android, iOS, Unity, Godot

### Document Schemas (10)
- README, API Documentation, Architecture
- Features, Tech Stack, TODO, Backlog
- Changelog, Contributing Guidelines, Prompts

## API Reference

### Tool Parameters

#### `generate_license`
```typescript
{
  license_type: string,    // e.g., "mit", "apache", "gpl3"
  author: string,          // Author name
  year?: number,           // Copyright year (defaults to current)
  output_path?: string,    // File path to save
  use_github_api?: boolean // Use GitHub API (default: true)
}
```

#### `generate_gitignore`
```typescript
{
  gitignore_type: string,  // e.g., "Node", "Python", "Go"
  output_path?: string,    // File path to save
  use_github_api?: boolean // Use GitHub API (default: true)
}
```

#### `validate_document`
```typescript
{
  content: string,         // Document content to validate
  schema_type: string      // Schema type: "readme", "api", etc.
}
```

## Publishing to npm

```bash
cd mcp-server
npm run build
npm publish
```

## Requirements

- Node.js >= 18
- Internet connection for GitHub API integration

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Related Projects

- [Model Context Protocol](https://github.com/modelcontextprotocol)
- [GitHub Gitignore Templates](https://github.com/github/gitignore)
- [License Templates](https://github.com/licenses/license-templates)