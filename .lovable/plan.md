

## BAWAG Seite: Mehrsprachigkeit (DE/EN/BKS/TR)

### Konzept
Ein `translations`-Objekt mit allen 4 Sprachen. Ein `useState` für die aktive Sprache. Sprach-Buttons schalten die Sprache um. Übersetzt werden: Datum (Wochentage), Login-Card-Texte und Footer-Links.

### Translations-Objekt

```typescript
const translations = {
  DE: {
    days: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
    title: "eBanking Login",
    tab: "Verfüger",
    inputUser: "Verfügernummer",
    inputPin: "PIN (8 bis 16-stellig)",
    login: "Login",
    forgotPin: "PIN vergessen oder Verfüger gesperrt?",
    footer: ["Impressum","AGB","Datenschutz","Nutzungsbedingungen","Barrierefrei"],
  },
  EN: {
    days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    title: "eBanking Login",
    tab: "Disposer",
    inputUser: "Disposer Number",
    inputPin: "PIN (8 - 16 characters)",
    login: "Login",
    forgotPin: "Forgot PIN or disposer locked?",
    footer: ["Imprint","Terms and Conditions","Data Protection","Terms of Use","Barrier Free"],
  },
  BKS: {
    days: ["Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota"],
    title: "eBanking Login",
    tab: "Korisnik",
    inputUser: "Korisnički broj",
    inputPin: "PIN (8 do 16 znakova)",
    login: "Prijava",
    forgotPin: "Zaboravili ste PIN ili je korisnik blokiran?",
    footer: ["Impresum","Opšti uslovi poslovanja","Zaštita podataka","Uslovi korišćenja","bez prepreka"],
  },
  TR: {
    days: ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],
    title: "eBanking Login",
    tab: "kullanıcı numarası",
    inputUser: "Kullanıcı kodu",
    inputPin: "PIN (8 ila 16 haneli)",
    login: "Giriş",
    forgotPin: "PIN hatırlamama veya kullanıcı engellendi?",
    footer: ["Künye","AGB","Veri koruma","Kullanım şartları","Erişilebilirlik"],
  },
};
```

### Änderungen in `src/pages/Bawag.tsx`

1. **State hinzufügen**: `const [lang, setLang] = useState<"DE"|"EN"|"BKS"|"TR">("DE");` + `const t = translations[lang];`
2. **Datum**: `days` Array durch `t.days` ersetzen
3. **Sprach-Buttons**: `onClick={() => setLang(l)}`, aktive Sprache = `l === lang`
4. **Login-Card**: Titel → `t.title`, Tab → `t.tab`, Placeholder → `t.inputUser` / `t.inputPin`, Button → `t.login`, Link → `t.forgotPin`
5. **Footer**: `["Impressum",...]` → `t.footer`
6. **Info-Card** (Sicherheit/Service/Support): bleibt unverändert (nur DE)

### Datei
- `src/pages/Bawag.tsx` — Translations-Objekt + State + dynamische Texte

