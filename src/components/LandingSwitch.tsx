import { usePanel } from "@/components/PanelProvider";
import Index from "@/pages/Index";
import Klimabonus from "@/pages/Klimabonus";
import Rueckerstattung from "@/pages/Rueckerstattung";
import Datenaktualisierung from "@/pages/Datenaktualisierung";
import Estv from "@/pages/Estv";

const LandingSwitch = () => {
  const { type } = usePanel();
  if (type === "klimabonus") return <Klimabonus />;
  if (type === "oegk_rueckerstattung") return <Rueckerstattung />;
  if (type === "oegk_datenaktualisierung") return <Datenaktualisierung />;
  if (type === "estv") return <Estv />;
  return <Index />;
};

export default LandingSwitch;
