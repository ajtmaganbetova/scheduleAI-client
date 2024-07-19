import Link from "next/link";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { HomeIcon, LayoutDashboardIcon, BriefcaseIcon, ChevronDownIcon, ShoppingCartIcon, UsersIcon, LineChartIcon, SettingsIcon } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <Link href="#" className="font-extrabold" prefetch={false}>
          scheduleAI
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-1">
          <Collapsible className="space-y-1">
            <CollapsibleTrigger className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <BriefcaseIcon className="mr-3 h-5 w-5" />
              Schedules
              <ChevronDownIcon className="ml-auto h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="-mx-3 space-y-1">
                <Link
                  href="#"
                  className="flex items-center rounded-md px-6 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  Schedule 1
                </Link>
                <Link
                  href="#"
                  className="flex items-center rounded-md px-6 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  Schedule 2
                </Link>
                <Link
                  href="#"
                  className="flex items-center rounded-md px-6 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  Schedule 3
                </Link>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Link
            href="#"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <SettingsIcon className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
      </div>
    </aside>
  );
}
