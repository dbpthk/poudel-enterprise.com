import NewsLetterBox from "../_components/NewsLetterBox";
import {
  Building2,
  Target,
  Heart,
  Users,
  Zap,
  Shield,
  Truck,
  CreditCard,
  HeadphonesIcon,
  ShoppingCart,
  ArrowRight,
  icons,
} from "lucide-react";

const About = () => {
  const mission = [
    {
      icon: <Target className="w-7 h-7 text-white" />,
      title: "Integrity",
      description:
        "We conduct business with honesty, transparency, and ethical practices in all our dealings.",
      id: 1,
    },
    {
      icon: <Zap className="w-7 h-7 text-white" />,
      title: "Quality",
      description:
        "Every product and service meets our rigorous quality standards for excellence.",
      id: 2,
    },

    {
      icon: <Heart className="w-7 h-7 text-white" />,
      title: "Customer-Centric",
      description:
        "Our customers are at the heart of every decision we make and action we take.",
      id: 3,
    },

    {
      icon: <Building2 className="w-7 h-7 text-white" />,
      title: "Innovation",
      description:
        "We continuously evolve and innovate to meet the changing needs of our customers.",
      id: 4,
    },
  ];

  const team = [
    {
      id: 1,
      name: "Arjun Poudel",
      role: "Founder & CEO",
      description:
        "Visionary leader with 15+ years of experience in e-commerce and business development.",
    },
    {
      id: 2,
      name: "Deepa Poudel",
      role: "Head of Operations",
      description:
        "Operations expert ensuring smooth delivery and exceptional customer service.",
    },
    {
      id: 3,
      name: "Adip Poudel",
      role: "Head of Technology",
      description:
        "Tech innovator driving digital transformation and platform excellence.",
    },
  ];

  const whyChooseUs = [
    {
      id: 1,
      icon: <Truck className="w-7 h-7 text-white" />,
      title: "Fast Delivery",
      description:
        "Lightning-fast delivery to your doorstep with real-time tracking and updates.",
    },
    {
      id: 2,
      icon: <Shield className="w-7 h-7 text-white" />,
      title: "Secure Payment",
      description:
        "Bank-level security with multiple payment options for your convenience.",
    },

    {
      id: 3,
      icon: <HeadphonesIcon className="w-7 h-7 text-white" />,
      title: "Reliable Support",
      description:
        "24/7 customer support team ready to assist you with any questions.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9FAFB" }}>
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 sm:py-10 md:py-12 lg:px-12 lgpy-15">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-4xl lg:text-6xl font-bold mb-8 leading-tight"
              style={{ color: "#1F2937" }}
            >
              About Us
            </h1>
            <p
              className="text-md lg:text-lg max-w-3xl mx-auto font-light leading-relaxed"
              style={{ color: "#4B5563" }}
            >
              Empowering businesses with quality products and seamless shopping
              experience.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mt-10 sm:mt-5 py-8 lg:py-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h2
                className="text-3xl lg:text-4xl font-bold leading-tight mb-6"
                style={{ color: "#1F2937" }}
              >
                Our Story
              </h2>
              <div className="space-y-4">
                <p
                  className="text-base lg:text-lg leading-relaxed"
                  style={{ color: "#4B5563" }}
                >
                  At Poudel Enterprise, we believe in delivering exceptional
                  value and innovative solutions that exceed expectations. Our
                  commitment to quality, integrity, and customer satisfaction
                  drives everything we do.
                </p>
                <p
                  className="text-base lg:text-lg leading-relaxed"
                  style={{ color: "#4B5563" }}
                >
                  Founded with a vision to create lasting partnerships and
                  sustainable growth, Poudel Enterprise is more than just a
                  business — it's a commitment to excellence. Whether you're
                  looking for innovative products or reliable services, we're
                  here to support your success.
                </p>
                <p
                  className="text-base lg:text-lg leading-relaxed"
                  style={{ color: "#4B5563" }}
                >
                  Our journey began with a simple mission: to make quality
                  products accessible to everyone while maintaining the highest
                  standards of customer service and business integrity.
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative group">
              <div
                className="absolute -inset-2 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700 blur-xl"
                style={{ backgroundColor: "#D1D5DB" }}
              ></div>
              <div className="relative">
                <img
                  className="w-full rounded-xl shadow-lg transition-all duration-700"
                  src="/about_img.png"
                  alt="Poudel Enterprise Story"
                  style={{
                    boxShadow: "0 20px 40px -12px rgba(209, 213, 219, 0.2)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div
        className="mt-10 py-15 lg:py-20"
        style={{ backgroundColor: "#D1D5DB" }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10 ">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ color: "#1F2937" }}
            >
              Mission & Values
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto font-light"
              style={{ color: "#4B5563" }}
            >
              The core principles that guide everything we do at Poudel
              Enterprise
            </p>
          </div>

          <div className="flex items-center justify-center ">
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10  p-4 rounded-xl">
              {mission.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col bg-white rounded-xl items-center p-4 shadow-md"
                >
                  <div className="bg-accent p-3 rounded-2xl">{item.icon}</div>

                  <div className="flex flex-col gap-2 items-center justify-center p-4">
                    <h3 className="text-lg font-bold mb-2 text-center">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-center">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 lg:py-28 bg-gradient-light">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ color: "#1F2937" }}
            >
              Meet Our Team
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto font-light"
              style={{ color: "#4B5563" }}
            >
              The passionate individuals behind Poudel Enterprise's success
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col bg-white  rounded-xl items-center p-4 shadow-md"
                >
                  <div className="bg-accent p-3 rounded-2xl">
                    <Users className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex flex-col gap-2 items-center justify-center p-4">
                    <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                    <p className="text-sm leading-relaxed text-center">
                      {item.role}
                    </p>
                    <p className="text-sm leading-relaxed text-center">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-15 lg:py-20" style={{ backgroundColor: "#D1D5DB" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ color: "#1F2937" }}
            >
              Why Choose Us
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto font-light"
              style={{ color: "#4B5563" }}
            >
              Discover the unique advantages that set Poudel Enterprise apart
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {whyChooseUs.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col bg-white  rounded-xl items-center p-4 shadow-md"
                  >
                    <div className="bg-accent p-3 rounded-2xl">{item.icon}</div>

                    <div className="flex flex-col gap-2 items-center justify-center p-4">
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-center">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 lg:py-28 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Start Shopping with Us Today
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto font-light">
            Join thousands of satisfied customers who trust Poudel Enterprise
            for their shopping needs.
          </p>
          <a
            href="/collection"
            className="inline-flex items-center px-6 py-3 bg-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <ShoppingCart className="w-5 h-5 mr-3 text-color-accent" />
            <p className="text-color-accent">Explore Our Collection</p>
            <ArrowRight className="w-5 h-5 ml-3" />
          </a>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
