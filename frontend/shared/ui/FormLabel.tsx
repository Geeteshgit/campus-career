type FormLabelProps = {
  htmlFor?: string;
  label: string;
}

const FormLabel = ({ htmlFor, label }: FormLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs sm:text-sm text-neutral-600 font-medium block mb-1"
    >
      {label}
    </label>
  );
};

export default FormLabel;
