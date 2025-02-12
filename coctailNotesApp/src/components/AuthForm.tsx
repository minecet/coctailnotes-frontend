import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button } from "@mantine/core";

interface AuthFormProps {
  submitCallback: (formData: FormData) => void;
  isSignup: boolean;
  fields: { name: string; label: string; type?: string; required: boolean }[];
  buttonLabel: string;
  initialValues?: Partial<FormData>; // Ensure optional values
}

interface FormData {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  surname?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isSignup,
  submitCallback,
  fields,
  buttonLabel,
  initialValues = {}, // Ensure initialValues is never undefined
}) => {
  const form = useForm<FormData>({
    initialValues: {
      username: initialValues.username || "",
      password: initialValues.password || "",
      email: initialValues.email || "",
      firstName: initialValues.firstName || "",
      surname: initialValues.surname || "",
    },
  });

  return (
    <form onSubmit={form.onSubmit(submitCallback)}>
      {fields.map((field) =>
        field.name === "password" ? (
          <PasswordInput
            key={field.name}
            label={field.label}
            {...form.getInputProps(field.name as keyof FormData)}
            required={field.required}
            mt="md"
          />
        ) : (
          <TextInput
            key={field.name}
            label={field.label}
            {...form.getInputProps(field.name as keyof FormData)}
            required={field.required}
            mt="md"
          />
        )
      )}

      <Button type="submit" fullWidth mt="xl">
        {buttonLabel}
      </Button>
    </form>
  );
};

export default AuthForm;
