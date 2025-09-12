import type { User, Bookmark } from "./response_models";

export const users: User[] = [
  { id: 101, email: "admin@example.com", username: "admin", password: "admin" },
  {
    id: 102,
    email: "manager@example.com",
    username: "manager",
    password: "manager",
  },
  { id: 103, email: "user3@example.com", username: "user3", password: "user3" },
];
export const bookmarks: Bookmark[] = [
  { id: 1, userId: 101, name: "Google", url: "https://www.google.com" },
  { id: 2, userId: 102, name: "Apple", url: "https://www.apple.com" },
  { id: 3, userId: 101, name: "Microsoft", url: "https://www.microsoft.com" },
  { id: 4, userId: 103, name: "Amazon", url: "https://www.amazon.com" },
  { id: 5, userId: 102, name: "Meta", url: "https://about.facebook.com/meta" },
  { id: 6, userId: 104, name: "NVIDIA", url: "https://www.nvidia.com" },
  { id: 7, userId: 105, name: "Tesla", url: "https://www.tesla.com" },
  { id: 8, userId: 106, name: "Netflix", url: "https://www.netflix.com" },
  { id: 9, userId: 101, name: "Adobe", url: "https://www.adobe.com" },
  { id: 10, userId: 107, name: "Intel", url: "https://www.intel.com" },
];
