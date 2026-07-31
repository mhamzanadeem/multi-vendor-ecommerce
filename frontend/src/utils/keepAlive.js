import axios from "axios";
import { backend_url } from "../server";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";
const EXTRA_RENDER_URL =
  import.meta.env.VITE_RENDER_URL ||
  import.meta.env.VITE_HEALTHCHECK_URL ||
  "";

const keepAliveTargets = [
  `${backend_url}/test`,
  SOCKET_URL,
  EXTRA_RENDER_URL,
].filter(Boolean);

export const pingKeepAliveTargets = async () => {
  await Promise.allSettled(
    keepAliveTargets.map((url) =>
      axios.get(url, {
        withCredentials: true,
        timeout: 10000,
      })
    )
  );
};
