import Articles from "@/components/Articles";
import AuthorGuidelines from "@/components/Guidelines";
import Hero from "@/components/Hero";
import { AnnouncementBanner } from "@/utils/AnnouncementSystem";

export default function Page() {
  return (
    <div>
      <AnnouncementBanner />
      <Hero />
      <Articles/>
    </div>
  );
}