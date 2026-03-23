const LoadingComponent = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-full h-20 rounded-xl bg-gray-500 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default LoadingComponent;
