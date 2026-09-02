import { Outlet } from "react-router";

import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-bg-default px-6 pb-8 md:pb-14">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
