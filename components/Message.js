export default function Message({ message, win }) {
  return (
    <div className="message-container my-3 relative">
      {message && (
        <div
          className="message rounded-[10px] bg-gray-600 text-xl w-fit mx-auto py-1 px-3 absolute left-0 right-0 -top-5 z-10 border-2 border-double border-gray-300"
          data-animation={win ? 'win' : ''}
        >
          {message}
        </div>
      )}
    </div>
  );
}
