#!/usr/bin/env -S node --no-warnings=ExperimentalWarning --experimental-strip-types

/* eslint-disable no-console */
import ky from "ky";
import * as Fs from "node:fs/promises";
import Path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { oraPromise } from "ora";
import { format } from "prettier";
import { generateApi } from "swagger-typescript-api";
import { z } from "zod";

function boldText(text: string) {
  return "\x1b[1m" + text + "\x1b[0m";
}

// @ts-expect-error - import.meta works fine at runtime with Node.js ES modules
const __dirname = Path.dirname(fileURLToPath(import.meta.url));
const argsSchema = z.object({
  outPath: z.string().default(Path.resolve("./src/__generated__")),
  name: z.string().default("generatedApi.ts"),
  url: z.string().default("http://127.0.0.1:3004/swagger-json"),
});

export async function main() {
  const args = parseArgs({
    options: {
      url: {
        type: "string",
        short: "u",
      },
      outPath: {
        short: "o",
        type: "string",
      },
      name: {
        type: "string",
        short: "n",
      },
    },
  });

  const { outPath, name, url } = argsSchema.parse(args.values);

  const fullOutPath = Path.resolve(process.cwd(), outPath);

  const schemaJson = await oraPromise(ky.get(url, { method: "GET" }).text(), {
    text: `Pulling schema from ${boldText(url)}`,
  });

  const formattedSchema = await oraPromise(
    format(schemaJson, { tabWidth: 2, parser: "json" }),
    {
      text: "Formatting schema snapshot",
    },
  );

  await oraPromise(
    generateApi({
      spec: JSON.parse(schemaJson),
      name,
      apiClassName: "ChatServiceClient",
      output: fullOutPath,
      generateUnionEnums: true,
      moduleNameFirstTag: true,
      cleanOutput: true,
      extractRequestBody: true,
      extractRequestParams: true,
      extractResponseBody: true,
      extractResponseError: true,
      modular: false,
      templates: Path.resolve(__dirname, "templates"),
    }),
    {
      text: "Generating api",
    },
  );

  await oraPromise(
    Fs.writeFile(Path.resolve(__dirname, "schema.json"), formattedSchema, {
      flag: "w",
      flush: true,
    }),
    {
      text: "Saving schema",
    },
  );
}

main();
