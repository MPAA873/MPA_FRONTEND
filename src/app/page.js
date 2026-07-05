import Hero from "@/components/Hero";
import EditorialLeadership from "@/components/EditorialLeadership";
import Articles from "@/components/Articles";
import { AnnouncementBanner } from "@/utils/AnnouncementSystem";
import SubmissionProcess from "@/components/SubmissionProcess";
import BecomeReviewer from "@/components/BecomeReviewer";
import JournalInfo from "@/components/JournalInfo";
import StatsSection from "@/components/StatsSection";


export default function Page() {
  return (
    <main>
      <AnnouncementBanner />
      <Hero />

      <StatsSection/>

      {/* Landing on 2 Main Editors */}
      <EditorialLeadership />
      <SubmissionProcess />

      {/* Articles Section with ID for scrolling */}
      <div id="articles-section">
        <Articles />
      </div>
      <BecomeReviewer/>
      <JournalInfo/>
    </main>
  );
}