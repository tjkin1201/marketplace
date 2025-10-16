# marketplace
Claude market Place

A CLI tool for managing a marketplace of Claude plugins and MCP servers.

## Installation

```bash
npm install
npm run build
```

## Usage

### Add a plugin to the marketplace

```bash
node dist/cli.js marketplace add owner/repo
```

Example:
```bash
node dist/cli.js marketplace add modelcontextprotocol/servers
```

### List all plugins in the marketplace

```bash
node dist/cli.js marketplace list
```

## Features

- Add plugins to the marketplace using the `owner/repo` format
- Validates plugin format before adding
- Prevents duplicate entries
- Stores plugins in `marketplace.json`
- Lists all plugins with timestamps

## Error Handling

The CLI will return appropriate error messages for:
- Invalid format (not matching `owner/repo`)
- Duplicate plugins (already in marketplace)

