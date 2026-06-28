import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const { data } = await axiosInstance.post("/auth/signup", signupData);
  return data;
};

export const login = async (loginData) => {
  const { data } = await axiosInstance.post("/auth/login", loginData);
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};

export const getAuthUser = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
  } catch (error) {
    console.error("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const { data } = await axiosInstance.post("/auth/onboarding", userData);
  return data;
};

export const getUserFriends = async () => {
  const { data } = await axiosInstance.get("/users/friends");
  return data ?? [];
};

export const getRecommendedUsers = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

export const getOutgoingFriendReqs = async () => {
  const { data } = await axiosInstance.get(
    "/users/outgoing-friend-requests"
  );

  return data?.outgoingFriendReqs ?? [];
};

export const sendFriendRequest = async (userId) => {
  const { data } = await axiosInstance.post(
    `/users/friend-request/${userId}`
  );
  return data;
};

export const getFriendRequests = async () => {
  const { data } = await axiosInstance.get("/users/friend-requests");
  return data;
};

export const acceptFriendRequest = async (requestId) => {
  const { data } = await axiosInstance.put(
    `/users/friend-request/${requestId}/accept`
  );
  return data;
};

export const getStreamToken = async () => {
  const { data } = await axiosInstance.get("/chat/token");
  return data;
};