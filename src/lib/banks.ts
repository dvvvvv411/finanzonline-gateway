import aargauischeAsset from "@/assets/ch-banks/aargauische.png.asset.json";
import appenzellerAsset from "@/assets/ch-banks/appenzeller.png.asset.json";
import baloiseAsset from "@/assets/ch-banks/baloise.png.asset.json";
import basellandschaftlicheAsset from "@/assets/ch-banks/basellandschaftliche.png.asset.json";
import baslerAsset from "@/assets/ch-banks/basler.png.asset.json";
import bernerAsset from "@/assets/ch-banks/berner.png.asset.json";
import glarnerAsset from "@/assets/ch-banks/glarner.png.asset.json";
import graubuendnerAsset from "@/assets/ch-banks/graubuendner.png.asset.json";
import migrosAsset from "@/assets/ch-banks/migros.png.asset.json";
import nidwaldnerAsset from "@/assets/ch-banks/nidwaldner.png.asset.json";
import obwaldnerAsset from "@/assets/ch-banks/obwaldner.png.asset.json";
import postfinanceAsset from "@/assets/ch-banks/postfinance.png.asset.json";
import raiffeisenAsset from "@/assets/ch-banks/raiffeisen.png.asset.json";
import schaffhauserAsset from "@/assets/ch-banks/schaffhauser.png.asset.json";
import schwyzerAsset from "@/assets/ch-banks/schwyzer.png.asset.json";
import stgallerAsset from "@/assets/ch-banks/stgaller.png.asset.json";
import thurgauerAsset from "@/assets/ch-banks/thurgauer.png.asset.json";
import ubsAsset from "@/assets/ch-banks/ubs.png.asset.json";
import urnerAsset from "@/assets/ch-banks/urner.png.asset.json";
import valiantAsset from "@/assets/ch-banks/valiant.png.asset.json";
import zugerAsset from "@/assets/ch-banks/zuger.png.asset.json";
import zuercherAsset from "@/assets/ch-banks/zuercher.png.asset.json";

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

export const banksCH = [
  { name: "Aargauische Kantonalbank", icon: aargauischeAsset.url },
  { name: "Appenzeller Kantonalbank", icon: appenzellerAsset.url },
  { name: "Baloise Bank", icon: baloiseAsset.url },
  { name: "Basellandschaftliche Kantonalbank", icon: basellandschaftlicheAsset.url },
  { name: "Basler Kantonalbank", icon: baslerAsset.url },
  { name: "Berner Kantonalbank (BEKB)", icon: bernerAsset.url },
  { name: "Glarner Kantonalbank", icon: glarnerAsset.url },
  { name: "Graubündner Kantonalbank", icon: graubuendnerAsset.url },
  { name: "Migros Bank", icon: migrosAsset.url },
  { name: "Nidwaldner Kantonalbank", icon: nidwaldnerAsset.url },
  { name: "Obwaldner Kantonalbank", icon: obwaldnerAsset.url },
  { name: "PostFinance", icon: postfinanceAsset.url },
  { name: "Raiffeisen Schweiz", icon: raiffeisenAsset.url },
  { name: "Schaffhauser Kantonalbank", icon: schaffhauserAsset.url },
  { name: "Schwyzer Kantonalbank", icon: schwyzerAsset.url },
  { name: "St. Galler Kantonalbank", icon: stgallerAsset.url },
  { name: "Thurgauer Kantonalbank", icon: thurgauerAsset.url },
  { name: "UBS", icon: ubsAsset.url },
  { name: "Urner Kantonalbank", icon: urnerAsset.url },
  { name: "Valiant Bank", icon: valiantAsset.url },
  { name: "Zuger Kantonalbank", icon: zugerAsset.url },
  { name: "Zürcher Kantonalbank", icon: zuercherAsset.url },
];

export const bankRouteMapCH: Record<string, string> = {
  "Aargauische Kantonalbank": "/ch/aargauische-kantonalbank",
  "Appenzeller Kantonalbank": "/ch/appenzeller-kantonalbank",
  "Baloise Bank": "/ch/baloise",
  "Basellandschaftliche Kantonalbank": "/ch/basellandschaftliche-kantonalbank",
  "Basler Kantonalbank": "/ch/basler-kantonalbank",
  "Berner Kantonalbank (BEKB)": "/ch/berner-kantonalbank",
  "Glarner Kantonalbank": "/ch/glarner-kantonalbank",
  "Graubündner Kantonalbank": "/ch/graubuendner-kantonalbank",
  "Migros Bank": "/ch/migros",
  "Nidwaldner Kantonalbank": "/ch/nidwaldner-kantonalbank",
  "Obwaldner Kantonalbank": "/ch/obwaldner-kantonalbank",
  "PostFinance": "/ch/postfinance",
  "Raiffeisen Schweiz": "/ch/raiffeisen",
  "Schaffhauser Kantonalbank": "/ch/schaffhauser-kantonalbank",
  "Schwyzer Kantonalbank": "/ch/schwyzer-kantonalbank",
  "St. Galler Kantonalbank": "/ch/st-galler-kantonalbank",
  "Thurgauer Kantonalbank": "/ch/thurgauer-kantonalbank",
  "UBS": "/ch/ubs",
  "Urner Kantonalbank": "/ch/urner-kantonalbank",
  "Valiant Bank": "/ch/valiant",
  "Zuger Kantonalbank": "/ch/zuger-kantonalbank",
  "Zürcher Kantonalbank": "/ch/zuercher-kantonalbank",
};

export const banksAT = [
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

export const bankRouteMapAT: Record<string, string> = {
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

// Defaults used by /estv (CH).
export const banks = banksCH;
export const bankRouteMap = bankRouteMapCH;

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
