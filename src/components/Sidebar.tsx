import Link from "next/link";

const Sidebar = () => (
  <div className="h-full bg-white shadow-md p-4">
    <nav className="space-y-4">
      <Link className="block" href="/overview">
        Overview
      </Link>
      <Link className="block" href="/schedule">
        Schedule
      </Link>
    </nav>
  </div>
);

export default Sidebar;
