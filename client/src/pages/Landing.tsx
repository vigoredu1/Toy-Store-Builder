import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Smartphone,
  Package,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_LINK = "https://wa.link/tj4eso";

type LeadFormData = {
  name: string;
  whatsapp: string;
  city: string;
};

function BrandLogo({ size = 32 }: { size?: number }) {
  return (
    <img
      src="https://www.1clickbuilder.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_full.e128753d.png&w=640&q=75"
      alt="1ClickBuilder Logo"
      style={{ width: size, height: size }}
      className="object-contain"
    />
  );
}

export default function Landing() {
  const mutation = useCreateLead();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      city: "",
    },
  });

  const onSubmit = (data: LeadFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        window.location.href = WHATSAPP_LINK;
      },
    });
  };

  const scrollToForm = () => {
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <BrandLogo />
          <Button
            onClick={scrollToForm}
            variant="outline"
            className="hidden sm:flex border-primary text-primary"
          >
            Setup Store
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-4"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm mb-6">
            🚀 Special Launch Offer
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Start Your <span className="text-gradient">Toy Store</span>
            <br /> Get Website, Wholesaler & Rs 12000 Startup Fund
          </h1>

          <p className="text-lg text-muted-foreground mb-10">
            We provide the platform, products, and capital to get you started.
          </p>

          <Button size="lg" onClick={scrollToForm}>
            Start My Toy Store <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <BenefitCard
            icon={<Smartphone className="w-8 h-8 text-primary" />}
            title="Your Branded Website"
            description="1-click setup, mobile friendly, payments & inventory included."
            delay={0.1}
          />
          <BenefitCard
            icon={<Package className="w-8 h-8 text-accent" />}
            title="Verified Toy Wholesalers"
            description="Access trusted suppliers and 100+ quality products."
            delay={0.2}
          />
          <BenefitCard
            icon={<Wallet className="w-8 h-8 text-green-600" />}
            title="Rs 12000 Business Fund"
            description="Use your wallet balance to purchase inventory."
            delay={0.3}
          />
        </div>
      </section>

      {/* Form */}
      <section id="lead-form" className="py-20 bg-gradient-to-b from-white to-secondary/50">
        <div className="max-w-3xl mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Setup Your Store Now</CardTitle>
              <CardDescription>
                Join verified wholesalers & launch today
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {(["name", "whatsapp", "city"] as const).map((field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">
                            {field}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Setting up..." : "Start My Toy Store"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 text-center">
        <BrandLogo />
        <p className="text-sm text-muted-foreground mt-4">
          © {new Date().getFullYear()} 1ClickBuilder
        </p>
      </footer>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card p-8 rounded-2xl border shadow-lg"
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
