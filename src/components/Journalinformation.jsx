import {
  BookOpen, Globe2, Building2, MapPin, Languages, CalendarDays, Monitor,
  Repeat, ShieldCheck, Unlock, Fingerprint, FlaskConical, FileText,
  Layers, Zap, MessageSquareQuote, Mail, PenLine, ScrollText, Microscope,
  Cpu, HeartPulse, Pill, Network, Dna,
} from "lucide-react";

const details = [
  { icon: BookOpen, label: "Journal Title", value: "MPA Research" },
  { icon: Fingerprint, label: "ISSN (Online)", value: "To be assigned" },
  { icon: Building2, label: "Publisher", value: "MPA Research Consultancy" },
  {
    icon: MapPin,
    label: "Publisher Address",
    value: "A-206, Pristine Avenue, Gaurs City–2, Greater Noida–201009, Uttar Pradesh, India",
    wide: true,
  },
  { icon: Globe2, label: "Country of Publication", value: "India" },
  { icon: Languages, label: "Language", value: "English" },
  { icon: CalendarDays, label: "Starting Year", value: "2026" },
  { icon: Monitor, label: "Publication Format", value: "Online-only" },
  { icon: Repeat, label: "Publication Frequency", value: "Continous online publication, compiled into issue of approximately 5 articles each" },
  { icon: ShieldCheck, label: "Peer Review", value: "Peer-reviewed" },
  { icon: Unlock, label: "Access", value: "Open Access" },
];

const articleTypes = [
  { icon: FlaskConical, title: "Original Research Articles" },
  { icon: ScrollText, title: "Review Articles" },
  { icon: Layers, title: "Systematic Reviews and Meta-Analyses" },
  { icon: Zap, title: "Short Communications" },
  { icon: HeartPulse, title: "Case Reports / Case Studies" },
  { icon: Cpu, title: "Methodology and Technical Articles" },
  { icon: MessageSquareQuote, title: "Perspectives and Commentaries" },
  { icon: Mail, title: "Letters to the Editor" },
  { icon: PenLine, title: "Editorials" },
];

const fields = [
  { icon: HeartPulse, name: "Medical & Health" },
  { icon: Dna, name: "Life Sciences" },
  { icon: Pill, name: "Pharmaceutical" },
  { icon: Cpu, name: "Technology" },
  { icon: Network, name: "Computational" },
  { icon: Microscope, name: "Interdisciplinary" },
];

export default function Journalinformation() {
  return (
    <div className="overflow-x-hidden bg-white text-[#1b1b1f] leading-relaxed">
      {/* HERO */}
      <section className="border-b border-[#ecd9c8] bg-[#fdf3ec] bg-[radial-gradient(900px_300px_at_85%_0%,rgba(22,179,90,0.12),transparent_60%)] py-10 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1180px] px-4">
          <div className="mb-5 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ecd9c8] bg-white px-3.5 py-1.5 text-sm font-semibold text-[#8b4a0f]">
              <span className="h-2 w-2 rounded-full bg-[#16b35a]" /> Submissions are open
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ecd9c8] bg-white px-3.5 py-1.5 text-sm font-semibold text-[#8b4a0f]">
              <ShieldCheck size={15} /> Peer Reviewed
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ecd9c8] bg-white px-3.5 py-1.5 text-sm font-semibold text-[#8b4a0f]">
              <Unlock size={15} /> Open Access
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#8b4a0f] sm:text-5xl lg:text-6xl">
            Journal <span className="text-[#16b35a]">Information</span>
          </h1>
          <p className="max-w-[60ch] text-base text-[#7a5a3c] sm:text-lg lg:text-xl">
            Everything you need to know about MPA Research: publisher details, publication
            format, and the types of scholarly work we publish.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1180px] px-4">
        {/* ABOUT */}
        <section className="relative z-10 -mt-5 grid gap-5 rounded-[22px] border border-[#ecd9c8] bg-white p-5 shadow-[0_20px_50px_-25px_rgba(139,74,15,0.35)] sm:-mt-8 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-8 lg:p-10">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#8b4a0f] to-[#5e3208] text-white">
            <BookOpen size={30} />
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-extrabold text-[#8b4a0f] sm:text-3xl">About MPA Research</h2>
            <p className="mb-3 text-[#3b3128]">
              MPA Research is an international, peer-reviewed, open-access, multidisciplinary
              scholarly journal published by MPA Research Consultancy, Greater Noida, Uttar
              Pradesh, India.
            </p>
            <p className="mb-3 text-[#3b3128]">
              The journal provides a platform for the dissemination of scientifically rigorous
              research and scholarly contributions addressing contemporary challenges across
              medical, health, life, pharmaceutical, technological, computational, and
              interdisciplinary fields.
            </p>
            <p className="mb-3 text-[#3b3128]">
              MPA Research is committed to promoting high-quality research, ethical scholarly
              communication, interdisciplinary collaboration, and the broad dissemination of
              scientific knowledge.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {fields.map(({ icon: Icon, name }) => (
                <li
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f8ef] px-3 py-1.5 text-sm font-semibold text-[#0b7a3b]"
                >
                  <Icon size={16} /> {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DETAILS */}
        <section className="pt-10 sm:pt-14 lg:pt-16" aria-labelledby="jd">
          <h2 id="jd" className="mb-1 text-2xl font-extrabold text-[#8b4a0f] sm:text-3xl">Journal Details</h2>
          <p className="mb-7 text-[#7a5a3c]">Official bibliographic information.</p>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.map(({ icon: Icon, label, value, wide }) => (
              <div
                key={label}
                className={`group flex items-start gap-4 rounded-2xl border border-[#ecd9c8] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#16b35a] hover:shadow-[0_12px_28px_-16px_rgba(22,179,90,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${wide ? "sm:col-span-2" : ""
                  }`}
              >
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-[#fdf3ec] text-[#8b4a0f] transition-colors group-hover:bg-[#16b35a] group-hover:text-white">
                  <Icon size={22} />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-semibold text-[#7a5a3c] sm:text-sm">{label}</dt>
                  <dd className="mt-0.5 break-words font-bold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        {/* ARTICLE TYPES */}
        <section className="pt-10 sm:pt-14 lg:pt-16" aria-labelledby="at">
          <h2 id="at" className="mb-1 text-2xl font-extrabold text-[#8b4a0f] sm:text-3xl">Article Types</h2>
          <p className="mb-7 text-[#7a5a3c]">
            MPA Research considers the following types of scholarly contributions:
          </p>
          <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {articleTypes.map(({ icon: Icon, title }) => (
              <li
                key={title}
                className="flex items-center gap-3.5 rounded-xl border border-l-4 border-[#ecd9c8] border-l-[#16b35a] bg-[#fdf3ec] px-4 py-3.5 font-semibold"
              >
                <Icon size={20} className="flex-none text-[#8b4a0f]" />
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="my-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-[#8b4a0f] to-[#5e3208] p-6 text-white sm:my-14 sm:p-8 md:flex-row md:items-center lg:my-16 lg:p-10">
          <div>
            <h2 className="mb-1 text-2xl font-bold sm:text-3xl">Ready to publish with us?</h2>
            <p className="opacity-85">
              Submissions are open and APCs are fully waived until 31 December 2026.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="/submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#8b4a0f] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#16b35a] motion-reduce:transition-none"
            >
              <FileText size={18} /> Submit Now
            </a>
            <a
              href="mailto:info@mparesearch.com"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white/60 px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#16b35a] motion-reduce:transition-none"
            >
              <Mail size={18} /> Contact
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}