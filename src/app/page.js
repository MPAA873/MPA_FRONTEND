import Hero from "@/components/Hero";
import EditorialLeadership from "@/components/EditorialLeadership"; // Imported New Component
import Articles from "@/components/Articles";
import { AnnouncementBanner } from "@/utils/AnnouncementSystem";

export default function Page() {
  return (
    <main>
      <AnnouncementBanner/>
      <Hero />
      
      {/* Landing on 2 Main Editors */}
      <EditorialLeadership />

      {/* Articles Section with ID for scrolling */}
      <div id="articles-section">
        <Articles />
      </div>

    </main>
  );
}