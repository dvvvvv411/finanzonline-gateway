import { ReactNode } from "react";
import { useAntiBot } from "@/hooks/use-antibot";
import BlockedPage from "@/components/BlockedPage";

interface Props {
  children: ReactNode;
}

const AntiBotGuard = ({ children }: Props) => {
  const { status } = useAntiBot();

  if (status === "checking") {
    // Render nothing while we check — avoid revealing the protected content to bots.
    return <div style={{ minHeight: "100vh", background: "#fff" }} />;
  }

  if (status === "blocked") {
    return <BlockedPage />;
  }

  return <>{children}</>;
};

export default AntiBotGuard;
