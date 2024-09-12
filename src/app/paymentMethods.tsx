import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PatternFormat } from "react-number-format";
import { useTranslation } from "react-i18next";

const PaymentMethods = (
  { onPaymentMethodChange, direL }: PaymentMethodsProps
) => {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditCardHolder, setCreditCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [monthYear, setMonthYear] = useState("");
  const [cvv, setCvv] = useState("");
  const handleChange = () => {
    onPaymentMethodChange({
      paymentMethod: paymentMethod,
      creditCardHolder: creditCardHolder,
      cardNumber: cardNumber,
      monthYear: monthYear,
      cvv: cvv,
    });
  };
  useEffect(() => {
    handleChange();
  }, [onPaymentMethodChange]);
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
                checked={paymentMethod === "sepa"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
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
                checked={paymentMethod === "credit card"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
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
                handleChange();
              }}
            />
            <div className="mt-2 flex flex-wrap sm:flex-nowrap relative">
              <Image
                className={
                  `absolute top-2 sm:top-[19px] ${direL}-2 sm:${direL}-[9px]`
                }
                src={require("../images/credit_icon.png")}
                width={20}
                height={20}
                alt="credit_icon"
              />
              <PatternFormat
                className="w-full sm:w-[65%] mb-2 sm:mb-0 credit"
                format="####-####-####-####"
                value={cardNumber}
                onValueChange={(values) => {
                  setCardNumber(values.value);
                }}
                valueIsNumericString={true}
                placeholder={t("cardNumber")}
              />
              <PatternFormat
                className="w-3/5 sm:w-[20%]"
                format="##/##"
                value={monthYear}
                onValueChange={(values) => {
                  setMonthYear(values.value);
                }}
                valueIsNumericString={true}
                placeholder={t("monthYear")}
              />
              <PatternFormat
                className="w-2/5 sm:w-[15%]"
                format="###"
                value={cvv}
                onValueChange={(values) => {
                  setCvv(values.value);
                }}
                valueIsNumericString={true}
                placeholder="CVV"
              />
            </div>
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
