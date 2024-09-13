import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    supportedLngs: ["en", "ar"],
    resources: {
      en: {
        translation: {
          allAdvantages: "All advantages",
          heading: "Registration & Booking at GoStudent",
          subheading: "the lending platform for online tutoring",
          loginPhoneNumber: "login phone number ",
          preferably: "(preferably ",
          theStudent: "the student's)",
          contactPhoneNumber: "contact phone number ",
          theParent: "the parent's)",
          contactEmailAddress: "contact email address ",
          contactName: "contact name",
          billingAddress: "billing address",
          address: "Address",
          nr: "Nr",
          postalCode: "Postal Code",
          city: "City",
          country: "Country",
          monthlySessions: "monthly sessions",
          sessions: "sessions",
          selectPaymentMethod: "select payment method",
          securePayment: "100% secure payment. All data is encrypted.",
          orderOverview: "order overview",
          order: "order",
          month: "month",
          payInAdvance: "Pay in advance - ",
          payInAdvance1: "extra 5% discount",
          cardHolder: "Card holder",
          cardNumber: "Card number",
          monthYear: "MM/YY",
          numberOfSessionsPM: "number of sessions p.m.",
          regularPrice: "regular price for month",
          yourPrice: "your price for month",
          discount: "discount ",
          fee: "Setup fee",
          total: "total",
          orderNow: "order now",
          satisfactionRate: "95% satisfaction rate!",
          terms: "I accept the ",
          terms1: "terms and conditions ",
          terms2: "and understand my ",
          terms3: "right of withdrawal ",
          terms4:
            "as well as the circumstances that lead to a repeal of the same.",
          invalid: "Invalid",
          selectMonthPackage: "Please select a month package",
          termError: "Terms and conditions must be accepted",
          fildsError: "All fields must be filled",
        },
      },
      ar: {
        translation: {
          allAdvantages: "جميع المزايا",
          heading: "التسجيل والحجز في GoStudent",
          subheading: "منصة الإقراض للدروس الخصوصية عبر الإنترنت",
          loginPhoneNumber: "رقم الهاتف لتسجيل الدخول",
          preferably: "(يفضل ",
          theStudent: "الطالب)",
          contactPhoneNumber: "رقم هاتف الاتصال",
          theParent: "الوالد)",
          contactEmailAddress: "عنوان البريد الإلكتروني للاتصال",
          contactName: "اسم الشخص المسؤول",
          billingAddress: "عنوان الفوترة",
          address: "العنوان",
          nr: "رقم",
          postalCode: "الرمز البريدي",
          city: "المدينة",
          country: "الدولة",
          monthlySessions: "الجلسات الشهرية",
          sessions: "الجلسات",
          selectPaymentMethod: "اختر طريقة الدفع",
          securePayment: "الدفع الآمن 100%. تم تشفير جميع البيانات.",
          orderOverview: "نظرة عامة على الطلب",
          order: "الطلب",
          month: "شهر",
          payInAdvance: "الدفع مقدمًا - ",
          payInAdvance1: "خصم إضافي 5%",
          cardHolder: "حامل البطاقة",
          cardNumber: "رقم البطاقة",
          monthYear: "شهر/سنة",
          numberOfSessionsPM: "عدد الجلسات شهريًا",
          regularPrice: "السعر العادي للشهر",
          yourPrice: "سعرك للشهر",
          discount: "خصم",
          fee: "رسوم الإعداد",
          total: "مجموع",
          orderNow: "اطلب الآن",
          satisfactionRate: "معدل الرضا 95%!",
          terms: "أقبل ",
          terms1: "الشروط والأحكام ",
          terms2: "وأفهم ",
          terms3: "حق الانسحاب ",
          terms4: "وكذلك الظروف التي تؤدي إلى إلغاء نفسها.",
          invalid: "غير صالح",
          selectMonthPackage: "يرجى تحديد حزمة شهرية",
          termError: "يجب الموافقة على الشروط والأحكام",
          fildsError: "يجب ملء جميع البيانات",
        },
      },
    },
    detection: {
      order: ["htmlTag", "cookie", "localStorage", "path", "subdomain"],
    },
    fallbackLng: "en",
  });

export default i18n;
