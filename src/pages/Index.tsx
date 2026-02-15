import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import NextMatch from "@/components/NextMatch";
import HeadlinesGrid from "@/components/HeadlinesGrid";
import RecentResults from "@/components/RecentResults";
import ClubStats from "@/components/ClubStats";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MarqueeTicker />
      <NextMatch />
      <HeadlinesGrid />
      <RecentResults />
      <ClubStats />
      <Footer />
    </div>
  );
};

export default Index;
