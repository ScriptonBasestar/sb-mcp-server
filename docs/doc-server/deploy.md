# 📦 Deploy

This section explains how to publish the package to the npm registry.

## Prerequisites

- You must have an npm account and be logged in on your machine (`npm login`).
- To publish a scoped package for the first time, you might need to use `npm publish --access public`.

## Publishing Steps

The project includes a `prepublishOnly` script that automatically builds the project before publishing.

```bash
# 1. Navigate to the server directory
cd doc-server

# 2. (Optional) Update the version number in package.json
#    Example: npm version patch|minor|major
npm version patch

# 3. Publish to npm
npm publish
``` 