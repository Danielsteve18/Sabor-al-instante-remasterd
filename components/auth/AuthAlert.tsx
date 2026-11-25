import type { ReactNode } from "react";
import { Icon } from "@/components/auth/AuthIcons";

type AuthAlertProps = {
  type: "error" | "success";
  title?: string;
  children: ReactNode;
};

const styles = {
  error: {
    box: "border-brand-error-deep/30 bg-brand-error-deep/15 text-brand-error",
    icon: "x-circle" as const,
    role: "alert" as const,
  },
  success: {
    box: "border-white/20 bg-gradient-to-br from-brand-green/95 to-brand-green-dark/95 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
    icon: "check-circle" as const,
    role: "status" as const,
  },
};

/** Mensaje general del formulario: error (rojo) o éxito (verde), con ícono. */
export function AuthAlert({ type, title, children }: AuthAlertProps) {
  const s = styles[type];

  return (
    <div
      role={s.role}
      className={`flex animate-[auth-slide-down_0.3s_ease] items-center gap-3 rounded-xl border px-4 py-3 text-[0.95rem] motion-reduce:animate-none ${s.box}`}
    >
      <Icon name={s.icon} className="h-6 w-6 shrink-0" />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <p>{children}</p>
      </div>
    </div>
  );
}
