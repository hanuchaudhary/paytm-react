interface cardInterface {
  name: string;
  email: string;
}

const Card = ({ name, email }: cardInterface) => {
  return (
    <div>
      <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {email}
            </p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
          Send Money
        </button>
      </div>
    </div>
  );
};

export default Card;
