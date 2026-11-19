import Link from "next/link";
import { clsx } from "clsx";
import { ExternalLinkIcon } from "./Icons";

type Variant = "filled" | "outline";

type Props = {
  href?: string;
  variant?: Variant;
  external?: boolean;
  withIcon?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function PillButton({
  href,
  variant = "filled",
  external,
  withIcon,
  children,
  className,
}: Props) {
  const cls = clsx(
    "inline-flex items-center justify-center gap-1 rounded-full px-4 py-3 font-semibold tracking-[0.32px] transition-[transform,background] duration-200",
    variant === "filled" && "whitespace-nowrap bg-accent text-[16px] text-white hover:scale-[1.03]",
    variant === "outline" &&
      "border-2 border-accent text-[13px] text-white hover:bg-accent/10 md:text-[16px]",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {withIcon && <ExternalLinkIcon className="h-4 w-4" />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
        data-cursor="link"
      >
        {content}
      </Link>
    );
  }
  return <span className={cls}>{content}</span>;
}
