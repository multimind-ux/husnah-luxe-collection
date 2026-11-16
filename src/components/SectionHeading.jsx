export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className = '',
  align = 'bottom',
}) {
  return (
    <div
      className={`flex flex-col gap-7 ${
        align === 'bottom' ? 'md:flex-row md:items-end md:justify-between' : ''
      } ${className}`}
    >
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="display mt-4 text-[clamp(2.6rem,6vw,6rem)] text-text">{title}</h2>
        {description && (
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted/55">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
