import {
  Unlock,
  Copyright,
  Wallet,
  Users,
  ShieldCheck,
  Scale,
  ShieldAlert,
  Archive,
  RefreshCcw,
  MessageSquare,
  PenTool,
  AlertTriangle,
  FolderOpen,
  Bot,
  Eye,
  UserX,
  Quote,
} from "lucide-react";

// Every policy section shown on the Journal Policies page.
// `id` doubles as the anchor / URL hash (e.g. #open-access) and the
// key used to drive the sidebar's active-state highlighting.
export const policies = [
  {
    id: "open-access",
    number: "01",
    title: "Open Access Policy",
    icon: Unlock,
    content: (
      <>
        <p>
          MPA Research is a fully open access journal. All articles are
          freely available online to everyone, immediately upon publication,
          with no embargo period, no subscription, no pay-to-read wall, and
          no requirement to register or log in to read, download, copy,
          distribute, print, or link to the full text of any article.
        </p>
        <p>
          This policy is consistent with the Budapest Open Access Initiative
          definition of open access. Readers are permitted to use published
          articles for any lawful purpose in accordance with the license
          under which each article is published (see the Licensing and
          Copyright Policy).
        </p>
        <p>
          There is no charge to readers or their institutions for access.
          The journal&rsquo;s open access model is supported by Article
          Processing Charges paid by authors or their institutions, where
          applicable (see the Article Processing Charges Policy).
        </p>
        <div className="bg-[#FDF6ED] border border-[#F2E8DA] rounded-2xl px-5 py-4 text-[#713F12] font-medium text-[15px] leading-relaxed">
          Free to read &middot; Free to download &middot; Free to
          distribute &middot; Free to cite &mdash; immediately and
          permanently, subject only to correct attribution.
        </div>
        <p>
          Contact:{" "}
          <a href="mailto:info@mparesearch.com">info@mparesearch.com</a>
        </p>
      </>
    ),
  },
  {
    id: "licensing-copyright",
    number: "02",
    title: "Licensing and Copyright Policy",
    icon: Copyright,
    content: (
      <>
        <p>
          <strong>Copyright.</strong> Authors retain full copyright of their
          work published in MPA Research. No transfer or assignment of
          copyright to the journal or publisher is required as a condition
          of publication.
        </p>
        <p>
          <strong>License.</strong> All articles are published under the
          Creative Commons Attribution 4.0 International License (CC BY 4.0)
          unless a different Creative Commons license is explicitly stated
          on the article itself. Under CC BY 4.0, anyone is free to copy,
          redistribute, remix, transform, and build upon the material in any
          medium or format, for any purpose, including commercially,
          provided that appropriate credit is given to the author(s) and the
          original source, a link to the license is provided, and any
          changes made are indicated.
        </p>
        <p>
          <strong>Author grant.</strong> By submitting to MPA Research,
          authors confirm that the work is their own, that they hold the
          rights necessary to publish it, and that they grant MPA Research a
          non-exclusive right to publish the article and to identify itself
          as the original publisher. Because authors retain copyright, they
          may reuse and self-archive their published article (including the
          final published version) without seeking permission, provided the
          original publication in MPA Research is cited.
        </p>
        <p>
          <strong>Third-party material.</strong> Where an article contains
          material (figures, tables, images, extended quotations) owned by
          a third party, it is the author&rsquo;s responsibility to obtain
          written permission for its reuse under the article&rsquo;s license
          and to provide appropriate attribution.
        </p>
        <p>
          <strong>Machine-readable licensing.</strong> The applicable
          license is displayed on the full text and metadata of every
          article and embedded in a machine-readable form.
        </p>
        <p>
          License URL:{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            creativecommons.org/licenses/by/4.0
          </a>
        </p>
      </>
    ),
  },
  {
    id: "apc-fees",
    number: "03",
    title: "Article Processing Charges (APC) & Fees",
    icon: Wallet,
    content: (
      <>
        <p>
          MPA Research is committed to full transparency about all fees.
          This page states every charge that may apply to authors. There
          are no charges beyond those listed here.
        </p>
        <p>
          <strong>Submission fees.</strong> MPA Research does not charge any
          submission, handling, or manuscript-processing fee. Submitting a
          manuscript is free.
        </p>
        <p>
          <strong>Article Processing Charge (APC).</strong> A standard
          Article Processing Charge applies to manuscripts that are
          accepted for publication after peer review. The APC covers
          editorial processing, peer-review management, production,
          hosting, permanent archiving, and DOI registration. The APC is
          payable only after a manuscript has been accepted; authors are
          never asked to pay in order to have a manuscript reviewed.
        </p>
        <div className="bg-[#FDF6ED] border border-[#F2E8DA] rounded-2xl px-5 py-4 text-[#713F12] font-medium text-[15px] leading-relaxed">
          Current waiver: for manuscripts submitted on or before 31 December
          2026, the APC is fully waived &mdash; accepted authors pay
          nothing. This is a temporary promotional policy; manuscripts
          submitted after that date are subject to the standard APC unless
          a separate waiver is granted.
        </div>
        <p>
          <strong>Waiver and discount policy.</strong> MPA Research
          recognises that the ability to pay should not determine the
          ability to publish. Authors who cannot pay the APC may request a
          full or partial waiver at the point of submission by writing to{" "}
          <a href="mailto:info@mparesearch.com">info@mparesearch.com</a>.
          Waiver decisions are made independently of the editorial decision
          on the manuscript; requesting or receiving a waiver has no bearing
          whatsoever on whether a manuscript is accepted or rejected.
        </p>
        <p>
          <strong>No hidden charges.</strong> There are no charges for
          colour figures, supplementary files, English-language editing
          (which is optional and not required for review), page counts, or
          any other item. Any optional paid service, if ever offered, would
          be clearly identified as optional and would never affect the
          editorial decision.
        </p>
        <p>
          <strong>Refunds.</strong> Where an APC has been paid and an
          article is subsequently withdrawn or retracted through no fault of
          the author, refund requests are considered on a case-by-case
          basis at{" "}
          <a href="mailto:info@mparesearch.com">info@mparesearch.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "peer-review",
    number: "04",
    title: "Peer Review Policy",
    icon: Users,
    content: (
      <>
        <p>
          All research content published in MPA Research undergoes external
          peer review before acceptance. Editorials, announcements, and
          clearly labelled non-peer-reviewed material, if any, are the only
          exceptions and are identified as such.
        </p>
        <p>
          <strong>Type of review.</strong> MPA Research uses
          single-anonymised (single-blind) peer review: reviewers know the
          identity of the authors, but the authors do not know the identity
          of the reviewers.
        </p>
        <p>
          <strong>Process.</strong>
        </p>
        <ol>
          <li>
            <strong>Initial editorial check.</strong> On submission, an
            editor screens the manuscript for scope, completeness, ethical
            compliance, and originality (including plagiarism screening).
            Manuscripts that fall outside scope or fail basic checks may be
            rejected without external review.
          </li>
          <li>
            <strong>Reviewer assignment.</strong> Suitable manuscripts are
            assigned to at least two independent expert reviewers with
            relevant subject expertise. Reviewers are selected for their
            competence in the manuscript&rsquo;s subject area and must have
            no conflict of interest with the authors or the content.
          </li>
          <li>
            <strong>Review.</strong> Reviewers assess originality,
            methodological soundness, validity of results, clarity, ethical
            compliance, and appropriate citation of prior work, and
            recommend one of: accept, minor revision, major revision, or
            reject.
          </li>
          <li>
            <strong>Editorial decision.</strong> A handling editor makes the
            decision based on the reviewers&rsquo; reports and the
            manuscript&rsquo;s merit. In cases of conflicting reviews, an
            additional reviewer may be consulted. The final decision rests
            with the editor, not the reviewers.
          </li>
          <li>
            <strong>Revision and re-review.</strong> Revised manuscripts may
            be returned to the original reviewers for confirmation that
            concerns have been addressed.
          </li>
        </ol>
        <p>
          <strong>Indicative timelines.</strong> The journal aims to
          complete initial screening promptly and peer review within a
          typical range of a few weeks, though timelines vary with reviewer
          availability and manuscript complexity. Speed is never
          prioritised over the rigour of review.
        </p>
        <p>
          <strong>Reviewer conduct.</strong> Reviewers must treat
          manuscripts as confidential, must declare any competing interests,
          must not use unpublished material for their own advantage, and
          must provide objective, constructive assessments. Reviewers are
          expected to follow COPE&rsquo;s Ethical Guidelines for Peer
          Reviewers.
        </p>
        <p>
          Handling of editors&rsquo; own submissions is covered separately
          &mdash; see the{" "}
          <a href="#editorial-independence">
            Editorial Independence and Editor-Authored Submissions Policy
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "publication-ethics",
    number: "05",
    title: "Publication Ethics & Malpractice",
    icon: ShieldCheck,
    content: (
      <>
        <p>
          MPA Research is committed to upholding the highest standards of
          publication ethics and follows the Core Practices of the
          Committee on Publication Ethics (COPE). All parties involved in
          publication &mdash; authors, editors, reviewers, and the publisher
          &mdash; are expected to meet the standards below.
        </p>
        <p>
          <strong>Duties of authors.</strong> Authors must ensure that
          submitted work is original, has not been published elsewhere, and
          is not under consideration by another journal. Data must be
          accurate and, where appropriate, available. Fabrication,
          falsification, plagiarism, and inappropriate image manipulation
          are unacceptable and constitute serious misconduct. All sources
          must be properly cited. All persons who made significant
          contributions must be listed as authors, and all listed authors
          must have approved the submission. Any financial or personal
          conflict of interest must be disclosed.
        </p>
        <p>
          <strong>Duties of editors.</strong> Editors decide which
          submissions are published, based solely on academic merit,
          validity, and relevance to the journal&rsquo;s scope, without
          regard to the authors&rsquo; race, gender, religion, nationality,
          seniority, or institutional affiliation. Editors must keep
          submissions confidential, must not use unpublished information for
          personal advantage, must handle conflicts of interest, and must
          act promptly and fairly when ethical concerns are raised,
          following COPE flowcharts.
        </p>
        <p>
          <strong>Duties of reviewers.</strong> Reviewers must maintain
          confidentiality, declare conflicts of interest, decline review
          where they cannot be objective or lack expertise, and provide
          timely, constructive, and evidence-based assessments.
        </p>
        <p>
          <strong>Duties of the publisher.</strong> MPA Research supports
          editorial independence, maintains the integrity of the academic
          record, and is prepared to publish corrections, clarifications,
          retractions, and apologies when needed.
        </p>
        <p>
          <strong>Handling misconduct.</strong> Allegations of misconduct
          &mdash; whether against authors, reviewers, or editors, and
          whether raised before or after publication &mdash; are
          investigated in line with COPE guidance. Outcomes may include
          correction, expression of concern, retraction, notification of
          the authors&rsquo; institutions, and a ban on future submissions.
          The journal follows due process and gives those accused an
          opportunity to respond.
        </p>
        <p>
          <strong>Conflicts of interest.</strong> All authors must declare
          competing financial and non-financial interests. Where no
          competing interests exist, a statement to that effect is
          published.
        </p>
        <p>
          Complaints and appeals are handled as set out in the{" "}
          <a href="#complaints-appeals">Complaints and Appeals Policy</a>.
        </p>
      </>
    ),
  },
  {
    id: "editorial-independence",
    number: "06",
    title: "Editorial Independence & Editor-Authored Submissions",
    icon: Scale,
    content: (
      <>
        <p>
          <strong>Editorial independence.</strong> Editorial decisions at
          MPA Research are based solely on the scholarly merit of the work
          and its fit with the journal&rsquo;s scope. They are not
          influenced by the commercial interests of the journal, by the
          payment or waiver of any fee, or by any external party.
        </p>
        <p>
          <strong>
            Submissions authored by editors or editorial board members.
          </strong>{" "}
          MPA Research permits members of its editorial board to submit
          their own research, but such submissions receive additional
          safeguards to prevent any conflict of interest:
        </p>
        <ul>
          <li>
            An editor or board member who is an author of a submission is
            completely excluded from the handling and decision-making for
            that manuscript.
          </li>
          <li>
            The manuscript is assigned to an independent editor or an
            external handling editor with no conflict of interest, and
            undergoes the same external peer review as any other
            submission.
          </li>
          <li>
            The authoring editor has no access to reviewer identities,
            reviewer reports, or the editorial decision process for their
            own manuscript.
          </li>
          <li>
            To protect the integrity of the journal, the proportion of
            content authored by the journal&rsquo;s own editors and board
            members is kept low and is monitored; the editorial board does
            not use the journal primarily as an outlet for its own work.
          </li>
        </ul>
        <p>
          <strong>Editor conflicts of interest.</strong> Editors recuse
          themselves from any manuscript where they have a competing
          interest, including manuscripts from close colleagues,
          collaborators, or their own institution where objectivity could
          reasonably be questioned.
        </p>
      </>
    ),
  },
  {
    id: "plagiarism",
    number: "07",
    title: "Plagiarism Policy",
    icon: ShieldAlert,
    content: (
      <>
        <p>
          MPA Research has a zero-tolerance policy toward plagiarism,
          including self-plagiarism (redundant publication) and the use of
          others&rsquo; ideas, data, text, or images without proper
          attribution.
        </p>
        <p>
          <strong>Screening.</strong> Every submission is screened using
          plagiarism-detection software before peer review. Manuscripts
          showing unattributed overlap with existing published work are
          returned to authors or rejected, depending on the extent and
          nature of the overlap.
        </p>
        <p>
          <strong>Action on detected plagiarism.</strong> Where plagiarism
          is identified before publication, the manuscript is rejected.
          Where it is discovered after publication, the journal follows
          COPE guidance, which may result in a correction, an expression of
          concern, or a retraction, and notification of the authors&rsquo;
          institution.
        </p>
        <p>
          <strong>Text recycling and duplicate submission.</strong>{" "}
          Submitting the same manuscript to more than one journal
          simultaneously, or re-publishing substantially overlapping work
          without disclosure and citation, is treated as misconduct.
        </p>
      </>
    ),
  },
  {
    id: "archiving-preservation",
    number: "08",
    title: "Archiving & Digital Preservation",
    icon: Archive,
    content: (
      <>
        <p>
          MPA Research is committed to the long-term availability of its
          content.
        </p>
        <p>
          <strong>Preservation.</strong> The full text and metadata of all
          published articles are deposited for permanent preservation in
          Zenodo, the open digital repository operated by CERN, and each
          article is assigned a permanent Digital Object Identifier (DOI)
          through that deposit. This ensures that articles remain
          accessible and citable even if the journal&rsquo;s own website
          becomes unavailable.
        </p>
        <p>
          <strong>Access continuity.</strong> Because content is preserved
          in an independent third-party repository with persistent
          identifiers, the scholarly record is protected against loss.
        </p>
      </>
    ),
  },
  {
    id: "corrections-retractions",
    number: "09",
    title: "Corrections, Retractions & Withdrawals",
    icon: RefreshCcw,
    content: (
      <>
        <p>
          MPA Research follows COPE guidelines for correcting the published
          record.
        </p>
        <p>
          <strong>Corrections.</strong> Minor errors that do not affect the
          findings or conclusions are addressed with a published correction
          (erratum/corrigendum) that is linked to the original article. The
          original article remains available; the correction is clearly
          labelled and dated.
        </p>
        <p>
          <strong>Retractions.</strong> Articles are retracted where
          findings are unreliable due to major error or misconduct (such as
          fabrication, falsification, or plagiarism), where the work has
          been published elsewhere without disclosure, where ethical
          approval was absent, or where there is clear evidence of a
          serious breach of publication ethics. Retracted articles are not
          removed; they remain online, clearly watermarked as retracted,
          with a linked retraction notice explaining the reason.
        </p>
        <p>
          <strong>Expressions of concern.</strong> Where there is
          well-founded concern that is still under investigation, the
          journal may publish an expression of concern pending the
          outcome.
        </p>
        <p>
          <strong>Withdrawal before publication.</strong> Authors may
          request withdrawal of a manuscript before it is published;
          requests are considered in line with COPE guidance, particularly
          where an ethical concern has arisen.
        </p>
      </>
    ),
  },
  {
    id: "complaints-appeals",
    number: "10",
    title: "Complaints & Appeals Policy",
    icon: MessageSquare,
    content: (
      <>
        <p>
          <strong>Appeals against editorial decisions.</strong> Authors who
          believe a decision was based on a factual error or a
          misunderstanding of the manuscript may appeal by emailing{" "}
          <a href="mailto:info@mparesearch.com">info@mparesearch.com</a>{" "}
          with a point-by-point response to the concerns raised. Appeals
          are reviewed by an editor who was not involved in the original
          decision. The editorial decision on an appeal is final.
        </p>
        <p>
          <strong>Complaints.</strong> Complaints about the conduct of the
          journal, its editors, reviewers, or publisher &mdash; including
          complaints about publication ethics, editorial process, or
          journal management &mdash; may be sent to{" "}
          <a href="mailto:info@mparesearch.com">info@mparesearch.com</a>.
          Complaints are acknowledged promptly and handled following COPE
          guidance, with an explanation of the outcome provided to the
          complainant.
        </p>
      </>
    ),
  },
  {
    id: "authorship-contributorship",
    number: "11",
    title: "Authorship & Contributorship",
    icon: PenTool,
    content: (
      <>
        <p>
          MPA Research follows the authorship criteria of the International
          Committee of Medical Journal Editors (ICMJE). Authorship should be
          based on substantial contribution to the conception or design of
          the work or the acquisition, analysis, or interpretation of data;
          drafting or critically revising the work; approval of the final
          version; and agreement to be accountable for the work.
        </p>
        <p>
          All authors listed must meet these criteria, and all who meet
          them must be listed. Contributors who do not meet the criteria
          (for example, funding acquisition or general supervision alone)
          should be acknowledged rather than listed as authors.
        </p>
        <p>
          Changes to authorship (additions, removals, or reordering) after
          submission require the written agreement of all authors and an
          explanation to the editor.
        </p>
        <p>
          Corresponding author responsibilities include ensuring that all
          named authors have approved the submission and any changes, and
          managing communication with the journal.
        </p>
      </>
    ),
  },
  {
    id: "conflict-of-interest",
    number: "12",
    title: "Conflict of Interest / Competing Interests",
    icon: AlertTriangle,
    content: (
      <>
        <p>
          All authors, editors, and reviewers must disclose any financial or
          non-financial interests that could be perceived to influence the
          work or its assessment. For authors, this includes funding
          sources, employment, consultancies, honoraria, patents, and
          personal relationships relevant to the work. Every published
          article carries a competing-interests statement; where none
          exist, this is stated explicitly. Funding sources must be
          declared in a dedicated funding statement.
        </p>
      </>
    ),
  },
  {
    id: "data-research-materials",
    number: "13",
    title: "Data & Research Materials Policy",
    icon: FolderOpen,
    content: (
      <>
        <p>
          MPA Research encourages authors to make the data and materials
          underlying their published findings available to the extent that
          ethics and confidentiality allow. Authors are encouraged to
          deposit datasets in a recognised repository and to include a data
          availability statement in the manuscript indicating where the
          data can be found and under what conditions they can be accessed.
        </p>
      </>
    ),
  },
  {
    id: "ai-policy",
    number: "14",
    title: "Authorship and AI Tools",
    icon: Bot,
    badge: "Editorial Guidelines",
    content: (
      <>
        <p>
          MPA Journals recognizes that there are a myriad of AI tools
          available, and our policy is designed to guide their responsible
          use while maintaining the integrity and excellence of scientific
          publishing in this journal. Authors using AI tools should use
          them transparently and ethically, in accordance with the Ethical
          Guidelines to Publication of Research and following the best
          practices and policies detailed below. Authors are responsible
          for all submitted content including the accuracy of AI-generated
          content as well as referencing associated material as
          appropriate.
        </p>

        <div className="flex gap-4 bg-[#FDF6ED]/70 border border-[#F2E8DA] rounded-2xl p-5 md:p-6">
          <div className="w-11 h-11 shrink-0 bg-white rounded-xl flex items-center justify-center text-[#d97706] shadow-sm border border-[#F2E8DA]">
            <Eye size={22} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#713F12] mb-2">
              Transparency
            </h4>
            <p className="text-[#854D0E] leading-relaxed mb-4">
              All use of AI tools should be disclosed within the
              submission. As stated in each journal&rsquo;s Author
              Guidelines:
            </p>
            <div className="relative bg-white rounded-xl p-4 border border-gray-100 italic text-gray-600 text-sm leading-relaxed flex gap-2">
              <Quote size={18} className="text-gray-300 shrink-0 mt-0.5" />
              <span>
                &ldquo;The use of AI tools for text or image generation
                should be disclosed in the manuscript within the
                Acknowledgment section with a description of when and how
                the tools were used. For more substantial use cases or
                descriptions of AI tool use, authors should provide full
                details within the Methods or other appropriate section of
                the manuscript.&rdquo;
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 bg-[#FDF6ED]/70 border border-[#F2E8DA] rounded-2xl p-5 md:p-6">
          <div className="w-11 h-11 shrink-0 bg-white rounded-xl flex items-center justify-center text-[#d97706] shadow-sm border border-[#F2E8DA]">
            <UserX size={22} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#713F12] mb-2">
              Authorship
            </h4>
            <p className="text-[#854D0E] leading-relaxed mb-2">
              AI tools cannot meet the requirements for authorship as they
              cannot take responsibility and accountability for the
              published work. As such, AI tools{" "}
              <strong className="text-red-600 font-semibold">
                should not be included
              </strong>{" "}
              in the authorship list.
            </p>
            <p className="text-[#854D0E] leading-relaxed">
              Instead, AI tools should be acknowledged and mentioned
              transparently, as described in the Transparency guidelines
              above.
            </p>
          </div>
        </div>
      </>
    ),
  },
];