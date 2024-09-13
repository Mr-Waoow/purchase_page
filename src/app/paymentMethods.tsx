import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PatternFormat } from "react-number-format";
import { useTranslation } from "react-i18next";

const PaymentMethods = ({
  onPaymentMethodChange,
}: PaymentMethodsProps) => {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentMethodValid, setIsPaymentMethodValid] = useState(false);
  const [creditCardHolder, setCreditCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [monthYear, setMonthYear] = useState("");
  const [cvv, setCvv] = useState("");

  // Create the state for the errors
  const [errors, setErrors] = useState({
    creditCardHolder: "",
    cardNumber: "",
    monthYear: "",
    cvv: "",
  });

  const validateCardHolder = (cardHolder: string) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(cardHolder) ? "" : t("invalid") + " " + t("cardHolder");
  };

  const validateCardNumber = (cardNumber: string) => {
    const regex = /^[0-9]{16}$/;
    return regex.test(cardNumber) ? "" : t("invalid") + " " + t("cardNumber");
  };

  const validateMonthYear = (monthYear: string) => {
    const regex = /^[0-9]{4}$/;
    return regex.test(monthYear) ? "" : t("invalid") + " " + t("monthYear");
  };

  const validateCvv = (cvv: string) => {
    const regex = /^[0-9]{3}$/;
    return regex.test(cvv) ? "" : t("invalid") + " CVV";
  };

  // Function to validate the form data
  const handleInputErrors = (name: string, value: string) => {
    let newErrors = { ...errors };
    switch (name) {
      case "creditCardHolder":
        newErrors.creditCardHolder = validateCardHolder(value);
        break;
      case "cardNumber":
        newErrors.cardNumber = validateCardNumber(value);
        break;
      case "monthYear":
        newErrors.monthYear = validateMonthYear(value);
        break;
      case "cvv":
        newErrors.cvv = validateCvv(value);
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  // Create the handleChange function
  const handleChange = () => {
    onPaymentMethodChange({
      creditCardHolder: creditCardHolder,
      cardNumber: cardNumber,
      monthYear: monthYear,
      cvv: cvv,
      isPaymentMethodValid: isPaymentMethodValid,
    });
  };

  //Cheak isPaymentMethodValid
  useEffect(() => {
    setIsPaymentMethodValid(
        !errors.creditCardHolder &&
        !errors.cardNumber &&
        !errors.monthYear &&
        !errors.cvv
    );
  }, [errors]);

  // Create the useEffect hook
  useEffect(() => {
    document.getElementById("creditCard")?.click();
    handleChange();
  }, [creditCardHolder, cardNumber, monthYear, cvv,isPaymentMethodValid]);
  return (
    <>
      <div className="form-group payment">
        <label>{t("selectPaymentMethod")}</label>
        <div className="flex flex-col border border-gray-100 pt-3 pb-8">
          <div className="flex flex-col border-b ps-3 pe-4 pt-3 pb-1">
            <div className="flex gap-2">
              <input
                type="radio"
                name="paymentMethod"
                id="sepa"
                value="sepa"
                onClick={(e) => {
                  setPaymentMethod((e.target as HTMLInputElement).value);
                  handleChange();
                }}
              />
              <label className="flex items-center" htmlFor="sepa">
                <Image
                  src={require("../images/sepa.png")}
                  width={50}
                  height={50}
                  alt="sepa"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4 ps-3 pe-4 pt-3">
            <div className="flex gap-2">
              <input
                type="radio"
                name="paymentMethod"
                id="creditCard"
                value="credit card"
                onClick={(e) => {
                  setPaymentMethod((e.target as HTMLInputElement).value);
                  handleChange();
                }}
              />
              <label className="flex items-center gap-1" htmlFor="creditCard">
                <Image
                  src={require("../images/Visa.png")}
                  width={20}
                  height={20}
                  alt="Visa"
                />
                <Image
                  src={require("../images/maestro.png")}
                  width={20}
                  height={20}
                  alt="maestro"
                />
                <Image
                  src={require("../images/mastercard.png")}
                  width={20}
                  height={20}
                  alt="mastercard"
                />
                <Image
                  src={require("../images/american_express.png")}
                  width={20}
                  height={20}
                  alt="american_express"
                />
              </label>
            </div>
            <input
              type="text"
              id="creditCardHolder"
              name="creditCardHolder"
              placeholder={t("cardHolder")}
              value={creditCardHolder}
              onChange={(e) => {
                setCreditCardHolder(e.target.value);
                handleInputErrors("creditCardHolder", e.target.value);
                handleChange();
              }}
            />
            {errors.creditCardHolder && (
              <span className="warning">{errors.creditCardHolder}</span>
            )}
            <div className="mt-2 flex flex-wrap sm:flex-nowrap relative">
              <Image
                className={"absolute top-2 sm:top-[19px] ms-2 sm:ms-[9px]"}
                src={require("../images/credit_icon.png")}
                width={20}
                height={20}
                alt="credit_icon"
              />
              <div className="flex flex-col w-full sm:w-[65%] mb-2 sm:mb-0">
                <PatternFormat
                  className="w-full max-h-12 credit"
                  format="####-####-####-####"
                  value={cardNumber}
                  onValueChange={(values) => {
                    setCardNumber(values.value);
                    handleInputErrors("cardNumber", values.value);
                  }}
                  valueIsNumericString={true}
                  placeholder={t("cardNumber")}
                />
              </div>
              <div className="flex flex-col w-3/5 sm:w-[20%]">
                <PatternFormat
                  className="w-full max-h-12"
                  format="##/##"
                  value={monthYear}
                  onValueChange={(values) => {
                    setMonthYear(values.value);
                    handleInputErrors("monthYear", values.value);
                  }}
                  valueIsNumericString={true}
                  placeholder={t("monthYear")}
                />
              </div>
              <div className="flex flex-col w-2/5 sm:w-[15%]">
                <PatternFormat
                  className="w-full max-h-12"
                  format="###"
                  value={cvv}
                  onValueChange={(values) => {
                    setCvv(values.value);
                    handleInputErrors("cvv", values.value);
                  }}
                  valueIsNumericString={true}
                  placeholder="CVV"
                />
              </div>
            </div>
            {errors.cardNumber && (
              <span className="warning">{errors.cardNumber}</span>
            )}
            {errors.monthYear && (
              <span className="warning">{errors.monthYear}</span>
            )}
            {errors.cvv && <span className="warning">{errors.cvv}</span>}
          </div>
        </div>
      </div>
      <span className="me-auto text-xs text-gray-400 italic">
        {t("securePayment")}
      </span>
    </>
  );
};

export default PaymentMethods;
