import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        {/* <WhoWeAre />
        <WhyChooseUs />
        <OurServices /> */}
      </main>
    </div>
  );
};

export default Index;