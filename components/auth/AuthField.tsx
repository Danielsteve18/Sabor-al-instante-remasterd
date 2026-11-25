"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/auth/AuthIcons";

type AuthFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  /** Ícono izquierdo (de AuthIcons), p. ej. "mail". */
  icon: IconName;
  placeholder?: string;
  autoComplete?: string;
  /** Valor inicial (para conservar lo escrito tras un error del servidor). */
  defaultValue?: string;
  /** Mensaje de error del campo; si existe, se marca en rojo. */
  error?: string;
  /** Ayuda gris mientras no haya error. */
  help?: string;
};

/** Campo con label, ícono, ojito en las contraseñas y error accesible. */
export function AuthField({
  id,
  name,
  label,
  type = "text",
  icon,
  placeholder,
  autoComplete,
  defaultValue,
  error,
  help,
}: AuthFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const describedBy = error ? `${id}-error` : help ? `${id}-help` : undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.9rem] font-medium text-[#f5f5f5]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={isPassword && visible ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`auth-input peer block w-full rounded-xl border bg-[#222222] py-[14px] pl-[46px] text-base text-[#f5f5f5] transition-all duration-300 placeholder:text-[#b8b8b8]/50 focus:outline-none focus:ring-[3px] disabled:opacity-60 ${
            isPassword ? "pr-[50px]" : "pr-4"
          } ${
            error
              ? "border-[#ff6b7a] focus:border-[#ff6b7a] focus:ring-[#ff6b7a]/20"
              : "border-white/10 focus:border-[#d4c59e] focus:ring-[#d4c59e]/10"
          }`}
        />

        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-4 flex items-center ${
            error ? "text-[#ff6b7a]" : "text-[#b8b8b8]"
          }`}
        >
          <Icon name={icon} className="h-5 w-5" />
        </span>

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={visible}
            className="absolute inset-y-0 right-2 flex w-10 cursor-pointer items-center justify-center border-none bg-transparent text-[#b8b8b8] transition-colors duration-300 hover:text-[#d4c59e]"
          >
            <Icon name={visible ? "eye-off" : "eye"} className="h-5 w-5" />
          </button>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-[6px] text-sm text-[#ff6b7a]">
          {error}
        </p>
      ) : help ? (
        <p id={`${id}-help`} className="mt-[6px] text-sm text-[#b8b8b8]">
          {help}
        </p>
      ) : null}
    </div>
  );
}
