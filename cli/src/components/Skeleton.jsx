export const Skeleton = () => {
  return (
    <div className="border border-gray-300 shadow rounded-md p-4  w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 w-24 bg-gray-300 rounded"></div>
          <div className="space-y-3">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-300 rounded col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
