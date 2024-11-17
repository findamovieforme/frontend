import * as Dialog from "@radix-ui/react-dialog";

const PlayTrailer = ({ trailerKey, movieTitle }: { trailerKey: string, movieTitle: string }) => {
  return (
    <div>
      {trailerKey ? (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none">
              Play Trailer
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            {/* Overlay */}
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
            {/* Content */}
            <Dialog.Content
              className="fixed z-50 bg-black rounded-lg w-[80%] h-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative w-full h-full">
                <Dialog.Close asChild>
                  <button className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-full text-sm z-10">
                    Close
                  </button>
                </Dialog.Close>
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                  title={`${movieTitle} Trailer`}
                ></iframe>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : (
        <p className="text-gray-500">Trailer not available</p>
      )}
    </div>
  );
};

export default PlayTrailer;
