import React, { use, useEffect } from "react";
import "react-international-phone/style.css";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";

const PersonalInfo = ({ onFormDataChange }:PersonalInfoProps) => {
  const { t } = useTranslation();
  const [loginPhoneNumber, setLoginPhoneNumber] = React.useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = React.useState("");
  const [contactName, setContactName] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [billingAddress, setBillingAddress] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [billingZip, setBillingZip] = React.useState("");
  const [billingCity, setBillingCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [sessions, setSessions] = React.useState("8");

  const handleChange = () => {
    onFormDataChange({
      loginPhoneNumber: loginPhoneNumber,
      contactPhoneNumber: contactPhoneNumber,
      contactName: contactName,
      contactEmail: contactEmail,
      billingAddress: billingAddress,
      number: number,
      billingZip: billingZip,
      billingCity: billingCity,
      country: country,
      sessions: sessions,
    });
  };

  useEffect(() => {
    handleChange();
  }, [
    onFormDataChange
  ]);

  const options = [];

  for (let i = 1; i < 7; i++) {
    options.push(
      <option key={i} value={i * 8}>
        {i * 8 + " " + t("sessions")}
      </option>
    );
  }

  return (
    <div>
      <div className="form-group">
        <label className="">
          {t("loginPhoneNumber")}
          <span>
            {t("preferably")}
            <span className="underline">{t("theStudent")}</span>
          </span>
        </label>
        <PhoneInput
          defaultCountry="gr"
          value={loginPhoneNumber}
          onChange={(phone) => {
            setLoginPhoneNumber(phone);
            handleChange();
          }}
        />
      </div>
      <div className="form-group">
        <label>
          {t("contactPhoneNumber")}
          <span>
            {t("preferably")}
            <span className="underline">{t("theParent")}</span>
          </span>
        </label>
        <PhoneInput
          defaultCountry="gr"
          value={contactPhoneNumber}
          onChange={(phone1) => {
            setContactPhoneNumber(phone1);
            handleChange();
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">
          {t("contactEmailAddress")}
          <span>
            {t("preferably")}
            <span className="underline">{t("theParent")}</span>
          </span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={contactEmail}
          onChange={(e) => {
            setContactEmail(e.target.value);
            handleChange();
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">{t("contactName")}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={contactName}
          onChange={(e) => {
            setContactName(e.target.value);
            handleChange();
          }}
        />
      </div>
      <div className="form-group">
        <label>{t("billingAddress")}</label>
        <div className="flex gap-3 mb-6">
          <input
            className="w-9/12"
            type="text"
            id="billingAddress"
            name="billingAddress"
            value={billingAddress}
            onChange={(e) => {
              setBillingAddress(e.target.value);
              handleChange();
            }}
            placeholder={t("address")}
          />
          <input
            className="w-3/12"
            type="text"
            id="Number"
            name="number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              handleChange();
            }}
            placeholder={t("nr")}
          />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-3 mb-6">
          <input
            className=" w-[40%] sm:w-4/12"
            type="text"
            id="billingZip"
            name="billingZip"
            value={billingZip}
            onChange={(e) => {
              setBillingZip(e.target.value);
              handleChange();
            }}
            placeholder={t("postalCode")}
          />
          <input
            className="w-[40%] sm:w-4/12"
            type="text"
            id="billingCity"
            name="billingCity"
            value={billingCity}
            onChange={(e) => {
              setBillingCity(e.target.value);
              handleChange();
            }}
            placeholder={t("city")}
          />
          <ReactFlagsSelect
            selected={country}
            onSelect={(code) => {
              setCountry(code);
              handleChange();
            }}
            className="menu-country w-full sm:w-4/12"
            selectButtonClassName="menu-country-button"
            placeholder={t("country")}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="sessions">{t("monthlySessions")}</label>
        <select
          name="sessions"
          id="sessions"
          value={sessions}
          onChange={(e) => {
            setSessions(e.target.value);
            handleChange();
          }}
        >
          {options}
        </select>
      </div>
    </div>
  );
};

export default PersonalInfo;
