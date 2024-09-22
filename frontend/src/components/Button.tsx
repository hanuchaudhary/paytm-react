interface buttonInterface { 
  label : string;
  onClick : () => void
}
const Button = ({ onClick, label } : buttonInterface) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
