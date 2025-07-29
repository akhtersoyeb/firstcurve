import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { cn } from "@/lib/utils";
import { useState } from "react";
import useProductMutations from "@/hooks/mutations/products/useProductMutations";
import useKeywordMutations from "@/hooks/mutations/keywords/useKeywordMutations";
import useSearchLogsStore from "@/stores/useSearchLogsStore";
import { useRedditPostMutations } from "@/hooks/mutations/reddit-posts";

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
  const {
    currentSearchCount,
    maxSearchCountLimit,
    isLimitExhaustedModalOpen,
    setIsLimitExhaustedModalOpen,
  } = useSearchLogsStore();
  const { createProductMutation } = useProductMutations();
  const { generateKeywordsMutation } = useKeywordMutations();
  const { findRedditPostsMutation } = useRedditPostMutations();

  const [currentLoadingStepIndex, setCurrentLoadingStepIndex] = useState(-1);

  const form = useForm<SearchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
    },
  });

  const onSubmit = async (data: SearchFormData) => {
    if (
      currentSearchCount >= maxSearchCountLimit &&
      !isLimitExhaustedModalOpen
    ) {
      setIsLimitExhaustedModalOpen(true);
      return;
    }
    try {
      setCurrentLoadingStepIndex(0);
      const product = await createProductMutation.mutateAsync({
        name: data.productName,
        description: data.productDescription,
      });
      console.log("product:", product);

      setCurrentLoadingStepIndex((prev) => prev + 1);
      const keywords = await generateKeywordsMutation.mutateAsync({
        productId: product.id,
      });
      console.log("keywords: ", keywords);

      setCurrentLoadingStepIndex((prev) => prev + 1);
      const searchResults = await findRedditPostsMutation.mutateAsync({
        keywordId: keywords[0].id,
      });

      console.log("search results: ", searchResults);

      await router.push({
        pathname: "/products/[slug]",
        query: { slug: product.slug },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (form.formState.isSubmitting || currentLoadingStepIndex !== -1) {
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
          manual={true}
          value={currentLoadingStepIndex}
        />
      </div>
    );
  }

  return (
    <div className={cn("w-sm", containerClassName)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product name"
                    className="bg-white"
                    {...field}
                  />
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
                    className="min-h-[100px] bg-white"
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
