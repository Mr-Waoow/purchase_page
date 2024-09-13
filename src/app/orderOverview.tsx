import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Switch from "@mui/joy/Switch";

const OrderOverview = ({ onCoastsChange, sessions }: OrderOverviewProps) => {
  const { t } = useTranslation();
  const radioButton = [];
  const [inIntiate, setInIntiate] = useState<boolean>(true);
  const [inAdvance, setInAdvance] = useState<boolean>(false);
  const [months, setMonths] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(inAdvance ? 9 : 4);
  const [regularPrice, setRegularPrice] = useState<number>(sessions * 3.7);
  const [price, setPrice] = useState<number>(regularPrice - regularPrice * (discount / 100));
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [totalCoast, setTotalCoast] = useState<number>(0);
  const calcCoast = () => {
    handleChange();
    setRegularPrice(sessions * 3.7);
    setPrice(regularPrice - regularPrice * (discount / 100));
    setTotalCoast(months * price);
    setDiscountPrice(months * (regularPrice - price));
    handleChange();
  };
  for (let i = 3; i < 36; ) {
    if (i > 10 && i < 20) i += 6;
    else if (i > 20) i += 12;
    else i += 3;
    radioButton.push(
      <div className="radio-group">
        <input
          onClick={(evt) => {
            setInIntiate(false);
            setMonths(Number(evt.currentTarget.value));
            calcCoast();
            handleChange();
          }}
          type="radio"
          name="month"
          value={i}
          id={"month" + i}
        />
        <label htmlFor={"month" + i}>{i + " " + t("month")}</label>
      </div>
    );
  }

  const handleChange = () => {
    onCoastsChange({
      discount: discount,
      regularPrice: regularPrice,
      price: price,
      discountPrice: discountPrice,
      totalCoast: totalCoast,
      inAdvance: inAdvance,
    });
  };
  useMemo(() => {
    calcCoast();
    handleChange();
  }, [sessions, months]);
  useEffect(() => {
    inIntiate && document.getElementById("month6")?.click();
    handleChange();
  }, [discount, regularPrice, price, totalCoast, discountPrice, inAdvance]);
  return (
    <>
      <div className="form-group radio">{radioButton}</div>
      <div className="flex gap-2 items-start sm:items-center">
        <Switch
          color="primary"
          size="sm"
          variant="outlined"
          checked={inAdvance}
          onChange={() => {
            setDiscount(inAdvance ? 4 : 9);
            setInAdvance(!inAdvance);
            handleChange();
          }}
        />
        <label
          className="font-normal text-xs sm:text-sm sm:font-semibold text-gray-700"
          htmlFor="toggle"
        >
          {t("payInAdvance")}
          <span className="font-bold uppercase">{t("payInAdvance1")}</span>
        </label>
      </div>
      <div className="cash">
        <span>{t("numberOfSessionsPM")}</span>
        <span>{sessions}</span>
        <span>{t("regularPrice")}</span>
        <span className="line-through">
          {regularPrice.toFixed(2) + " "}
          <span>&euro;</span>
        </span>
        <span>{t("yourPrice")}</span>
        <span>
          {price.toFixed(2) + " "}
          <span>&euro;</span>
        </span>
        <span className="discount">
          {t("discount") + " "}
          {discount.toFixed(2) + " "}%
        </span>
        <span className="discount">
          -{discountPrice.toFixed(2) + " "}
          <span>&euro;</span>
        </span>
        <hr className="border-2 border-white rounded-md" />
        <hr className="border-2 border-white rounded-md" />
        <span className="fee">{t("fee")}</span>
        <span className="total">
          0.00 <span>&euro;</span>
        </span>
        <span>
          {t("total") + " "}
          p.m.
        </span>
        <span className="total">
          {totalCoast.toFixed(2) + " "} <span>&euro;</span>
        </span>
      </div>
    </>
  );
};

export default OrderOverview;
