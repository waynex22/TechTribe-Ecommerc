import React, { useEffect, useState } from "react";
interface CardData {
    cardNumber?: string;
    cardHolderName?: string;
    cvv?: number;
    expiryDate?: string;
  }
  
  interface CardFormProps {
    setDataCard: React.Dispatch<React.SetStateAction<CardData>>;
  }
  
const CreditCard: React.FC<CardFormProps> = ({ setDataCard }) => {
  const [creditCardDetails, setCreditCardDetails] = useState(defaultData);
  const [error, setError] = useState({
    number: false,
    expiryDate: false,
    cvv: false,
  });
  useEffect(() => {
    setDataCard({
      cardNumber: creditCardDetails.number,
      cardHolderName: creditCardDetails.ownerName,
      expiryDate: creditCardDetails.expiryDate,
      cvv: Number(creditCardDetails.cvv),
    });
  }, [creditCardDetails]);
  
  let currentYear = new Date().getFullYear().toString();
  var currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
  return (
    <div className="flex flex-col justify-center items-center bg-transparent w-full min-h-[400px] bg-white rounded-md mt-2 backdrop-blur-sm">
      <div className="flex flex-col justify-center items-center  py-8">
        <div className="flex md:flex-row flex-col items-center justify-center md:gap-20 gap-12">
          <div className="flex flex-col px-2">
            {(error.expiryDate || error.number) && (
              <div className="text-xs text-red-600 h-9">
                {error.expiryDate
                  ? "Bạn cần nhập đúng ngày hết hạn thẻ"
                  : "Bạn cần nhập đúng số thẻ"}
              </div>
            )}
            <div className="relative lg:w-80 w-72 shadow-xl transition duration-400 sm:hover:scale-110 hover:scale-105 rounded-lg">
              <img
                src="https://www.tailwindtap.com/assets/components/credit-card/smart-visa-card/green-mountain.jpg"
                className="w-full h-48 rounded-lg"
                alt="background river image for visa card"
              />
              <div className="absolute top-0 px-6 w-full py-4 flex flex-col justify-between h-48">
                <div className="flex justify-between leading-3 items-center ">
                  <span className="text-sm font-medium">Techtribe Express</span>
                  <Visa />
                </div>
                <div className="flex">
                  <span className="flex items-center text-base top-3">
                    <LeftCaret />
                    <input
                      className="bg-transparent focus:outline-none border border-transparent focus:border-black rounded-md px-1 w-5/6"
                      type="text"
                      value={cc_format(creditCardDetails?.number)}
                      onChange={(e) => {
                        const { value } = e?.target;
                        let finalValue = value.replaceAll(" ", "");
                        finalValue.length < 16
                          ? setError({ ...error, number: true })
                          : setError({ ...error, number: false });
                        setCreditCardDetails({
                          ...creditCardDetails,
                          number: value,
                        });
                      }}
                    />
                  </span>
                </div>
                <div className="flex flex-row font-bold justify-between text-sm text-gradient-to-r from-black to-gray-200">
                  <span className="w-4/6">
                    <input
                      className="bg-transparent focus:outline-none border border-transparent focus:border-black rounded-md px-1"
                      type="text"
                      value={creditCardDetails?.ownerName}
                      maxLength={16}
                      onChange={(e) =>
                        setCreditCardDetails({
                          ...creditCardDetails,
                          ownerName: e?.target?.value,
                        })
                      }
                    />
                  </span>
                  <span>
                    <input
                      className="bg-transparent focus:outline-none border  border-transparent focus:border-black rounded-md px-1 w-12"
                      type="text"
                      value={cc_expires_format(creditCardDetails?.expiryDate)}
                      maxLength={5}
                      onChange={(e) => {
                        const { value } = e?.target;
                        value.match(/^(0[1-9]|1[0-2])\/(([0-9]{4}|[0-9]{2})$)/)
                          ? value.slice(-2) < currentYear.slice(-2)
                            ? setError({ ...error, expiryDate: true })
                            : value.slice(-2) === currentYear.slice(-2) &&
                              value.slice(0, 2) <= currentMonth
                            ? setError({ ...error, expiryDate: true })
                            : setError({ ...error, expiryDate: false })
                          : setError({ ...error, expiryDate: true });
                        setCreditCardDetails({
                          ...creditCardDetails,
                          expiryDate: value,
                        });
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full px-4">
            {error.cvv && (
              <span className="text-xs text-red-600 h-9">
                Bạn cần nhập đúng số CCV
              </span>
            )}
            <div className="flex flex-col justify-between bg-white h-48 lg:w-80 w-72 rounded-xl pt-5 pb-2 italic text-[4px] shadow-xl transition duration-400 sm:hover:scale-110 hover:scale-105 sample2">
              <div>
                <div className="bg-black h-8 w-full" />
                <div className="flex justify-between">
                  <div className="flex flex-col w-48 mt-2">
                    <div className="flex justify-between ml-1">
                      <span>Authorized Signature</span>
                      <span>Not valid unless signed</span>
                    </div>
                    <div className="bg-[#E5E5E5] h-8 w-48 text-right">
                      <span className="sm:text-sm text-xs">
                        <input
                          className="bg-transparent focus:outline-none focus:ring-transparent  focus:border   border-transparent rounded-md text-right italic w-12 pr-1"
                          type="text"
                          maxLength={3}
                          value={creditCardDetails?.cvv}
                          onChange={(e) => {
                            const { value } = e?.target;
                            value.length < 3
                              ? setError({ ...error, cvv: true })
                              : setError({ ...error, cvv: false });
                            setCreditCardDetails({
                              ...creditCardDetails,
                              cvv: e?.target?.value,
                            });
                          }}
                        />
                      </span>
                    </div>
                    <div className="text-left ml-1 mt-2">
                      <p>
                        Lorem Ipsum Indoctum accusamus comprehensam Nullam id
                        dolor id nibh ultricies vehicula ut id elit. Donec sed
                        odio dui. Fusce dapibus, tellus ac cursus etiam porta
                        sem malesuada magna mollis euismod. commodo, Faccibus
                        mollis interdum. Morbi leo risus, porta ac, vestibulum
                        at eros.Feugiat accumsan Suspendisse eget Duis faucibus
                        tempus pede pede augue pede. Dapibus mollis dignissim
                        suscipit porta justo nisl amet Nunc quis semper.
                        Indoctum accusamus comprehensam .
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    CIA 000012 CSM-1234--4321
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span>
                  +234089876543, +234803456789, +234089876543, +234089876543
                </span>
                <span> www.bankofruqmania.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditCard;
const defaultData = {
  number: "0000000000000000",
  ownerName: "YOUR HOLDER NAME",
  expiryDate: "06/29",
  cvv: "000",
};
export function cc_format(value: string) {
  var v = value
    .replace(/\s+/g, "")
    .replace(/[^0-9]/gi, "")
    .replace(/\D/g, "");
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];
  let len, i;
  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join("  ");
  } else {
    return v;
  }
}
export function cc_expires_format(string: string) {
  return string
    .replace(
      /[^0-9]/g,
      ""
    )
    .replace(
      /^([2-9])$/g,
      "0$1"
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      "0$1/$2"
    )
    .replace(
      /^0{1,}/g,
      "0" // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      "$1/$2" // To handle 113 > 11/3
    );
}
const Visa = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className="h-8 w-12"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m22.221 15.768l-.224-1.125h-2.514l-.4 1.117l-2.015.004c1.295-3.113 2.257-5.418 2.884-6.917c.164-.392.455-.592.884-.589c.328.003.863.003 1.606.001L24 15.765l-1.779.003Zm-2.172-2.666h1.62l-.605-2.82l-1.015 2.82ZM7.06 8.257l2.026.002l-3.132 7.51l-2.051-.002a951.26 951.26 0 0 1-1.528-5.956c-.1-.396-.298-.673-.679-.804A60.876 60.876 0 0 0 0 8.466v-.207h3.237c.56 0 .887.271.992.827c.106.557.372 1.976.8 4.254L7.06 8.257Zm4.81.002l-1.601 7.509l-1.929-.003l1.6-7.508l1.93.002Zm3.91-.139c.577 0 1.304.18 1.722.346l-.338 1.556c-.378-.152-1-.357-1.523-.35c-.76.013-1.23.332-1.23.638c0 .498.816.749 1.656 1.293c.958.62 1.085 1.177 1.073 1.783c-.013 1.255-1.073 2.494-3.309 2.494c-1.02-.015-1.388-.1-2.22-.396l.352-1.624c.847.354 1.206.467 1.93.467c.663 0 1.232-.268 1.237-.735c.004-.332-.2-.497-.944-.907c-.744-.411-1.788-.979-1.774-2.122c.017-1.462 1.402-2.443 3.368-2.443Z"
      />
    </svg>
  );
};
const LeftCaret = () => {
  return (
    <svg
      width="13"
      height="15"
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-xl mt-0.5 mr-1"
    >
      <path
        d="M12.5655 0.785121L12.701 14.4904L0.764073 7.75511L12.5655 0.785121Z"
        fill="#000000"
      />
    </svg>
  );
};
