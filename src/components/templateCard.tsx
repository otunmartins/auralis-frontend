import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";

export interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  models: string[];
  icon: string;
  visible?: boolean;
  category?: string;
  link?: string;
  buttonText?: string;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  models,
  icon,
  visible = true,
}) => {
  return (
    <Card
      className={`flex flex-col justify-between items-end gap-8 p-4 border border-solid bg-white border-[#eeeeee] rounded-xl ${
        !visible ? "opacity-0" : ""
      }`}
    >
      <CardContent className="flex flex-col items-start self-stretch w-full gap-3 p-0">
        <div className="relative w-[60px] min-w-[60px] h-[60px] min-h-[60px]">
          <Image src={icon} alt={title} fill />
        </div>

        <div className="flex flex-col items-start gap-[18px] relative self-stretch w-full">
          <div className="relative flex flex-col items-start self-stretch w-full gap-1">
            <h3 className="self-stretch mt-[-1.00px] font-text-5-semibold text-[#333333] text-[length:var(--text-5-semibold-font-size)] tracking-[var(--text-5-semibold-letter-spacing)] leading-[var(--text-5-semibold-line-height)]">
              {title}
            </h3>
            <p className="self-stretch font-text-3-regular text-[#6c7279] text-[length:var(--text-3-regular-font-size)] tracking-[var(--text-3-regular-letter-spacing)] leading-[var(--text-3-regular-line-height)]">
              {description}
            </p>
          </div>

          <div className="relative flex items-start self-stretch w-full gap-2">
            <span className="w-fit mt-[-1.00px] font-text-2-semibold text-[#333333] text-[length:var(--text-2-semibold-font-size)] tracking-[var(--text-2-semibold-letter-spacing)] leading-[var(--text-2-semibold-line-height)] whitespace-nowrap">
              Models:
            </span>
            <span className="flex-1 mt-[-1.00px] font-text-2-regular text-primary-500 text-[length:var(--text-2-regular-font-size)] tracking-[var(--text-2-regular-letter-spacing)] leading-[var(--text-2-regular-line-height)]">
              {models.join(", ")}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-0">
        <Button className="w-full justify-center gap-2 px-4 py-2.5 bg-primary-950 rounded-lg">
          <span className="font-text-3-medium text-white text-[length:var(--text-3-medium-font-size)] text-center tracking-[var(--text-3-medium-letter-spacing)] leading-[var(--text-3-medium-line-height)] whitespace-nowrap">
            Use This Template
          </span>
          <ArrowRightIcon className="w-6 h-6 text-white" />
        </Button>
      </CardFooter>
    </Card>
  );
};
