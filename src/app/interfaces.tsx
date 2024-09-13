interface PersonalInfoProps {
  onFormDataChange: (newData: Partial<PersonalData>) => void;
}
interface OrderOverviewProps {
  onCoastsChange: (newData: Partial<OrderData>) => void;
  sessions: number;
}

interface PaymentMethodsProps {
  onPaymentMethodChange: (newData: Partial<PaymentData>) => void;
}

interface PersonalData {
  loginPhoneNumber: string;
  contactPhoneNumber: string;
  contactName: string;
  contactEmail: string;
  billingAddress: string;
  number: string;
  billingZip: string;
  billingCity: string;
  country: string;
  sessions: string;
  isPersonalInfoValid: boolean;
}

interface PaymentData {
  paymentMethod: string;
  creditCardHolder: string;
  cardNumber: string;
  monthYear: string;
  cvv: string;
  isPaymentMethodValid: boolean;
}

interface OrderData {
  discount: number;
  regularPrice: number;
  price: number;
  discountPrice: number;
  totalCoast: number;
  inAdvance: boolean;
  isOrderValid: boolean;
}
