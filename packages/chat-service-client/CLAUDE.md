# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This package (`@ok/user-service-client`) is an auto-generated TypeScript API client for the user-service. It uses `swagger-typescript-api` to generate a typed client from the service's OpenAPI/Swagger specification.

## Commands

### Generate the API client
```bash
pnpm run generate -u http://localhost:3000/swagger-json -o ./src/__generated__ -n generatedApi.ts
```
The user-service must be running locally to fetch the swagger spec. Default URL is `http://127.0.0.1:3000/swagger-json`.

### Build
```bash
pnpm build
```

### Type check
```bash
pnpm check-types
```

## Architecture

- **`src/index.ts`** - CLI tool that generates the API client. Fetches OpenAPI spec from a running user-service, then uses `swagger-typescript-api` to generate TypeScript code.
- **`src/__generated__/generatedApi.ts`** - Auto-generated TypeScript client with full type definitions. Do not edit manually.
- **`src/templates/http-client.ejs`** - Custom EJS template for the HTTP client (uses fetch-based client).
- **`src/schema.json`** - Snapshot of the last fetched OpenAPI schema.

The generated client class is named `UserServiceClient` and exports typed DTOs for all API endpoints.

## Key Details

- Generated code uses fetch-based HTTP client
- Package exports from `dist/__generated__/generatedApi.js`
- Always regenerate and rebuild after user-service API changes
