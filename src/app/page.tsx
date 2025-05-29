import { redirect } from "next/navigation";
import { AllRoutesEnum } from "@/lib/enums";

export default function Home() {
  redirect(AllRoutesEnum.DASHBOARD);
}
