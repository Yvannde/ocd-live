"use client";

import { useState } from "react";
import { copy } from "@/config/copy.fr";

export type BusinessData = {
  fullName: string;
  businessName: string;
  category: string;
  description: string;
  offer: string;
  phone: string;
  city: string;
  country: string;
  consent: boolean;
};

const empty: BusinessData = {
  fullName: "",
  businessName: "",
  category: "alimentation",
  description: "",
  offer: "",
  phone: "",
  city: "",
  country: "Togo",
  consent: false,
};

const fieldClass =
  "h-12 w-full border border-line bg-bg px-3 text-[15px] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function BusinessForm({
  initial,
  onSubmit,
  onBack,
}: {
  initial?: Partial<BusinessData>;
  onSubmit: (data: BusinessData) => void;
  onBack: () => void;
}) {
  const [data, setData] = useState<BusinessData>({ ...empty, ...initial });
  const [error, setError] = useState("");
  const b = copy.booking.business;

  function update<K extends keyof BusinessData>(key: K, value: BusinessData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !data.fullName.trim() ||
      !data.businessName.trim() ||
      !data.phone.trim() ||
      !data.city.trim()
    ) {
      setError("Complète les champs obligatoires.");
      return;
    }
    if (!data.consent) {
      setError("Coche le consentement vitrine pour continuer.");
      return;
    }
    setError("");
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[640px]">
      <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[0.95] text-ink">
        {b.title}
      </h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label={b.fullName} required>
          <input
            className={fieldClass}
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
        </Field>
        <Field label={b.businessName} required>
          <input
            className={fieldClass}
            value={data.businessName}
            onChange={(e) => update("businessName", e.target.value)}
          />
        </Field>
        <Field label={b.category}>
          <select
            className={fieldClass}
            value={data.category}
            onChange={(e) => update("category", e.target.value)}
          >
            {Object.entries(b.categories).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={b.phone} required>
          <input
            className={fieldClass}
            inputMode="tel"
            placeholder="+228…"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </Field>
        <Field label={b.city} required>
          <input
            className={fieldClass}
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
          />
        </Field>
        <Field label={b.country}>
          <input
            className={fieldClass}
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label={b.description}>
            <textarea
              className={`${fieldClass} min-h-24 py-3`}
              value={data.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label={b.offer}>
            <input
              className={fieldClass}
              value={data.offer}
              onChange={(e) => update("offer", e.target.value)}
            />
          </Field>
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-[14px] text-ink-2">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-[var(--ink)]"
          checked={data.consent}
          onChange={(e) => update("consent", e.target.checked)}
        />
        <span>{b.consent}</span>
      </label>

      {error ? <p className="mt-4 text-[14px] text-danger">{error}</p> : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center border border-ink px-5 text-[15px] font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-bg"
        >
          Retour
        </button>
        <button
          type="submit"
          className="inline-flex h-12 items-center bg-ink px-5 text-[15px] font-medium text-bg transition-opacity duration-150 hover:opacity-90"
        >
          {b.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[14px] font-medium text-ink">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
