import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FaGooglePlay } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  const [showIframe, setShowIframe] = useState(false);

  const logos = [
    { src: "/logos/solana.png", alt: "Solana Logo", width: 100 },
    { src: "/logos/helius.png", alt: "Helius Logo", width: 100 },
    { src: "/logos/orca.png", alt: "Orca Logo", width: 115 },
    { src: "/logos/shyft.png", alt: "Shyft SDK Logo", width: 70 },
    { src: "/logos/solanafm.png", alt: "solanafm Logo", width: 90 },
    { src: "/logos/sphere.png", alt: "Sphere Logo", width: 100 },
    { src: "/logos/symmetry.png", alt: "symmetry Logo", width: 100 },
    { src: "/logos/uxd.png", alt: "UXD Logo", width: 65 },
    { src: "/logos/zeta.png", alt: "Zeta Logo", width: 75 },
    { src: "/logos/marinade.png", alt: "marinade Logo", width: 100 },
    { src: "/logos/jupiter.png", alt: "jupiter Logo", width: 40 },
    { src: "/logos/jito.png", alt: "Jito Logo", width: 50 },
    { src: "/logos/ironforge.svg", alt: "Ironforge Logo", width: 35 },
    { src: "/logos/underdog.png", alt: "Underdog Logo", width: 250 },
    { src: "/logos/phantom2.png", alt: "Phantom", width: 220 },
    { src: "/logos/backpack.svg", alt: "Backpack Logo", width: 100 },
  ];

  return (
    <>
      <div className="bg-color h-screen items-center">
        <Navbar />
        <div className="home-container">
          <div className=" flex flex-col">
            <div className="flex items-start pt-8">
              <div className="flex flex-col max-w-[700px] ml-[100px]  ">
                <h1 className="text-[#F8F7F7] text-[40px] main-title  pb-5">
                  Chew<span className="gradient-text">Glass</span> GPT
                </h1>
                <h2 className="text-[#F8F7F7] font-normal text-[20px] mt-3 tracking-wide	">
                  Making the developer experience on{" "}
                  <span className="gradient-text">Solana</span>
                  &nbsp;seamless with AI-Powered Interactive Code Documentation.
                </h2>
                <div className="h-[1px] bg-[#F8F7F7] max-w-[550px] mt-5 mb-2"></div>
                <h3 className="text-[#F8F7F7] font-normal text-[14px] tracking-wide	 ">
                  Built by developers, for developers.
                  {/* The days of chewing glass are over. */}
                </h3>

                <div className="flex pt-[50px]">
                  <Link href="/chat" target="_blank">
                    <button
                      onClick={() => setShowIframe(!showIframe)}
                      className="try-beta-btn"
                    >
                      Try Beta
                      <FaGooglePlay className="ml-3 activate-arrow" />
                    </button>
                  </Link>

                  {/* <div className="relative border-b border-gray-500 inline-block cursor-pointer bg-[#000] mt-auto ml-auto">
                    <input
                      type="email"
                      placeholder="your email"
                      aria-label="Enter your email"
                      className="py-2 pr-12 pl-2 border-none outline-none focus:ring-0 focus:border-none bg-[#000] text-[#F8F7F7] text-[16px] font-semibold"
                    />
                    <button
                      type="button"
                      aria-label="Submit email"
                      className="absolute right-0 top-0 py-2 px-2 focus:outline-none"
                    >
                      <FaArrowRight color="white" />
                    </button>
                  </div> */}
                </div>

                {/* logo container */}

                <div className="logo-container grid grid-cols-4 gap-4 pt-[50px]">
                  {logos.map((logo, index) => (
                    <div
                      className="flex justify-center items-center bg-[#000]  w-[125px] h-[50px] rounded-md m-2"
                      key={index}
                    >
                      <Image
                        key={index}
                        src={logo.src}
                        width={logo.width}
                        height={10}
                        alt={`Logo ${index + 1}`}
                        className="object-cover items-start justify-center"
                      />
                    </div>
                  ))}
                </div>
                <h3 className="text-[rgba(255,255,255,0.75)] text-center mt-5 font-normal text-[12px] ">
                  Supporting the most ambitious teams{" "}
                </h3>
              </div>

              <Image
                src="/blob.gif"
                width={600}
                height={600}
                alt="Spinner GIF"
                className="mr-auto ml-auto "
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
