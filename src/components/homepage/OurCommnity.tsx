import Image from "next/image";
import image1 from "@/app/images/image-1.jpg";
import image2 from "@/app/images/image-2.jpeg";
import image3 from "@/app/images/image-3.jpg";
import image4 from "@/app/images/image-4.webp";
import image5 from "@/app/images/image-5.jpg";
import image6 from "@/app/images/image-6.jpg";
import image7 from "@/app/images/image-7.jpg";

const OurCommnity = () => {
  return (
    <div>
      <section className="dark:bg-[#080d19] dark:text-white bg-[#022C22] py-12 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 tracking-wide">
            Our Community in Action
          </h2>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-center">
            {/* Image Card 1 */}
            <div className="overflow-hidden rounded-2xl border-2 border-emerald-800/40 shadow-lg hover:scale-105 transition-transform duration-300">
              <Image
                width={600}
                height={600}
                src={image1}
                alt="Community Event 1"
                className="w-full h-48 sm:h-40 object-cover"
              />
            </div>

            {/* Image Card 2 */}
            <div className="overflow-hidden rounded-2xl border-2 border-emerald-800/40 shadow-lg hover:scale-105 transition-transform duration-300">
              <Image
                width={600}
                height={600}
                src={image2}
                alt="Community Event 2"
                className="w-full h-48 sm:h-40 object-cover"
              />
            </div>

            {/* Image Card 3 */}
            <div className="overflow-hidden rounded-2xl border-2 border-emerald-800/40 shadow-lg hover:scale-105 transition-transform duration-300">
              <Image
                width={600}
                height={600}
                src={image3}
                alt="Community Event 3"
                className="w-full h-48 sm:h-40 object-cover"
              />
            </div>

            {/* Image Card 4 */}
            <div className="overflow-hidden rounded-2xl border-2 border-emerald-800/40 shadow-lg hover:scale-105 transition-transform duration-300">
              <Image
                width={600}
                height={600}
                src={image4}
                alt="Community Event 4"
                className="w-full h-48 sm:h-40 object-cover"
              />
            </div>

            {/* Image Card 5 */}
            <div className="overflow-hidden rounded-2xl border-2 border-emerald-800/40 shadow-lg hover:scale-105 transition-transform duration-300">
              <Image
                width={600}
                height={600}
                src={image5}
                alt="Community Event 5"
                className="w-full h-48 sm:h-40 object-cover"
              />
            </div>

            {/* Image Card 6 */}
            <div className="overflow-hidden rounded-2xl border-2 border-emerald-800/40 shadow-lg hover:scale-105 transition-transform duration-300">
              <Image
                width={600}
                height={600}
                src={image6}
                alt="Community Event 6"
                className="w-full h-48 sm:h-40 object-cover"
              />
            </div>

            {/* Image Card 7 */}
            <div className="overflow-hidden rounded-2xl border-2 border-emerald-800/40 shadow-lg hover:scale-105 transition-transform duration-300">
              <Image
                width={600}
                height={600}
                src={image7}
                alt="Community Event 7"
                className="w-full h-48 sm:h-40 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurCommnity;
