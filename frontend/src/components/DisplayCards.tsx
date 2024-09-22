import { CreditCard, Shield } from "lucide-react";

const DisplayCards = ({
  balance,
  loading,
}: {
  balance: number;
  loading: boolean;
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-purple-200">Total Balance</p>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <h2 className="text-3xl font-bold text-white">
                ${balance.toFixed(2)}
              </h2>
            )}
          </div>
          <CreditCard className="h-8 w-8 text-purple-200" />
        </div>
        <p className="text-sm text-purple-200">Last updated: 2 minutes ago</p>
      </div>

      <div className="bg-gradient-to-br md:block hidden from-green-500 to-teal-400 rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-green-100">Authorization Status</p>
            <h2 className="text-3xl font-bold text-white">Verified</h2>
          </div>
          <Shield className="h-8 w-8 text-green-100" />
        </div>
        <p className="text-sm text-green-100">
          Your account is fully authorized
        </p>
      </div>
    </div>
  );
};

export default DisplayCards;
