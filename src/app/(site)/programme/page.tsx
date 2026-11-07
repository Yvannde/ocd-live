import { ProgrammeView } from "@/components/programme/ProgrammeView";
import { copy } from "@/config/copy.fr";

export const metadata = {
  title: `Programme — ${copy.meta.title}`,
  description: copy.programmePage.lead,
};

export default function ProgrammePage() {
  return <ProgrammeView />;
}
