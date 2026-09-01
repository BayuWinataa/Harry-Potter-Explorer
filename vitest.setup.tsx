import { vi } from "vitest";
import type { ReactNode } from "react";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src?: string; alt?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : ""} alt={alt} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a href={typeof href === "string" ? href : "#"}>{children}</a>
  ),
}));
