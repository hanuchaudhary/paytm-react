import { Link } from "react-router-dom";

const BottomAuth = ({
  to,
  label,
  title,
}: {
  to: string;
  label: string;
  title: string;
}) => {
  return (
    <div className="text-center">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {label}
        <Link
          to={to}
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {title}
        </Link>
      </p>
    </div>
  );
};

export default BottomAuth;
