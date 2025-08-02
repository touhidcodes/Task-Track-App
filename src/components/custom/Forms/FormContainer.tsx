import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
  Resolver,
  UseFormProps,
} from "react-hook-form";

type TFormConfig<TFormValues extends FieldValues> = {
  resolver?: Resolver<TFormValues>;
  defaultValues?: UseFormProps<TFormValues>["defaultValues"];
};

type TFormProps<TFormValues extends FieldValues> = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFormValues>;
} & TFormConfig<TFormValues>;

const FormContainer = <TFormValues extends FieldValues = FieldValues>({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: TFormProps<TFormValues>) => {
  const formConfig: TFormConfig<TFormValues> = {};

  if (resolver) {
    formConfig.resolver = resolver;
  }

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm<TFormValues>(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<TFormValues> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default FormContainer;
