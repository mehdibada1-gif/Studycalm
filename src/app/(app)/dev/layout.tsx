
import { ReactNode } from "react";

export default function DevLayout({ children }: { children: ReactNode }) {
    if (process.env.NODE_ENV === 'production') {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p>This page is only available in development.</p>
            </div>
        );
    }

    return <>{children}</>
}
