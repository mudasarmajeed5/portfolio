import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import FullPagePreview from "@/features/FullPagePreview";
export const metadata: Metadata = {
  title: "Mudassar Majeed | Full portfolio",
  description:
    "Experience, projects, skills, and contact information for software engineer Mudassar Majeed.",
};
export default async function PreviewPage() {
  return <FullPagePreview projects={await getProjects()} />;
}
