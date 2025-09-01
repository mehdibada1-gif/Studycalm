import type { SVGProps } from 'react';

export default function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" opacity="0.5" />
      <path d="M12 12a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" opacity="0.25" />
    </svg>
  );
}
