const ErrorComponent = () => {
  return (
    <div className="m-2 bg-red-500/50 border p-2 border-red-600/50 rounded">
      <div className="text-center font-bold text-red-800">
        There seem's to be a error
      </div>
      <div className="text-center text-sm font-semibold text-red-900">
        Try refreshing the page or check your internet connection
      </div>
    </div>
  );
};

export default ErrorComponent;
