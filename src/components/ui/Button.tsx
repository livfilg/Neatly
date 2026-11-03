import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost";

const base =
  "h-11 px-[18px] rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors active:scale-[0.98] whitespace-nowrap disabled:cursor-default";

const variants: Record<Variant, string> = {
  primary: "bg-sky text-ink hover:bg-[#95cde9] disabled:bg-line disabled:text-mute",
  dark: "bg-ink text-white hover:bg-[#22394a]",
  ghost: "bg-white border border-line text-ink hover:border-sky hover:bg-mist",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
