import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export const MessageForm = () => {
  const [message, setMessage] = useState("");
  const { data: sessionData, status } = useSession();

  const utils = api.useContext();
  const postMessage = api.predator.postMessage.useMutation({
    onMutate: async (newEntry) => {
      await utils.predator.getMessages.cancel();
      utils.predator.getMessages.setData(undefined, (prevEntries) => {
        if (prevEntries) {
          return [newEntry, ...prevEntries];
        } else {
          return [newEntry];
        }
      });
    },
    onSettled: async () => {
      await utils.predator.getMessages.invalidate();
    },
  });

  return status === "authenticated" ? (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        postMessage.mutate({
          name: sessionData.user?.name as string,
          message,
        });
        setMessage("");
      }}
    >
      <input
        type="text"
        className="rounded-md border-2 border-zinc-400 bg-neutral-900 px-4 py-2 focus:outline-none"
        placeholder="Your message..."
        minLength={2}
        maxLength={200}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-md border-2 border-zinc-500 bg-green-700 p-2 focus:outline-none"
      >
        Submit
      </button>
    </form>
  ) : null;
};
