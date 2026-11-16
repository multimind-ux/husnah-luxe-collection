import { Minus, Plus } from 'lucide-react'

export function SizePicker({ sizes = [], value, onChange, label = 'Size' }) {
  if (!sizes.length) return null
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted/45">
          {label}
        </span>
        <span className="text-[0.62rem] uppercase tracking-[0.14em] text-text/50">
          {value || 'Select'}
        </span>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {sizes.map((size) => {
          const active = value === size
          return (
            <button
              key={size}
              type="button"
              onClick={() => onChange(size)}
              aria-pressed={active}
              className={`chip min-w-12 justify-center ${
                active ? 'chip-active' : 'hover:border-accent/60'
              }`}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function VariantPicker({
  variants = [],
  value,
  onChange,
  label = 'Scent',
}) {
  if (!variants.length) return null
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted/45">
          {label}
        </span>
        <span className="text-[0.62rem] uppercase tracking-[0.14em] text-text/50">
          {value || 'Select'}
        </span>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {variants.map((variant) => {
          const active = value === variant
          return (
            <button
              key={variant}
              type="button"
              onClick={() => onChange(variant)}
              aria-pressed={active}
              className={`chip max-w-full normal-case ${
                active ? 'chip-active' : 'hover:border-accent/60'
              }`}
            >
              <span className="truncate">{variant}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ColourPicker({ colours = [], value, onChange, label = 'Colour' }) {
  if (!colours.length) return null
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted/45">
          {label}
        </span>
        <span className="text-[0.62rem] uppercase tracking-[0.14em] text-text/50">
          {value || 'Select'}
        </span>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {colours.map((colour) => {
          const active = value === colour.name
          return (
            <button
              key={colour.name}
              type="button"
              onClick={() => onChange(colour.name)}
              aria-pressed={active}
              aria-label={`${colour.name}${active ? ' selected' : ''}`}
              title={colour.name}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[0.66rem] font-medium uppercase tracking-[0.1em] transition ${
                active
                  ? 'border-accent text-accent'
                  : 'border-line/20 text-text/55 hover:border-accent/50 hover:text-text'
              }`}
            >
              <span
                className="h-4 w-4 rounded-full border border-white/20"
                style={{ backgroundColor: colour.hex }}
                aria-hidden="true"
              />
              {colour.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function QuantityStepper({ value = 1, max = 99, onChange, compact = false }) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-line/20 ${
        compact ? 'h-9' : 'h-11'
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        className="flex h-full w-9 items-center justify-center text-text/60 transition hover:text-accent disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        <Minus size={13} aria-hidden="true" />
      </button>
      <span
        className={`min-w-7 text-center text-xs font-semibold tabular-nums text-text ${
          compact ? 'min-w-6' : 'min-w-8'
        }`}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-full w-9 items-center justify-center text-text/60 transition hover:text-accent disabled:opacity-30"
        aria-label="Increase quantity"
      >
        <Plus size={13} aria-hidden="true" />
      </button>
    </div>
  )
}
