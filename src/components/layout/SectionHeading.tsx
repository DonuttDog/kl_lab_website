import { cn } from '../ui/utils';

type SectionHeadingProps = {
  title: string;
  className?: string;
};

export function SectionHeading({ title, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-6 text-center', className)}>
      <h2 className="mb-3 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">{title}</h2>
      <div className="mx-auto h-1 w-16 rounded-full bg-brand" aria-hidden />
    </div>
  );
}
