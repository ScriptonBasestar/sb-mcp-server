# Document Schema MCP Server

A Model Context Protocol (MCP) server that provides document schema validation and generation capabilities with GitHub API integration for license and gitignore templates.

## ✨ Features

- **📋 Document Schema Collection** - 10+ schemas covering all aspects of project documentation.
- **🌐 GitHub API Integration** - Access to 191 templates from official GitHub repositories (36 licenses, 155 gitignores).
- **🔍 Real-time Validation** - Automated checks for document structure against schemas.
- **📦 NPX Ready** - Easy installation and execution via npx for immediate use.
- **🤖 AI-Friendly** - Designed for seamless integration with AI assistants like Claude.
- **⚡ Template Generation** - Instantly create standardized documents, licenses, and gitignore files.

## 🚀 Usage

This section is for end-users who want to use the MCP server as a tool.

### Installation

You can use the server directly with `npx` without installation, or install it globally for easier access.

```bash
# Option 1: Run directly with npx (Recommended)
npx @scriptonbasestar/sb-schema-doc-server

# Option 2: Install globally with npm
npm install -g @scriptonbasestar/sb-schema-doc-server
# Then run the server with:
sb-schema-doc-server
```

### Examples

Here are some examples of how to interact with the server from your terminal.

```bash
# Example 1: List all available gitignore templates
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "list_gitignore_templates", "arguments": {}}}' | npx @scriptonbasestar/sb-schema-doc-server

# Example 2: Generate a Node.js .gitignore file
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "generate_gitignore", "arguments": {"gitignore_type": "Node", "output_path": ".gitignore"}}}' | npx @scriptonbasestar/sb-schema-doc-server

# Example 3: Generate an MIT license
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "generate_license", "arguments": {"license_type": "mit", "author": "Your Name", "output_path": "LICENSE"}}}' | npx @scriptonbasestar/sb-schema-doc-server

# Example 4: Validate a README document
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "validate_document", "arguments": {"content": "# My Project\n\n## Usage", "schema_type": "readme"}}}' | npx @scriptonbasestar/sb-schema-doc-server
```

### Claude Desktop Integration

To integrate with Claude Desktop, add the following configuration to your MCP settings file (`claude_desktop_config.json`):

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

## 💻 Development & 📦 Deployment

For details on how to set up a development environment, modify the source code, and deploy your own version to npm, please see the following documents:

- **[💻 Development Guide](../../docs/doc-server/develop.md)**
- **[📦 Deployment Guide](../../docs/doc-server/deploy.md)**

## 🛠️ MCP Tools Reference

The server provides 9 tools for various document and template operations.

<details>
<summary>Click to view all tools</summary>

### Document Tools
- **`validate_document`**: Validate document structure against schemas.
- **`generate_template`**: Generate document templates.
- **`list_schemas`**: List available document schemas.
- **`analyze_project_docs`**: Analyze project documentation completeness.

### License Tools
- **`generate_license`**: Generate license files (36+ templates).
- **`list_license_templates`**: List available license templates.

### Gitignore Tools
- **`generate_gitignore`**: Generate .gitignore files (155+ templates).
- **`list_gitignore_templates`**: List available gitignore templates.

### General Tools
- **`list_templates`**: List all available templates (schemas, licenses, gitignores).

</details>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature`).
6.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.