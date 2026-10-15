import {
  Building2, Briefcase, Globe2, MapPin, Mail, Phone, BookOpen, ShieldCheck,
  Unlock, Scale, Link2, ArrowUpRight, Send, Share2, Users,
  Landmark,
} from "lucide-react";

const focusAreas = [
  { icon: Share2, name: "Scholarly communication" },
  { icon: Globe2, name: "Research dissemination" },
  { icon: Users, name: "Academic collaboration" },
  { icon: ShieldCheck, name: "Responsible publication practices" },
];

const publisherDetails = [
  { icon: Building2, label: "Organization Name", value: "MPA Research Consultancy" },
  { icon: Briefcase, label: "Type", value: "Research and Scholarly Publishing Organization" },
  { icon: Globe2, label: "Country", value: "India" },
  {
    icon: Mail,
    label: "Email",
    value: "info@mparesearch.com",
    href: "mailto:info@mparesearch.com",
  },
  {
    icon: Phone,
    label: "Telephone",
    phones: [
      { text: "+91-9452292537", href: "tel:+919452292537" },
      { text: "+91-8923580628", href: "tel:+918923580628" },
    ],
    wide: true,
  },
  {
    icon: MapPin,
    label: "Registered Office & Correspondence Address",
    address: true,
    wide: true,
  },
];

function AddressBlock({ className = "" }) {
  return (
    <address className={`not-italic ${className}`}>
      A-206, Pristine Avenue,
      <br />
      Gaurs City – 2,
      <br />
      Greater Noida – 201009,
      <br />
      Uttar Pradesh, India
    </address>
  );
}

