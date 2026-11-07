import { IconMessage } from "@/components/icons";
import { brand } from "@/config/site";

export function WhatsAppFab() {
  if (!brand.whatsapp) return null;

  const href = `https://wa.me/${brand.whatsapp.replace(/\D/g, "")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center bg-mode-a text-white transition-opacity duration-150 hover:opacity-90"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Écrire sur WhatsApp"
    >
      <IconMessage size={24} />
    </a>
  );
}
