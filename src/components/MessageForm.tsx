import { type FC, useState } from "react";
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
};
