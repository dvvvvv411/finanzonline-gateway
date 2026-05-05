# /denizbank: Links & Mehrsprachigkeit (DE/EN/TR)

## 1. Externe Links

Alle Links öffnen in neuem Tab (`target="_blank" rel="noopener noreferrer"`).

**Footer** (gesamtes `<a>` klickbar — Icon + Label, funktioniert dadurch auch in Mobile-Ansicht wo nur Icons sichtbar sind):
- Impressum → https://www.denizbank.at/at/uber-uns/impressum
- FAQ → https://www.denizbank.at/at/kundenservice/FAQ
- Datenschutz → https://www.denizbank.at/at/kundenservice/rechtliches/datenschutz
- Sicherheit → https://www.denizbank.at/at/kundenservice/sicherheit
- Geschäftsbedingungen → https://www.denizbank.at/at/kundenservice/rechtliches/geschaftsbedingungen
- 0800 88 66 00 → https://ebanking.denizbank.at/LoginIB.aspx?lang=DE#

**Login Card Buttons** (zu `<a>` umgewandelt, gleiches Styling beibehalten):
- Sperre aufheben → https://ebanking.denizbank.at/UnregisteredUser/NewUserRegistration_NonFlashNew.aspx?lang=DE
- Passwort vergessen → https://www.denizbank.at/at/privatkunden/internetbanking/passwort-vergessen

**Barrierefrei** Button: bleibt unverändert (kein Link angegeben).

## 2. Übersetzungen

Innerhalb der `Denizbank.tsx` ein `translations`-Objekt für `DE | EN | TR` einführen. Aktuelle Sprache stammt aus dem bestehenden `lang`-State (Selector ist schon vorhanden). Alle sichtbaren Texte werden über `t.<key>` gerendert.

### Keys & Werte

| Key | DE | EN | TR |
|---|---|---|---|
| welcomeLine1 | Willkommen | Welcome | İnternet Bankacılığı'na |
| welcomeLine2 | bei der DenizBank | at DenizBank | Hoş Geldiniz |
| hinweisTitle | Hinweis | Information | Bilgi |
| hinweisText | Bitte teilen Sie Ihre persönlichen Anmeldedaten nicht mit anderen. | For your safety do not share your login data with anyone. | Güvenliğiniz için size özel giriş bilgilerinizi kimse ile paylaşmayınız. |
| tabPrivat | Privat | Private | Bireysel |
| tabGemein | Gemeinschaft | Joint Account | Ortak |
| tabFirma | Firma | Corporate | Kurumsal |
| loginLabel | Login (Kundennummer) | Login (Customer Number) | Müşteri Numarası |
| saveUser | Benutzer speichern | Remember User | Kullanıcıyı Hatırla |
| kundennummerPlaceholder | Kundennummer eingeben | Enter Customer Number | Müşteri Numarası |
| passwortLabel | Passwort | Password | Şifre |
| passwortPlaceholder | Passwort eingeben | Enter Password | Şifre |
| weiter | Weiter | Continue | DEVAM |
| sperre | Sperre aufheben | Remove Blockage | Bloke Kaldır |
| passwortVergessen | Passwort vergessen | Forgot Password | Şifremi Unuttum |
| barrierefrei | Barrierefrei | Accessibility | Engelsiz Bankacılık |
| saveUserTooltip | (DE Original) | If you activate this checkbox, your customer number and name will be shown in this browser when you next log in. Authentication is still required for security reasons. You can delete the saved login data at any time. | Hatırla butonunu aktive etmeniz halinde, bir sonraki girişinizde müşteri numaranız ve isminiz tarayıcınızda gösterilecektir. Güvenlik nedeni ile kimlik doğrulama gereklidir. Kayıtlı oturum açma bilgilerinizi istediğiniz zaman silebilirsiniz. |
| kundennummerTooltip | Ihre Kundennummer finden Sie auf Ihrer Bankkarte. | You can find your customer number on your bank card. | Müşteri numaranızı banka kartınızın arkasında bulabilirsiniz. |
| footerImpressum | Impressum | Site Notice | İletişim |
| footerFaq | FAQ | FAQ | SSS |
| footerDatenschutz | Datenschutz | Data Protection | Veri Güvenliği |
| footerSicherheit | Sicherheit | Security | Güvenlik |
| footerAGB | Geschäftsbedingungen | Terms & Conditions | Hizmet Koşulları |
| footerPhone | 0800 88 66 00 | 0800 88 66 00 | 0800 88 66 00 |

`footerLinks` wird in eine Funktion umgebaut, die `t` und die URL pro Eintrag verbindet.

## Affected Files
- `src/pages/Denizbank.tsx` (einzige Datei)
