import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ExploreRow({
  image,
  title,
  copy,
  href,
  cta,
  reverse = false,
}: {
  image: { src: string; alt: string; width: number; height: number };
  title: string;
  copy: string;
  href: string;
  cta: string;
  reverse?: boolean;
}) {
  const text = (
    <div
      className={cn(
        'flex flex-col items-center gap-4 text-center lg:items-start lg:text-left',
        reverse && 'lg:order-first',
      )}
    >
      <h3 className="font-display text-3xl font-bold sm:text-4xl">{title}</h3>
      <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
        {copy}
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        <Link
          href={href}
          className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
        >
          {cta}
        </Link>
      </div>
    </div>
  );

  const picture = (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="relative overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="eager"
          className="w-full object-cover"
        />
      </div>
    </div>
  );

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {picture}
      {text}
    </div>
  );
}
