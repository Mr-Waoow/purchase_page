import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Switch from "@mui/joy/Switch";

const OrderOverview = ({
  onCoastsChange,
  sessions,
}: {
  onCoastsChange: any;
  sessions: number;
}) => {
  const { t } = useTranslation();
  const radioButton = [];
  const [discount, setDiscount] = useState<number>(4);
  const [regularPrice, setRegularPrice] = useState<number>(29.6);
  const [price, setPrice] = useState<number>(0);
  const [totalCoast, setTotalCoast] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [inAdvance, setInAdvance] = useState<boolean>(false);
  const calcCoast = (
    evt: React.ChangeEvent<HTMLInputElement>,
    discount: number
  ) => {
    const months = Number(evt.currentTarget.value); // Convert 'months' to a number
    setPrice(regularPrice - regularPrice * (discount / 100));
    setTotalCoast(months * price * sessions);
    setDiscountPrice(months * (regularPrice - price));
  };
  for (let i = 6; i < 36; ) {
    if (i < 12) i += 6;
    else i += 3;
    radioButton.push(
      <div className="radio-group">
        <input
          onChange={(evt) => calcCoast(evt, discount)}
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
      discount,
      regularPrice,
      price,
      discountPrice,
      totalCoast,
      inAdvance,
    });
  };
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
            setInAdvance(!inAdvance);
            setDiscount(inAdvance ? 9 : 4);
          }}
        />
        <label
          className="font-normal text-xs sm:text-sm sm:font-semibold text-gray-700"
          htmlFor="toggle"
        >
          {t("PayInAdvance")}
          <span className="font-bold uppercase">{t("PayInAdvance1")}</span>
        </label>
      </div>
      <div className="cash">
        <span>{t("numberOfSessionsPM")}</span>
        <span>{sessions}</span>
        <span>{t("regularPrice")}</span>
        <span className="line-through">
          {regularPrice.toFixed(2)}
          <span>&euro;</span>
        </span>
        <span>{t("yourPrice")}</span>
        <span>
          {price.toFixed(2)}
          <span>&euro;</span>
        </span>
        <span className="discount">
          {t("discount")}
          {discount.toFixed(2)}%
        </span>
        <span className="discount">
          -{discountPrice.toFixed(2)}
          <span>&euro;</span>
        </span>
        <hr className="border-2 border-white rounded-md" />
        <hr className="border-2 border-white rounded-md" />
        <span className="fee">{t("fee")}</span>
        <span className="total">
          0.00 <span>&euro;</span>
        </span>
        <span>
          {t("total")}
          p.m.
        </span>
        <span className="total">
          {totalCoast.toFixed(2)} <span>&euro;</span>
        </span>
      </div>
    </>
  );
};

export default OrderOverview;
