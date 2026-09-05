import { useCallback, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { ToastContext } from "./toastContextObject";

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const COLORS = {
  success: "border-cyan/40 text-cyan",
  error: "border-magenta/40 text-magenta",
  info: "border-violet-soft/40 text-violet-soft",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = "success") => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 3500);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          return (
            <div
              key={toast.id}
              className={`glass flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${COLORS[toast.type]}`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <p className="text-sm text-frost">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="ml-2 text-mist hover:text-frost">
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
