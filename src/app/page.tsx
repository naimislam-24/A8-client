import Banner from "@/components/homepage/Banner";
import KeyFeatures from "@/components/homepage/KeyFeatures";
import OurCommnity from "@/components/homepage/OurCommnity";
import ResentUpcomming from "@/components/homepage/ResentUpcomming";
import Subscribe from "@/components/homepage/Subscribe";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <KeyFeatures />
      <ResentUpcomming />
      <OurCommnity />
      <Subscribe />
    </div>
  );
}