export default function Publisher() {
  return (
    <div className="overflow-x-hidden bg-white text-[#1b1b1f] leading-relaxed">
      {/* HERO */}
      <section className="border-b border-[#ecd9c8] bg-[#fdf3ec] bg-[radial-gradient(900px_300px_at_85%_0%,rgba(22,179,90,0.12),transparent_60%)] py-10 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1180px] px-4">
          <div className="mb-5 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ecd9c8] bg-white px-3.5 py-1.5 text-sm font-semibold text-[#8b4a0f]">
              <Landmark size={15} /> Publisher Information
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ecd9c8] bg-white px-3.5 py-1.5 text-sm font-semibold text-[#8b4a0f]">
              <ShieldCheck size={15} /> Peer Reviewed Journal
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ecd9c8] bg-white px-3.5 py-1.5 text-sm font-semibold text-[#8b4a0f]">
              <Unlock size={15} /> Open Access
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#8b4a0f] sm:text-5xl lg:text-6xl">
            MPA Research <span className="text-[#16b35a]">Consultancy</span>
          </h1>
          <p className="max-w-[60ch] text-base text-[#7a5a3c] sm:text-lg lg:text-xl">
            Publisher of MPA Research, an international, peer-reviewed, open-access
            multidisciplinary journal.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1180px] px-4">
        {/* ABOUT THE PUBLISHER */}
        <section
          aria-labelledby="about-publisher"
          className="relative z-10 -mt-5 grid gap-5 rounded-[22px] border border-[#ecd9c8] bg-white p-5 shadow-[0_20px_50px_-25px_rgba(139,74,15,0.35)] sm:-mt-8 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-8 lg:p-10"
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#8b4a0f] to-[#5e3208] text-white">
            <Building2 size={30} />
          </div>
          <div className="min-w-0">
            <h2 id="about-publisher" className="mb-3 text-2xl font-extrabold text-[#8b4a0f] sm:text-3xl">
              About the Publisher
            </h2>
            <p className="mb-3 text-[#3b3128]">
              MPA Research Consultancy is an independent research and scholarly publishing
              organization based in Greater Noida, Uttar Pradesh, India.
            </p>
            <p className="mb-3 text-[#3b3128]">
              MPA Research Consultancy is the publisher of MPA Research, an international,
              peer-reviewed, open-access multidisciplinary journal dedicated to the
              dissemination of high-quality scientific and scholarly research.
            </p>
            <p className="mb-3 text-[#3b3128]">
              The organization supports scholarly communication, research dissemination,
              academic collaboration, and responsible publication practices across diverse
              scientific and interdisciplinary fields.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {focusAreas.map(({ icon: Icon, name }) => (
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

        {/* PUBLISHER DETAILS */}
        <section className="pt-10 sm:pt-14 lg:pt-16" aria-labelledby="publisher-details">
          <h2 id="publisher-details" className="mb-1 text-2xl font-extrabold text-[#8b4a0f] sm:text-3xl">
            Publisher Details
          </h2>
          <p className="mb-7 text-[#7a5a3c]">Official organization and contact information.</p>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {publisherDetails.map(({ icon: Icon, label, value, href, phones, address, wide }) => (
              <div
                key={label}
                className={`group flex items-start gap-4 rounded-2xl border border-[#ecd9c8] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#16b35a] hover:shadow-[0_12px_28px_-16px_rgba(22,179,90,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                  wide ? "sm:col-span-2" : ""
                }`}
              >
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-[#fdf3ec] text-[#8b4a0f] transition-colors group-hover:bg-[#16b35a] group-hover:text-white">
                  <Icon size={22} />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-semibold text-[#7a5a3c] sm:text-sm">{label}</dt>
                  <dd className="mt-0.5 break-words font-bold">
                    {href && (
                      <a
                        href={href}
                        className="text-[#8b4a0f] underline-offset-4 hover:text-[#16b35a] hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#16b35a]"
                      >
                        {value}
                      </a>
                    )}
                    {phones && (
                      <span className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-3">
                        {phones.map((p, i) => (
                          <span key={p.href} className="inline-flex items-center gap-x-3">
                            <a
                              href={p.href}
                              className="text-[#8b4a0f] underline-offset-4 hover:text-[#16b35a] hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#16b35a]"
                            >
                              {p.text}
                            </a>
                            {i < phones.length - 1 && (
                              <span aria-hidden="true" className="hidden text-[#ecd9c8] sm:inline">
                                /
                              </span>
                            )}
                          </span>
                        ))}
                      </span>
                    )}
                    {address && <AddressBlock />}
                    {!href && !phones && !address && value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        {/* PUBLISHED JOURNAL */}
        <section className="pt-10 sm:pt-14 lg:pt-16" aria-labelledby="published-journal">
          <h2 id="published-journal" className="mb-1 text-2xl font-extrabold text-[#8b4a0f] sm:text-3xl">
            Published Journal
          </h2>
          <p className="mb-7 text-[#7a5a3c]">MPA Research Consultancy publishes:</p>
          <div className="flex flex-col gap-5 rounded-2xl border border-[#ecd9c8] border-l-4 border-l-[#16b35a] bg-[#fdf3ec] p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
            <div className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-gradient-to-br from-[#8b4a0f] to-[#5e3208] text-white">
              <BookOpen size={26} />
            </div>
            <div className="min-w-0">
              <h3 className="mb-2 text-xl font-extrabold text-[#8b4a0f] sm:text-2xl">MPA Research</h3>
              <p className="mb-5 text-[#3b3128]">
                MPA Research is an international, peer-reviewed, open-access multidisciplinary
                journal covering medical and health sciences, life sciences, biotechnology,
                pharmaceutical sciences, computational sciences, technology, management, and
                interdisciplinary research.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#8b4a0f] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#5e3208] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#16b35a] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Journal Website: MPA Research <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* PUBLISHER–JOURNAL RELATIONSHIP */}
        <section className="pt-10 sm:pt-14 lg:pt-16" aria-labelledby="relationship">
          <h2 id="relationship" className="mb-1 text-2xl font-extrabold text-[#8b4a0f] sm:text-3xl">
            Publisher–Journal Relationship
          </h2>
          <p className="mb-7 text-[#7a5a3c]">Roles and editorial independence.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#ecd9c8] bg-white p-5 sm:p-6">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-[#fdf3ec] text-[#8b4a0f]">
                <Link2 size={22} />
              </span>
              <p className="text-[#3b3128]">
                MPA Research Consultancy is the publisher of MPA Research and is responsible
                for the journal&apos;s publication, online dissemination, and scholarly
                publishing operations.
              </p>
            </article>
            <article className="rounded-2xl border border-[#ecd9c8] bg-white p-5 sm:p-6">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-[#fdf3ec] text-[#8b4a0f]">
                <Scale size={22} />
              </span>
              <p className="text-[#3b3128]">
                The journal operates under the editorial oversight of its Editor-in-Chief and
                Editorial Board. Editorial decisions are made independently in accordance with
                the journal&apos;s peer-review process and publication ethics policies.
              </p>
            </article>
          </div>
        </section>

        {/* CONTACT */}
        <section
          aria-labelledby="contact-publisher"
          className="my-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-[#8b4a0f] to-[#5e3208] p-6 text-white sm:my-14 sm:p-8 md:flex-row md:items-center lg:my-16 lg:p-10"
        >
          <div className="min-w-0">
            <h2 id="contact-publisher" className="mb-2 text-2xl font-bold sm:text-3xl">
              Contact the Publisher
            </h2>
            <p className="mb-4 opacity-85">
              For general enquiries concerning the publisher or journal, please contact:
            </p>
            <p className="font-bold">MPA Research Consultancy</p>
            <AddressBlock className="mb-3 opacity-90" />
            <p className="break-words">
              <span className="opacity-85">Email: </span>
              <a
                href="mailto:info@mparesearch.com"
                className="font-bold underline underline-offset-4 hover:opacity-90 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#16b35a]"
              >
                info@mparesearch.com
              </a>
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:flex-col lg:flex-row">
            <a
              href="mailto:info@mparesearch.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#8b4a0f] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#16b35a] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Send size={18} /> Send Email
            </a>
            <a
              href="tel:+919452292537"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white/60 px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#16b35a] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Phone size={18} /> Call Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}