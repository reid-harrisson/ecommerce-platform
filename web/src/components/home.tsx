import { ThemeChanger } from "@/components/theme-changer";
import { Card } from "@/components/ui/card";

interface HomeProps {
  children: React.ReactNode;
}

export default function Home({ children }: HomeProps) {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
      <div className="bg-secondary-foreground h-full px-12 py-12 hidden md:flex md:flex-col justify-between">
        <div className="flex flex-row items-center">
          <img
            src="logo.svg"
            className="h-16 saturate-[0.6] dark:brightness-[0.2]"
          />
          <h1 className="text-primary-foreground text-2xl font-bold font-avenirnext mt-2">
            commerce
          </h1>
        </div>
        <div className="overflow-hidden flex justify-center">
          <img
            src="login.svg"
            alt="Login Background"
            className="min-w-[550px] scale-125 opacity-80"
          />
        </div>
        <div>
          <p className="text-primary-foreground">
            Research products and read reviews, familiarize yourself with return
            policies, look for discounts, use secure payment methods, track your
            orders, check shipping costs, contact customer service when needed,
            read product descriptions carefully, and create a wishlist for
            future purchases.
          </p>
        </div>
      </div>
      <Card className="grid grid-rows-[max-content_1fr] bg-background">
        <div className="w-full h-16 px-4 flex flex-row justify-end items-center">
          <ThemeChanger />
        </div>
        <div className="flex flex-col items-center justify-center pb-16 gap-2">
          {children}
        </div>
      </Card>
    </div>
  );
}
