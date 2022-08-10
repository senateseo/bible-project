export const Skeleton = () => {
  return (
    <div class="border border-gray-300 shadow rounded-md p-4  w-full mx-auto">
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 w-24 bg-gray-300 rounded"></div>
          <div class="space-y-3">
            <div class="h-2 bg-gray-300 rounded"></div>
            <div class="h-2 bg-gray-300 rounded"></div>
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-gray-300 rounded col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
