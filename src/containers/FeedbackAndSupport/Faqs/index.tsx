"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomFAQSection() {
  // State to track which accordion item is open
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqItems = [
    {
      id: "item-1",
      question: "How do I upload molecular datasets?",
      answer:
        "You can upload .csv, .json, or .sdf files via the Datasets screen. Make sure your headers follow the template format provided.",
    },
    {
      id: "item-2",
      question: "Why did my model run fail?",
      answer:
        "Model runs can fail due to various reasons including invalid input data, insufficient computational resources, or incompatible parameters. Check the error logs for specific details about your failure.",
    },
    {
      id: "item-3",
      question: "How do I export prediction results?",
      answer:
        "You can export prediction results by navigating to your completed model run, clicking on the 'Results' tab, and selecting the 'Export' button. You can choose between CSV, JSON, or Excel formats.",
    },
    {
      id: "item-4",
      question: "How do I enable Two-Factor Authentication?",
      answer:
        "To enable Two-Factor Authentication, go to your Account Settings, select the 'Security' tab, and click on 'Enable 2FA'. You can choose between app-based authentication or SMS verification.",
    },
    {
      id: "item-5",
      question: "Can I delete my account?",
      answer:
        "Yes, you can delete your account by going to Account Settings, scrolling to the bottom, and clicking on 'Delete Account'. Please note that this action is irreversible and will remove all your data.",
    },
    {
      id: "item-6",
      question: "Didn't find your answer?",
      answer:
        "If you couldn't find the answer to your question, please contact our support team at support@example.com or use the live chat feature available in the bottom right corner of the screen.",
    },
    {
      id: "item-7",
      question: "Can I delete my account?",
      answer:
        "Yes, you can delete your account by going to Account Settings, scrolling to the bottom, and clicking on 'Delete Account'. Please note that this action is irreversible and will remove all your data.",
    },
    {
      id: "item-8",
      question: "How do I export prediction results?",
      answer:
        "Yes, you can delete your account by going to Account Settings, scrolling to the bottom, and clicking on 'Delete Account'. Please note that this action is irreversible and will remove all your data.",
    },
  ];

  // Split the FAQ items into two columns
  const leftColumnItems = faqItems.slice(0, Math.ceil(faqItems.length / 2));
  const rightColumnItems = faqItems.slice(Math.ceil(faqItems.length / 2));

  // Toggle accordion item
  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="w-full py-12 bg-white">
      <div className="container px-4 mx-auto md:px-6">
        <h2 className="mb-12 text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            {leftColumnItems.map((item) => (
              <div key={item.id} className="mb-4 border rounded-md">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex items-center justify-between w-full px-4 py-3 font-medium text-left focus:outline-none"
                  aria-expanded={openItem === item.id}
                >
                  {item.question}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      openItem === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openItem === item.id
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pt-0 pb-3">{item.answer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {rightColumnItems.map((item) => (
              <div key={item.id} className="mb-4 border rounded-md">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex items-center justify-between w-full px-4 py-3 font-medium text-left focus:outline-none"
                  aria-expanded={openItem === item.id}
                >
                  {item.question}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      openItem === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openItem === item.id
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pt-0 pb-3">{item.answer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
