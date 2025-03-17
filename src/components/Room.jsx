export const Room = ({ name, description, topic, host, participants }) => {
  return (
    <div className="my-5 py-3 px-4 rounded-md border border-gray-2 transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex justify-between">
        <p className="mb-5 text-subtle-white text-xl transition-all duration-300 hover:text-orange-400">
          {name}
        </p>
        <p className="mb-3 text-xs font-medium text-subtle-white">
          {participants} Joined
        </p>
      </div>

      <div>
        <p className="mb-3 text-xs text-subtle-white">{description}</p>
        <hr className="border-t-[1px] border-subtle-purple" />
      </div>

      <div className="flex justify-between mt-3">
        <div className="flex-none">
          <p className="text-orange-400 text-xs hover:underline">{host}</p>
        </div>

        <div className="flex-none px-3 py-1 rounded-xl bg-[#525369]">
          <p className="text-subtle-white/75 text-xs font-bold">{topic}</p>
        </div>
      </div>
    </div>
  );
};
