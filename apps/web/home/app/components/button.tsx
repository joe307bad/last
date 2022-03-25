export const SubmitButton = ({
  children,
}: {
  children: string;
}) => {
  return (
    <button
      type="submit"
      className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
    >
      {children}
    </button>
  );
};
