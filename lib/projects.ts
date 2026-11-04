import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export type Project = {
  slug: string;
  title: string;
  kind: string;
  text: string;
  tech: string;
  image?: string;
  body: string;
};

export async function getProjects(): Promise<Project[]> {
  const directory = path.join(process.cwd(), "content/projects");
  const files = (await readdir(directory))
    .filter((file) => file.endsWith(".md"))
    .sort();
  return Promise.all(
    files.map(async (file) => {
      const source = await readFile(path.join(directory, file), "utf8");
      const [, frontmatter = "", body = source] =
        source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/) || [];
      const fields = Object.fromEntries(
        frontmatter.split("\n").map((line) => {
          const [key, ...value] = line.split(":");
          return [
            key?.trim(),
            value
              .join(":")
              .trim()
              .replace(/^['"]|['"]$/g, ""),
          ];
        }),
      );
      const paragraph =
        body
          .split("\n")
          .find(
            (line) =>
              line.trim() && !line.startsWith("#") && !line.startsWith("!["),
          ) || "";
      return {
        slug: file.replace(/\.md$/, ""),
        title: fields.title || file.replace(/\.md$/, ""),
        kind: fields.category || "Project",
        text: fields.description || paragraph,
        tech: fields.technologies || "",
        image: fields.image,
        body,
      };
    }),
  );
}
