import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("translation", { keyPrefix: "about" });
  return (
    <>
      <div className="p-8 mt-36 prose prose-indigo prose-lg text-gray-500 mx-auto font-light text-royalf">
        <div className="p-4 font-thin text-3xl font-md leading-relaxed  rounded-xl">
          {t("catch_phrase.content")}{" "}
          <span className="text-sm"> - {t("catch_phrase.scope")} - </span>
        </div>

        <figure>
          <img
            className="w-full rounded-lg"
            src="/about.jpg"
            alt=""
            width={1310}
            height={873}
          />
          {/* <figcaption>
          Sagittis scelerisque nulla cursus in enim consectetur quam.
        </figcaption> */}
        </figure>
        <p>
          <span className="font-extrabold text-3xl mr-1">H</span>
          {t("p_1")}
        </p>
      </div>
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:py-8 lg:px-8">
          <div className="px-6 py-6 bg-gradient-to-b from-royalf to-royalt rounded-lg md:py-8 md:px-12 lg:py-12 lg:px-16 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {t("contact.title")}
            </h2>
            <p className="mt-3 max-w-3xl text-lg font-light leading-8 text-indigo-200 text-center">
              {t("contact.sentence_1")} <br /> {t("contact.sentence_2")}
            </p>

            <div className="mt-8 w-full sm:max-w-md xl:mt-0 xl:ml-8">
              <a
                href="mailto:sapphire031794@gmail.com"
                type="submit"
                className="mt-3 w-full space-x-4 flex items-center justify-center px-5 py-3 border border-white shadow text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-royalf focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span> {t("contact.send_email")}</span>
              </a>
            </div>

            <div className="mt-4 w-full sm:max-w-md xl:mt-0 xl:ml-8">
              <a
                href="https://www.buymeacoffee.com/sangwon"
                type="submit"
                className="mt-3 w-full space-x-4 flex items-center justify-center px-5 py-3 border border-white shadow text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-royalf focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white "
              >
                <img
                  src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                  alt="Buy me a coffee"
                  className="w-4"
                />
                <span> {t("contact.donate")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
