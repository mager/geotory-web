import { PuffLoader } from "react-spinners";
import Text from "@/components/shared/text";

type Props = {
  message?: string;
};

export default function Loading({ message }: Props) {
  return (
    <div className="my-8 flex items-center justify-center">
      <PuffLoader />
      {message && (
        <div>
          <Text>{message}</Text>
        </div>
      )}
    </div>
  );
}
