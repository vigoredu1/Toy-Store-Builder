import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Smartphone, Package, Wallet, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const mutation = useCreateLead();

  const form = useForm({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      city: "",
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl font-display">
              1
            </div>
            <span className="text-xl font-bold text-foreground font-display">ClickBuilder</span>
          </div>
          <Button 
            onClick={scrollToForm} 
            variant="outline" 
            className="hidden sm:flex border-primary text-primary hover:bg-primary/5"
          >
            Setup Store
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 border border-accent/20">
              🚀 Special Launch Offer
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground max-w-5xl mx-auto leading-[1.1]">
              Start Your <span className="text-gradient">Toy Store</span>
              <br className="hidden md:block" /> Get Website, Wholesaler & Rs 12000 Startup Fund
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Launch your online business today. We provide the platform, the products, and the initial capital to get you started.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Start My Toy Store <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Smartphone className="w-8 h-8 text-primary" />}
              title="Your Branded Website"
              description="1-click setup. Mobile-friendly. 10+ professional themes ready for your brand. Built-in shopping cart, secure payments, and inventory management all included."
              delay={0.1}
            />
            <BenefitCard 
              icon={<Package className="w-8 h-8 text-accent" />}
              title="Verified Toy Wholesalers"
              description="We connect you trusted toy suppliers. Access 100+ quality products on your platform and give you dropshipping service for your customer."
              delay={0.2}
            />
            <BenefitCard 
              icon={<Wallet className="w-8 h-8 text-green-600" />}
              title="Rs 12000 Secure Business Fund"
              description="This is your capital, safely stored in your 1ClickBuilder wallet. Use it to purchase toys wholesale. No hidden charges, complete control over your inventory."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Visual Trust / Catalog Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Toy Catalog</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get access to thousands of high-quality toys at wholesale prices.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {/* Use descriptive comments for Unsplash images as requested */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
              {/* colorful wooden educational toy blocks for kids */}
              <img 
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=500&fit=crop" 
                alt="Educational Toys" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
               {/* soft plush teddy bear toy */}
              <img 
                src="https://pixabay.com/get/g2d8f9cc162383b200cd799ee8bf9bd2cc721daa4e3c1f9580d0ea2cca78cb3a7a59bb78826880714c9e189c269338cb6aa12ad884901ed630908603de693c908_1280.jpg" 
                alt="Plush Toys" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
               {/* red toy race car on floor */}
              <img 
                src="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&h=500&fit=crop" 
                alt="Action Toys" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
               {/* colorful plastic building blocks lego style */}
              <img 
                src="https://pixabay.com/get/g565fdb6826788122668d1b0dd5346122666710df2ffa01768a27e14a73c21d3fe2137a7830f3ce20d5125f930f6da721916fe4bb3ccbb8ef23d600e2c3cfca6b_1280.jpg" 
                alt="Building Blocks" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="lead-form" className="py-20 bg-gradient-to-b from-white to-secondary/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border/50 shadow-2xl shadow-primary/5 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary to-accent w-full" />
            <CardHeader className="text-center pt-10 pb-2">
              <CardTitle className="text-3xl md:text-4xl">Setup Your Store Now</CardTitle>
              <CardDescription className="text-lg mt-2">
                Join Verified Wholesaler to Launch Your Successful Toy Store Today
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            className="h-12 text-lg bg-background border-2 focus:border-primary/50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+91 98765 43210" 
                            className="h-12 text-lg bg-background border-2 focus:border-primary/50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">City</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. Mumbai, Delhi, Bangalore" 
                            className="h-12 text-lg bg-background border-2 focus:border-primary/50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full text-lg h-14 mt-4 font-semibold shadow-lg shadow-primary/20"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Setting up..." : "Start My Toy Store"}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By clicking above, you agree to our Terms & Conditions. Your data is secure.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl font-display">
              1
            </div>
            <span className="text-xl font-bold text-foreground font-display">ClickBuilder</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} 1ClickBuilder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function BenefitCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 font-display">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
