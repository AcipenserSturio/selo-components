import fs from "fs";
import { z, ZodSchema } from "zod";

function readAndParseJson<T extends ZodSchema<any>>(
  filePath: string,
  schema: T,
): z.infer<T> {
  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileContents);
    const parsed = schema.parse(jsonData);
    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in file: ${filePath}`);
    } else if (error instanceof z.ZodError) {
      throw new Error(`JSON validation failed: ${error.message}`);
    } else {
      throw new Error(
        `Error reading file at ${filePath}: ${(error as Error).message}`,
      );
    }
  }
}

const ConfigSchema = z.object({
  site_url: z.string(),
  site_title: z.string(),
  site_description: z.string(),
  goatcounter_url: z.string(),
  github_url: z.string(),
});

export const config = readAndParseJson("./src/config.json", ConfigSchema);
