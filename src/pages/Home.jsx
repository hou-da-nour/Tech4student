import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import NewCollection from "../components/NewCollection"
import Promotions from "../components/Promotions"
import Footer from "../components/Footer"
import SloganSection from "../components/SloganSection"

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SloganSection />
      <NewCollection />
      <Promotions />
      <Footer />
    </>
  )
}
