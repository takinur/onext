import { api } from "~/utils/api";


export const PredatorEntries = () => {
    const { data: predatorEntries, isLoading } =
      api.predator.getMessages.useQuery();
  
    if (isLoading) {
      return <p>Fetching Prey Motivations.</p>;
    }
  
    return (
      <div className="flex flex-col gap-4">
        {predatorEntries?.map((entry, index) => {
          return (
            <div key={index}>
              <p className="text-lg">{entry.message}</p>
              <span className="font-semibold">- {entry.name}</span>
            </div>
          );
        })}
      </div>
    );
  };
  