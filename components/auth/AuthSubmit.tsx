import { Icon } from "@/components/auth/AuthIcons";

type AuthSubmitProps = {
  pending: boolean;
  label: string;
  pendingLabel: string;
};

/** Botón verde principal, con estado de carga. */
export function AuthSubmit({ pending, label, pendingLabel }: AuthSubmitProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="flex w-full cursor-pointer items-center justify-center gap-[10px] rounded-xl border-none bg-gradient-to-br from-[#8fae56] to-[#7a9c48] px-4 py-[15px] text-[1.05rem] font-bold text-white shadow-[0_4px_15px_rgba(143,174,86,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(143,174,86,0.4)] active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {pending && <Icon name="spinner" className="h-5 w-5" />}
      {pending ? pendingLabel : label}
    </button>
  );
}
