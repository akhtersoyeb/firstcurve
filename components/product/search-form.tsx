import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useRouter } from "next/router";

interface SearchFormProps {
  containerClassName?: string;
}

const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),
});

type SearchFormData = z.infer<typeof formSchema>;

function SearchForm({ containerClassName = "" }: SearchFormProps) {
  const router = useRouter();
  const form = useForm<SearchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
    },
  });

  const onSubmit = async (data: SearchFormData) => {
    console.log(data);
    // // Handle form submission here
    await new Promise((resolve) =>
      setTimeout(() => {
        router.push({
          pathname: "/products/[id]",
          query: { id: "1234" },
        });
        form.reset();
        resolve(true);
      }, 8000)
    );
  };

  if (form.formState.isSubmitting) {
    const loadingStates = [
      {
        text: "Getting started",
      },
      {
        text: "Generating keywords",
      },
      {
        text: "Searching on reddit",
      },
      {
        text: "Analyzing results",
      },
    ];
    return (
      <div className={containerClassName}>
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={true}
          // manual={true}
          // value={2}
        />
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SearchForm;
