import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  title?: string;
  bg?: string; // Tailwind CSS background class, e.g., "bg-blue-500"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, title, bg = "bg-blue-600", children, ...props }, ref) => {
    return (
      <button
        className={"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"+
          "rounded-md px-4 py-2 "+bg+" text-white hover:opacity-90 "+className}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {title || children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
