import { Link } from "react-router-dom";

const BottomAuth = ({ to, label , title }) => {
  return (
    <div className="text-center">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {label}
        <Link
          to={to}
          className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
        >
          {title}
        </Link>
      </p>
    </div>
  );
};

export default BottomAuth;
