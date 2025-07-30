import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

const updateTask = async (task) => {
  const token = Cookies.get("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}tasks`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export function useUpdateTask() {
  return useMutation({
    mutationFn: updateTask,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log("Error creating task", error);
    },
  });
}
