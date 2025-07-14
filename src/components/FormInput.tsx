import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";

type Props = {
  label?: string;
  placeHolder: string;
  type?: string;
  options?: { label: string; value: string }[];
} & React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>;

export const FormInput = React.forwardRef<HTMLInputElement | HTMLSelectElement, Props>(
  ({ label, placeHolder, type, options, ...rest }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const [actualType, setActualType] = useState(type === "date" ? "text" : type);

    const setRef = (el: HTMLInputElement) => {
      internalRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      }
    };
    return (
      <div className="flex w-full flex-col gap-4">
        {label && <label className="text-sm font-semibold capitalize">{label}</label>}

        {/* Render Select Element */}
        {type === "select" && options ? (
          <div className="relative w-full">
            <select
              ref={ref as React.Ref<HTMLSelectElement>}
              {...rest}
              className="block h-10 w-full appearance-none rounded-8 border-[0.5px] border-black bg-white px-5 py-2 text-xs font-normal text-[#000000] outline-green-500 hover:cursor-pointer lg:h-[42px]"
            >
              <option value="" disabled>
                {placeHolder}
              </option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 transform"
              width="16"
              height="20"
              viewBox="0 0 24 24"
              stroke="#00000080"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        ) : (
          /* Render Input Element */
          <div className="relative">
            <input
              className={`block h-10 w-full rounded-8 border-[0.5px] border-black bg-white px-5 py-2 text-[12px] font-normal leading-[24px] outline-green-500 placeholder:text-[#00000080] hover:shadow-lg lg:h-[42px] ${type === "date" ? "hover:cursor-pointer" : ""}`}
              placeholder={placeHolder}
              type={actualType}
              ref={type === "date" ? setRef : (ref as React.Ref<HTMLInputElement>)}
              onFocus={(e) => {
                if (type === "date") {
                  setActualType("date");
                  setTimeout(() => internalRef.current?.showPicker?.(), 0);
                }
                rest.onFocus?.(e);
              }}
              onBlur={(e) => {
                if (type === "date") {
                  setActualType("text");
                }
                rest.onBlur?.(e);
              }}
              {...rest}
            />
            {type === "date" && (
              <button
                type="button"
                onClick={() => {
                  setActualType("date");
                  setTimeout(() => internalRef.current?.showPicker?.(), 0);
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 hover:text-gray-300"
              >
                <CalendarIcon width={16} />
              </button>
            )}
          </div>
        )}

        <style>
          {`
        /* Remove focus outline on iOS */
        input:focus, textarea:focus, select:focus {
          outline: none;
        }

        /* Webkit-specific: For iOS devices (Safari) */
        input:focus::-webkit-input-placeholder, 
        textarea:focus::-webkit-input-placeholder,
        select:focus::-webkit-input-placeholder {
          outline: none !important;
        }

        /* WebKit browsers */
        input:focus, textarea:focus, select:focus {
          -webkit-appearance: none;
        }
        
        /* Hide native calendar dropdown icon */
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          display: none;
          -webkit-appearance: none;
        }
        `}
        </style>
      </div>
    );
  },
);
