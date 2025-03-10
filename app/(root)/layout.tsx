import MobileNavigation from "@/components/MobileNavigation";
import RootLeftSidebar from "@/components/RootLeftSidebar";
import RootRightSidebar from "@/components/RootRightSidebar";
import Image from "next/image";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex flex-col">
            <main className="relative flex bg-black-3">
                <RootLeftSidebar />
                <section className="flex min-h-screen flex-1 flex-col p-4 sm:p-14">
                    <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
                        <div className="flex h-16 items-center justify-between md:hidden">
                            <Image src='/icons/logo.svg' alt="menuicon" width={30 } height={30 } />
                            <MobileNavigation />
                        </div>
                        <div className="flex flex-col md:pb-14">
                            Toaster
                            {children}
                        </div>
                    </div>
                </section>
                <RootRightSidebar />
            </main>
        </div>
    );
}
