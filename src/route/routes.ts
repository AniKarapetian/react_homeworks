import ChatComponent from "../components/chat/Chat";
import { Home } from "../components/home/Home";
import Stream from "../components/stream/Stream";
import Todo from "../components/todo/Todos";
import { User } from "../components/user/Users";
import Weather from "../components/weather/Weather";
import { RouteType } from "../types/types";

export const routes: RouteType[] = [
  {
    type: "public",
    Component: Home,
    path: "/home",
    name: "Home",
  },
  {
    type: "private",
    Component: Todo,
    path: "/todo",
    name: "Todos",
  },
  {
    type: "private",
    Component: Stream,
    path: "/stream",
    name: "Stream",
  },
  {
    type: "public",
    Component: Weather,
    path: "/weather",
    name: "Weather",
  },
  {
    type: "private",
    Component: User,
    path: "/users",
    name: "Users",
  },
  {
    type: "private",
    Component: ChatComponent,
    path: "/chat",
    name: "Chat",
  }
];
