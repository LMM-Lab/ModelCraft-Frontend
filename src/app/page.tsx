import Text from "@/component/common/Text";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/classification/train")
  return (
      <Text $variants="ExtraLarge">
        /page
      </Text>
  );
}
