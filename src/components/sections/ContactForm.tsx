"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type CategoryOption = { value: string; label: string };
type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const options = t.raw("categories.options") as CategoryOption[];

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t("name.required")),
        company: z.string().min(1, t("company.required")),
        email: z
          .string()
          .min(1, t("email.required"))
          .email(t("email.invalid")),
        phone: z.string().optional(),
        categories: z
          .array(z.string())
          .min(1, t("categories.required")),
        message: z.string().min(1, t("message.required")),
      }),
    [t],
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      categories: [],
      message: "",
    },
  });

  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (data: FormValues) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Network error");
      setStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-[color:var(--color-border)] bg-white p-8 md:p-10"
      aria-label={t("title")}
    >
      <h2 className="typo-h2">{t("title")}</h2>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label={t("name.label")}
          error={errors.name?.message}
          htmlFor="name"
        >
          <input
            id="name"
            type="text"
            placeholder={t("name.placeholder")}
            autoComplete="name"
            {...register("name")}
            className="form-input"
          />
        </Field>
        <Field
          label={t("company.label")}
          error={errors.company?.message}
          htmlFor="company"
        >
          <input
            id="company"
            type="text"
            placeholder={t("company.placeholder")}
            autoComplete="organization"
            {...register("company")}
            className="form-input"
          />
        </Field>
        <Field
          label={t("email.label")}
          error={errors.email?.message}
          htmlFor="email"
        >
          <input
            id="email"
            type="email"
            placeholder={t("email.placeholder")}
            autoComplete="email"
            {...register("email")}
            className="form-input"
          />
        </Field>
        <Field
          label={t("phone.label")}
          error={errors.phone?.message}
          htmlFor="phone"
        >
          <input
            id="phone"
            type="tel"
            placeholder={t("phone.placeholder")}
            autoComplete="tel"
            {...register("phone")}
            className="form-input"
          />
        </Field>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-[color:var(--color-muted)] uppercase">
          {t("categories.label")}
        </p>
        <Controller
          control={control}
          name="categories"
          render={({ field }) => (
            <div className="mt-4 flex flex-wrap gap-2">
              {options.map((option) => {
                const checked = field.value.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 ${
                      checked
                        ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-white"
                        : "border-[color:var(--color-border)] text-foreground hover:border-[color:var(--color-accent)]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={(event) => {
                        if (event.target.checked) {
                          field.onChange([...field.value, option.value]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== option.value),
                          );
                        }
                      }}
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          )}
        />
        {errors.categories ? (
          <p className="mt-2 text-xs text-[color:var(--color-accent)]">
            {errors.categories.message as string}
          </p>
        ) : null}
      </div>

      <div className="mt-6">
        <Field
          label={t("message.label")}
          error={errors.message?.message}
          htmlFor="message"
        >
          <textarea
            id="message"
            rows={6}
            placeholder={t("message.placeholder")}
            {...register("message")}
            className="form-input resize-y"
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-accent)] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#bb000d] focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t("submitting")}</span>
            </>
          ) : (
            <span>{t("submit")}</span>
          )}
        </button>

        {status === "success" ? (
          <div className="flex items-center gap-2 text-sm text-[color:var(--color-accent)]">
            <CheckCircle2 className="h-4 w-4" />
            <span>{t("success")}</span>
          </div>
        ) : null}
        {status === "error" ? (
          <div className="flex items-center gap-2 text-sm text-[color:var(--color-accent)]">
            <AlertCircle className="h-4 w-4" />
            <span>{t("error")}</span>
          </div>
        ) : null}
      </div>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--color-border);
          background: #ffffff;
          padding: 12px 14px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-foreground);
          transition:
            border-color 200ms ease,
            box-shadow 200ms ease;
        }
        :global(.form-input::placeholder) {
          color: var(--color-muted);
        }
        :global(.form-input:focus) {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(215, 0, 15, 0.12);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold tracking-[0.18em] text-[color:var(--color-muted)] uppercase"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p className="mt-1.5 text-xs text-[color:var(--color-accent)]">{error}</p>
      ) : null}
    </div>
  );
}
