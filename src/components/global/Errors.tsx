interface IProps {
  errors: string[];
}

const Errors: React.FC<IProps> = ({ errors }) => {
  return (
    <ul>
      {errors.length > 0 &&
        errors.map((err: string) => <li key={err}>{err}</li>)}
    </ul>
  );
};

export default Errors;
