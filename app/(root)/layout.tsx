import RootLeftSidebar from "@/components/RootLeftSidebar";
import RootRightSidebar from "@/components/RootRightSidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <main className="">
                <RootLeftSidebar />
                {children}
                <RootRightSidebar />
            </main>
        </div>
    );
}
