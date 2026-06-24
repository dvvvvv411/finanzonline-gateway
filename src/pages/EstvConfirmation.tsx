import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Info, ArrowLeft } from "lucide-react";
import { EstvHeader, EstvFooter, ESTV_RED, ESTV_TEXT } from "@/components/EstvChrome";
import { EstvI18nProvider, useEstvI18n, type EstvLang } from "@/components/EstvI18n";
import { usePageMeta } from "@/hooks/use-page-meta";
import flagAsset from "@/assets/swiss-flag.svg";

const DATE_LOCALES: Record<EstvLang, string> = {
  de: "de-CH",
  fr: "fr-CH",
  it: "it-CH",
  en: "en-GB",
};

const Inner = () => {
  const { t, lang } = useEstvI18n();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  usePageMeta(t("page.confirmation.meta.title"), flagAsset);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const ref = useMemo(() => {
    const s = params.get("s");
    const base = (s || crypto.randomUUID().slice(0, 8)).toUpperCase();
    return `ESTV-${base}`;
  }, [params]);

  const today = useMemo(
    () =>
      new Date().toLocaleDateString(DATE_LOCALES[lang], {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    [lang]
  );

  return (
    <div
      className="min-h-screen flex flex-col bg-white"
      style={{ color: ESTV_TEXT, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <EstvHeader />

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-[1280px] mx-auto px-6 mb-6 text-[13px] text-gray-600">
          <span>{t("page.breadcrumb.home")}</span>
          <span className="mx-2">›</span>
          <span>{t("header.nav.vst")}</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{t("page.confirmation.breadcrumb")}</span>
        </div>

        <div className="max-w-[860px] mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#E8F5EC" }}
            >
              <CheckCircle2 className="w-9 h-9" style={{ color: "#1E8E3E" }} strokeWidth={2.25} />
            </div>
          </div>

          <h1 className="text-center text-[32px] md:text-[40px] font-semibold tracking-tight leading-[1.1] mb-4">
            {t("page.confirmation.title")}
          </h1>
          <p className="text-center text-[16px] text-gray-700 leading-relaxed max-w-[640px] mx-auto mb-10">
            {t("page.confirmation.intro")}
          </p>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)] mb-8">
            <div className="px-6 md:px-8 py-6 border-b border-gray-100 bg-gradient-to-b from-[#FAFAFA] to-white rounded-t-2xl">
              <h2 className="text-[18px] font-semibold">{t("page.confirmation.cardTitle")}</h2>
            </div>
            <dl className="p-6 md:p-8 divide-y divide-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 py-3 first:pt-0">
                <dt className="text-[13px] font-medium text-gray-500">
                  {t("page.confirmation.refLabel")}
                </dt>
                <dd className="text-[14px] font-mono text-gray-900">{ref}</dd>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 py-3">
                <dt className="text-[13px] font-medium text-gray-500">
                  {t("page.confirmation.dateLabel")}
                </dt>
                <dd className="text-[14px] text-gray-900">{today}</dd>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 py-3 last:pb-0">
                <dt className="text-[13px] font-medium text-gray-500">
                  {t("page.confirmation.statusLabel")}
                </dt>
                <dd className="text-[14px] text-gray-900 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#1E8E3E" }} />
                  {t("page.confirmation.statusValue")}
                </dd>
              </div>
            </dl>
          </div>

          <div
            className="rounded-xl border-l-[3px] p-4 mb-10 flex gap-3"
            style={{ borderColor: ESTV_RED, backgroundColor: "#FDF2F3" }}
          >
            <Info className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ESTV_RED }} />
            <div className="text-[14px] text-gray-800 leading-relaxed">
              <strong>{t("page.confirmation.noticeTitle")}</strong>{" "}
              {t("page.confirmation.notice")}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/estv")}
              className="inline-flex items-center gap-2 text-[14px] font-semibold px-6 py-3 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-150"
              style={{ color: ESTV_TEXT }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("page.confirmation.backHome")}</span>
            </button>
          </div>
        </div>
      </main>

      <EstvFooter />
    </div>
  );
};

const EstvConfirmation = () => (
  <EstvI18nProvider>
    <Inner />
  </EstvI18nProvider>
);

export default EstvConfirmation;
