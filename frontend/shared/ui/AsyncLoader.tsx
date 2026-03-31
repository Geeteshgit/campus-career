const AsyncLoader = () => {
  return (
    <div className="w-full flex items-center justify-center py-5">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default AsyncLoader;