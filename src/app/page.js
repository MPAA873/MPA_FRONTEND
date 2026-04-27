import Hero from "@/components/Hero";
import { AnnouncementBanner } from "@/utils/AnnouncementSystem";

export default function Page() {
  return (
    <div>
      <AnnouncementBanner />
      <Hero />
    </div>
  );
}