import { DocsPageNavigation, DocsSidebar } from "@/components/DocsSidebar";
import { SidebarSlot } from "@/components/SidebarSlot";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarSlot>
        <DocsSidebar />
      </SidebarSlot>
      <div className="docs-copy mx-auto w-full min-w-0 max-w-[76ch] px-5 py-10 sm:px-8">{children}<DocsPageNavigation /></div>
    </>
  );
}
