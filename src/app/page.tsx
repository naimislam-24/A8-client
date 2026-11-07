import Banner from "@/components/homepage/Banner";
import KeyFeatures from "@/components/homepage/KeyFeatures";
import OurCommnity from "@/components/homepage/OurCommnity";
import ResentUpcomming from "@/components/homepage/ResentUpcomming";
import Subscribe from "@/components/homepage/Subscribe";

export default function Home() {
  return (
    <div className="">
      <div className="min-h-screen bg-white text-gray-900 dark:bg-[#080d19] dark:text-white transition-colors duration-300">
        <Banner />
        <KeyFeatures />
        <ResentUpcomming />
        <OurCommnity />
        <Subscribe />
      </div>
    </div>
  );
}
