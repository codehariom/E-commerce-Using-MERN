import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const faqData = [
  {
    question: "1. What is your return/exchange policy?",
    answer:
      "This addresses a common concern about the risk of buying online and lets customers know what to do if a product doesn't meet their needs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "This clarifies which payment options are available, making the checkout process smoother like UPI, Net-Banking and Cash on Delivery.",
  },
  {
    question: "3. How long will it take to receive my order?",
    answer:
      "This manages customer expectations regarding delivery times and helps them plan accordingly.",
  },
  {
    question: "4. What are your shipping costs?",
    answer:
      "This provides transparency about shipping fees, avoiding surprises at checkout.",
  },
  {
    question: "5. How do I track my order?",
    answer:
      "This allows customers to monitor the progress of their shipment and stay informed.",
  },
];

function Faq() {
  const [isOpen, setIsOpen] = useState([]);

  const toggleItem = (index) => {
    if (isOpen.includes(index)) {
      setIsOpen(isOpen.filter((i) => i !== index));
    } else {
      setIsOpen([...isOpen, index]);
    }
  };

  return (
    <div className="w-auto mx-auto p-6 bg-gray-100 mb-7">
      <h2 className=" text-black font-semibold text-2xl text-center  mb-7">
        Frequently asked questions (FAQs)
      </h2>
      <div className=" space-y-5">
        {faqData.map((item, index) => {
          const Open = isOpen.includes(index);
          return (
            <div
              key={index}
              className=" border border-gray-400 rounded-xl hover:bg-gray-200  bg-white "
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-600   hover:rounded-b-xl hover:rounded-t-xl "
                onClick={() => toggleItem(index)}
              >
                {item.question}
                <FaAngleDown
                  size={25}
                  className={`transition-transform text-black ${
                    Open ? "rotate-180" : ""
                  }`}
                />
              </button>
              {Open && (
                <div className="px-4 py-4 text-black">{item.answer}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Faq;
