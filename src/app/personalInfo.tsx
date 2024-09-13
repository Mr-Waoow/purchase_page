import React, { use, useEffect, useMemo, useState } from "react";
import "react-international-phone/style.css";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";

const PersonalInfo = ({ onFormDataChange }: PersonalInfoProps) => {
  // Get the translation function
  const { t } = useTranslation();
  const options = [];
  const [inIntiate, setInIntiate] = useState<boolean>(true);
  const [isInfoValid, setIsInfoValid] = useState<boolean>(false);
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

  // Create the options for the select element
  for (let i = 1; i < 7; i++) {
    options.push(
      <option key={i} value={i * 8}>
        {i * 8 + " " + t("sessions")}
      </option>
    );
  }

  // Create the state for the errors
  const [errors, setErrors] = useState({
    loginPhoneNumber: "",
    contactPhoneNumber: "",
    contactName: "",
    contactEmail: "",
    billingAddress: "",
    number: "",
    billingZip: "",
    billingCity: "",
    country: "",
  });

  const validateLoginPhoneNumber = (phone: string) => {
    const regex = /^\+(\d{1,3})\d{10,12}$/;
    return regex.test(phone) ? "" : t("invalid") + " " + t("loginPhoneNumber");
  };

  const validateContactPhoneNumber = (phone: string) => {
    const regex = /^\+(\d{1,3})\d{10,12}$/;
    return regex.test(phone)
      ? ""
      : t("invalid") + " " + t("contactPhoneNumber");
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
      ? ""
      : t("invalid") + " " + t("contactEmailAddress");
  };

  const validateName = (name: string) => {
    const regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(name) ? "" : t("invalid") + " " + t("contactName");
  };

  const validateAddress = (address: string) => {
    const regex = /^[a-zA-Z0-9 ]{2,30}$/;
    return regex.test(address) ? "" : t("invalid") + " " + t("address");
  };

  const validateNumber = (number: string) => {
    const regex = /^[0-9]{0,3}$/;
    return regex.test(number) ? "" : t("invalid") + " " + t("nr");
  };

  const validateZip = (zip: string) => {
    const regex = /^[0-9]{5}$/;
    return regex.test(zip) ? "" : t("invalid") + " " + t("postalCode");
  };

  const validateCity = (city: string) => {
    const regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(city) ? "" : t("invalid") + " " + t("city");
  };

  const validateCountry = (country: string) => {
    return country !== "" ? "" : t("invalid") + " " + t("country");
  };

  // Function to validate the form data
  const handleInputErrors = (name: string, value: string) => {
    let newErrors = { ...errors };
    switch (name) {
      case "loginPhoneNumber":
        newErrors.loginPhoneNumber = validateLoginPhoneNumber(value);
        break;
      case "contactPhoneNumber":
        newErrors.contactPhoneNumber = validateContactPhoneNumber(value);
        break;
      case "contactName":
        newErrors.contactName = validateName(value);
        break;
      case "contactEmail":
        newErrors.contactEmail = validateEmail(value);
        break;
      case "billingAddress":
        newErrors.billingAddress = validateAddress(value);
        break;
      case "number":
        newErrors.number = validateNumber(value);
        break;
      case "billingZip":
        newErrors.billingZip = validateZip(value);
        break;
      case "billingCity":
        newErrors.billingCity = validateCity(value);
        break;
      case "country":
        newErrors.country = validateCountry(value);
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  // Function to handle the change of the form data
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
      isPersonalInfoValid: isInfoValid,
    });
  };

  //Cheak is info valid

  useMemo(() => {
    setIsInfoValid(
      !errors.loginPhoneNumber &&
        !errors.contactPhoneNumber &&
        !errors.contactName &&
        !errors.contactEmail &&
        !errors.billingAddress &&
        !errors.number &&
        !errors.billingZip &&
        !errors.billingCity &&
        !errors.country
    );
  }, [errors]);

  // Call the handleChange function when the form data changes
  useEffect(() => {
    inIntiate && setErrors({
      loginPhoneNumber: "",
      contactPhoneNumber: "",
      contactName: "",
      contactEmail: "",
      billingAddress: "",
      number: "",
      billingZip: "",
      billingCity: "",
      country: "",
    });
    setInIntiate(false);
    handleChange();
  }, [
    loginPhoneNumber,
    contactPhoneNumber,
    contactName,
    contactEmail,
    billingAddress,
    number,
    billingZip,
    billingCity,
    country,
    sessions,
    isInfoValid,
  ]);

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
          defaultMask="... ... ...."
          value={loginPhoneNumber}
          onChange={(loginPhone) => {
            setLoginPhoneNumber(loginPhone);
            handleInputErrors("loginPhoneNumber", loginPhone);
            handleChange();
          }}
        />
        {errors.loginPhoneNumber && (
          <span className="warning">{errors.loginPhoneNumber}</span>
        )}
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
          defaultMask="... ... ...."
          value={contactPhoneNumber}
          onChange={(contactPhone) => {
            setContactPhoneNumber(contactPhone);
            handleInputErrors("contactPhoneNumber", contactPhone);
            handleChange();
          }}
        />
        {errors.contactPhoneNumber && (
          <span className="warning">{errors.contactPhoneNumber}</span>
        )}
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
            handleInputErrors("contactEmail", e.target.value);
            handleChange();
          }}
        />
        {errors.contactEmail && (
          <span className="warning">{errors.contactEmail}</span>
        )}
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
            handleInputErrors("contactName", e.target.value);
            handleChange();
          }}
        />
        {errors.contactName && (
          <span className="warning">{errors.contactName}</span>
        )}
      </div>
      <div className="form-group">
        <label>{t("billingAddress")}</label>
        <div className="flex gap-3 mb-6">
          <div className="w-9/12 flex flex-col">
            <input
              className="w-full max-h-12"
              type="text"
              id="billingAddress"
              name="billingAddress"
              value={billingAddress}
              onChange={(e) => {
                setBillingAddress(e.target.value);
                handleInputErrors("billingAddress", e.target.value);
                handleChange();
              }}
              placeholder={t("address")}
            />
            {errors.billingAddress && (
              <span className="warning">{errors.billingAddress}</span>
            )}
          </div>
          <div className="w-3/12 flex flex-col">
            <input
              className="w-full max-h-12"
              type="text"
              id="Number"
              name="number"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
                handleInputErrors("number", e.target.value);
                handleChange();
              }}
              placeholder={t("nr")}
            />
            {errors.number && <span className="warning">{errors.number}</span>}
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-3 mb-6">
          <div className="w-[40%] sm:w-4/12 flex flex-col">
            <input
              className="w-full max-h-12"
              type="text"
              id="billingZip"
              name="billingZip"
              value={billingZip}
              onChange={(e) => {
                setBillingZip(e.target.value);
                handleInputErrors("billingZip", e.target.value);
                handleChange();
              }}
              placeholder={t("postalCode")}
            />
            {errors.billingZip && (
              <span className="warning">{errors.billingZip}</span>
            )}
          </div>
          <div className="w-[40%] sm:w-4/12 flex flex-col">
            <input
              className="w-full max-h-12"
              type="text"
              id="billingCity"
              name="billingCity"
              value={billingCity}
              onChange={(e) => {
                setBillingCity(e.target.value);
                handleInputErrors("billingCity", e.target.value);
                handleChange();
              }}
              placeholder={t("city")}
            />
            {errors.billingCity && (
              <span className="warning">{errors.billingCity}</span>
            )}
          </div>
          <div className="w-full sm:w-4/12 flex flex-col">
            <ReactFlagsSelect
              selected={country}
              onSelect={(code) => {
                setCountry(code);
                handleInputErrors("country", code);
                handleChange();
              }}
              className="menu-country w-full max-h-12"
              selectButtonClassName="menu-country-button"
              placeholder={t("country")}
            />
            {errors.country && (
              <span className="warning">{errors.country}</span>
            )}
          </div>
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
            handleInputErrors("sessions", e.target.value);
            handleChange();
          }}
        >
          {options}
        </select>
        {errors.sessions && <span className="warning">{errors.sessions}</span>}
      </div>
    </div>
  );
};

export default PersonalInfo;
