
import { ReactNode } from "react";
import AppLogo from "@/components/app-logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-full flex-col justify-center p-4">
             <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-8">
                <Link href="/" className="flex items-center gap-2">
                    <AppLogo className="size-8 text-primary" />
                    <span className="text-xl font-bold tracking-tight">StudyCalm</span>
                </Link>
             </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}
