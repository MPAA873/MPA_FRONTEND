import Hero from "@/components/Hero";
import EditorialLeadership from "@/components/EditorialLeadership";
import Articles from "@/components/Articles";
import { AnnouncementBanner } from "@/utils/AnnouncementSystem";
import SubmissionProcess from "@/components/SubmissionProcess";

export default function Page() {
  return (
    <main>
      <AnnouncementBanner />
      <Hero />
      {/* Landing on 2 Main Editors */}
      <EditorialLeadership />
      <SubmissionProcess />

      {/* Articles Section with ID for scrolling */}
      <div id="articles-section">
        <Articles />
      </div>
    </main>
  );
}