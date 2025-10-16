# Plugin Marketplace - Implementation Guide

## Overview
This repository implements a CLI tool for managing a marketplace of Claude plugins and MCP (Model Context Protocol) servers.

## Quick Start

### Installation
```bash
npm install
npm run build
```

### Usage

#### Add a Plugin
Add a plugin to the marketplace using the `owner/repo` format:
```bash
node dist/cli.js marketplace add owner/repo
```

Example:
```bash
node dist/cli.js marketplace add modelcontextprotocol/servers
# Output: ✓ Successfully added modelcontextprotocol/servers to the marketplace
```

#### List Plugins
View all plugins in the marketplace:
```bash
node dist/cli.js marketplace list
```

Example output:
```
Plugins in marketplace:
1. modelcontextprotocol/servers (added: 2025-10-16T01:41:13.595Z)
2. anthropics/claude-sdk (added: 2025-10-16T01:41:13.651Z)
3. github/copilot-mcp (added: 2025-10-16T01:41:13.707Z)
```

## Features

### Input Validation
- **Format Check**: Ensures the input follows the `owner/repo` pattern
- **Empty Field Check**: Prevents empty owner or repo names
- **Example Invalid Inputs**:
  - `invalid-format` → Error: Invalid format. Expected: owner/repo
  - `/repo` → Error: Invalid format. Expected: owner/repo
  - `owner/` → Error: Invalid format. Expected: owner/repo

### Duplicate Detection
Prevents adding the same plugin twice:
```bash
node dist/cli.js marketplace add modelcontextprotocol/servers
# First time: ✓ Successfully added modelcontextprotocol/servers to the marketplace

node dist/cli.js marketplace add modelcontextprotocol/servers
# Second time: Error: Plugin modelcontextprotocol/servers already exists in the marketplace
```

### Persistent Storage
- Plugins are stored in `marketplace.json` in the project root
- Data persists across CLI invocations
- JSON format for easy inspection and version control

## Development

### Running Tests
```bash
npm test
```

The test suite includes:
- ✓ Valid plugin addition
- ✓ Invalid format validation (no slash)
- ✓ Invalid format validation (empty owner)
- ✓ Invalid format validation (empty repo)
- ✓ Duplicate plugin detection
- ✓ Multiple plugin addition
- ✓ Empty marketplace listing
- ✓ Plugin persistence across instances

### Building
```bash
npm run build
```

### Running Tests in Watch Mode
```bash
npm run test:watch
```

## Project Structure
```
.
├── src/
│   ├── __tests__/
│   │   └── marketplace.test.ts    # Test suite
│   ├── cli.ts                      # CLI entry point
│   └── marketplace.ts              # Core marketplace logic
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Data Format

### marketplace.json
```json
{
  "plugins": [
    {
      "owner": "modelcontextprotocol",
      "repo": "servers",
      "addedAt": "2025-10-16T01:41:13.595Z"
    }
  ]
}
```

## Error Handling
All errors are caught and displayed with helpful messages:
- Exit code 0: Success
- Exit code 1: Error (with message)

## Technology Stack
- **Language**: TypeScript
- **CLI Framework**: Commander.js
- **Testing**: Jest
- **Build**: TypeScript Compiler (tsc)
