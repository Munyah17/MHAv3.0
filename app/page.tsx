import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CinematicHero } from "@/components/home/cinematic-hero"
import { CulturalStory } from "@/components/home/cultural-story"
import { AwardsShowcase } from "@/components/home/awards-showcase"
import { VideoPortal } from "@/components/home/video-portal"
import { EventsNews } from "@/components/home/events-news"
import { BoardMembers } from "@/components/home/board-members"
import { NationBuilding } from "@/components/home/nation-building"
import { NominationsCTA } from "@/components/home/nominations-cta"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Cinematic Hero with Mobile Motion Graphics */}
      <CinematicHero />
      
      {/* Cultural Erosion Story - Tradition to Modern World */}
      <CulturalStory />
      
      {/* Awards Categories Showcase */}
      <AwardsShowcase />
      
      {/* Video Portal - Poet Introduction */}
      <VideoPortal />
      
      {/* Events, News, Winners, Red Carpet Section */}
      <EventsNews />
      
      {/* Board Members Section */}
      <BoardMembers />
      
      {/* Brick by Brick Nation Building - United We Stand */}
      <NationBuilding />
      
      {/* Nominations Call to Action */}
      <NominationsCTA />
      
      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </main>
  )
}
