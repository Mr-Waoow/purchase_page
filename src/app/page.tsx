"use client";
import { useTranslation } from "react-i18next";
import "../utils/i18n";
import ReactFlagsSelect from "react-flags-select";
import { useEffect, useState } from "react";
import PersonalInfo from "./personalInfo";
import PaymentMethods from "./paymentMethods";
import OrderOverview from "./orderOverview";
import i18n from "../utils/i18n";

export default function Home() {
  const { t } = useTranslation();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isErrorTerm, setIsErrorTerm] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState("GB");
  const [language, setLanguage] = useState("en");
  const [personalInfo, setPersonalInfo] = useState({
    loginPhoneNumber: "",
    contactPhoneNumber: "",
    contactName: "",
    contactEmail: "",
    billingAddress: "",
    number: "",
    billingZip: "",
    billingCity: "",
    country: "",
    sessions: "",
    isPersonalInfoValid: false,
  });
  const [paymentMethod, setPaymentMethod] = useState({
    cardHolder: "",
    cardNumber: "",
    monthYear: "",
    numberOfSessionsPM: "",
    isPaymentMethodValid: false,
  });
  const [order, setOrder] = useState({
    discount: 4,
    regularPrice: 29.6,
    price: 0,
    totalCoast: 0,
    discountPrice: 0,
    inAdvance: false,
  });
  const handlePersonalDataChange = (data: Partial<PersonalData>) => {
    setPersonalInfo((prev) => ({ ...prev, ...data }));
  };
  const handlePaymentMethodDataChange = (data: any) => {
    setPaymentMethod((prev) => ({ ...prev, ...data }));
  };

  const handleOrderDataChange = (data: any) => {
    setOrder((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    if (language === "en") {
      document.querySelector("html")?.setAttribute("lang", "en");
      document.querySelector("html")?.setAttribute("dir", "ltr");
      inputs.forEach((input) => {
        input.setAttribute("dir", "ltr");
      });
    } else if (language === "ar") {
      document.querySelector("html")?.setAttribute("lang", "ar");
      document.querySelector("html")?.setAttribute("dir", "rtl");
      inputs.forEach((input) => {
        input.setAttribute("dir", "rtl");
      });
    }
    i18n.changeLanguage(language);
  }, [language]);

  const onSubmit = () => {
    if (isTermsChecked) {
      if (
        personalInfo.isPersonalInfoValid &&
        paymentMethod.isPaymentMethodValid
      )
        alert("Order Submitted");
      else setError(true);
    } else setIsErrorTerm(true);
  };

  useEffect(() => {
    setIsErrorTerm(false);
  }, [isTermsChecked]);
  return (
    <main>
      <header className="py-6 shadow-md border-b border-gray-100 ">
        <div className="flex container gap-2 items-center w-full justify-end">
          <span className="font-bold text-xs"> {t("allAdvantages")} </span>
          <ReactFlagsSelect
            selected={selected}
            onSelect={(code) => {
              setSelected(code);
              setLanguage(code === "GB" ? "en" : "ar");
            }}
            countries={["GB", "EG"]}
            customLabels={{ GB: "en", EG: "ar" }}
            placeholder="Select Language"
            selectButtonClassName="menu-flags-button"
            className="menu-flags"
            showOptionLabel={false}
          />
        </div>
      </header>
      <section className="bg-[#F9FCFF] min-h-screen flex justify-center py-10">
        <div className="container">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:w-3/4 w-full mx-auto card-shadow rounded-md overflow-hidden">
            <div className="bg-white flex flex-col items-center pt-12 px-10  pb-5">
              <div className="mb-10 text-center">
                <h4 className="sm:text-lg text-[15px] font-bold">
                  {t("heading")}
                </h4>
                <p className="font-semibold text-xs sm:text-sm  text-gray-600">
                  {t("subheading")}
                </p>
              </div>
              <PersonalInfo onFormDataChange={handlePersonalDataChange} />
              <PaymentMethods
                onPaymentMethodChange={handlePaymentMethodDataChange}
              />
            </div>
            <div className="bg-[#F5F7F9] flex flex-col pt-12 px-8  pb-5">
              <h5 className="font-bold  text-base text-gray-600 mb-5">
                {t("orderOverview")}
              </h5>
              <OrderOverview
                sessions={Number(personalInfo.sessions)}
                onCoastsChange={handleOrderDataChange}
              />
              <div className="flex gap-2 relative">
                <input
                  className="absolute top-10 sm:top-4"
                  type="checkbox"
                  id="terms"
                  checked={isTermsChecked}
                  onChange={() => setIsTermsChecked(!isTermsChecked)}
                  name="terms"
                />
                <label
                  className="mt-5 sm:mt-2 ms-5 text-gray-400 text-sm sm:text-base"
                  htmlFor="terms"
                >
                  {t("terms")}
                  <a className="text-blue-500 capitalize" href="#">
                    {t("terms1")}
                  </a>
                  {t("terms2")}
                  <a className="text-blue-500" href="#">
                    {t("terms3")}
                  </a>
                  {t("terms4")}
                </label>
              </div>
              <a
                onClick={onSubmit}
                className="w-full text-center cursor-pointer mt-5 mb-8 p-4 gradient text-lg capitalize font-semibold rounded-md border border-gray-500 focus::ring focus-visible::ring"
              >
                {t("orderNow")}
              </a>
              {isErrorTerm && (
                <span className="warning text-base font-semibold text-center mb-2">
                  {t("termError")}
                </span>
              )}
              {error && (
                <span className="warning text-base font-semibold text-center mb-2">
                  {t("fildsError")}
                </span>
              )}
              <h4 className="mt-auto text-center font-bold text-lg text-gray-400">
                {t("satisfactionRate")}
              </h4>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
