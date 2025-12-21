import { useMutation } from "@tanstack/react-query";
import { api, type LeadInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: LeadInput) => {
      // Zod validation is handled by api.leads.create.input.parse() on the server
      // But we can also pre-validate if we wanted.
      // We rely on the types here.
      
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        // Try to parse validation error
        try {
          const errorData = await res.json();
          // Check if it matches our validation schema structure
          const validationError = api.leads.create.responses[400].safeParse(errorData);
          if (validationError.success) {
            throw new Error(validationError.data.message);
          }
        } catch (e) {
          // ignore parsing error
        }
        throw new Error("Failed to submit form. Please try again.");
      }

      return api.leads.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you! We will contact you on WhatsApp shortly.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
