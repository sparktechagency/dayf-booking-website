// "use client";

import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";

const FormWrapper = ({
  children,
  resolver,
  defaultValues,
  className,
  onSubmit,
  onKeyDown,
}) => {
  const formConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const form = useForm(formConfig) ?? {};

  const submit = (data) => {
    onSubmit(data);
    // form.reset();
  };

  return (
    <Form {...form}>
      <form
        className={cn("!font-dm-sans w-full space-y-4", className)}
        onSubmit={form.handleSubmit(submit)}
        onKeyDown={onKeyDown}
      >
        {children}
      </form>
    </Form>
  );
};

export default FormWrapper;
