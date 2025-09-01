
import { ReactNode } from "react";
import AppLogo from "@/components/app-logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
             <div className="absolute top-8 left-8">
                <Link href="/" className="flex items-center gap-2">
                    <AppLogo className="size-8 text-primary" />
                    <span className="text-xl font-bold tracking-tight">StudyCalm</span>
                </Link>
             </div>
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    )
}
