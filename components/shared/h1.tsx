import cx from "classnames";
import { nunitoSansHeavy } from "@/app/fonts";

const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className={cx(`mb-1 text-3xl tracking-tight`, nunitoSansHeavy.className)}>
    {children}
  </h1>
);

export default H1;
