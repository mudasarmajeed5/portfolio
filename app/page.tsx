import Portfolio from "@/features/Portfolio";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  return <Portfolio projects={await getProjects()} />;
}
