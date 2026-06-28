import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router-dom";
import { MapPinIcon } from "lucide-react";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Friends</h1>

        <Link to="/" className="btn btn-outline btn-sm">
          Back Home
        </Link>
      </div>

      {/* LOADING */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <div className="text-center p-10 bg-base-200 rounded-xl">
          <h2 className="text-lg font-semibold">No friends yet</h2>
          <p className="opacity-70">Start sending friend requests!</p>
        </div>
      ) : (
        /* FRIENDS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="card bg-base-200 p-4 space-y-3 shadow-md"
            >
              {/* PROFILE */}
              <div className="flex items-center gap-3">
                <img
                  src={friend.profilePic}
                  alt={friend.fullName}
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <h3 className="font-semibold">{friend.fullName}</h3>

                  {friend.location && (
                    <div className="flex items-center text-xs opacity-70">
                      <MapPinIcon className="size-3 mr-1" />
                      {friend.location}
                    </div>
                  )}
                </div>
              </div>

              {/* LANGUAGES */}
              <div className="text-sm opacity-80 space-y-1">
                <p>Native: {friend.nativeLanguage}</p>
                <p>Learning: {friend.learningLanguage}</p>
              </div>

              {/* ACTION */}
              <button className="btn btn-sm btn-primary w-full">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;