import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { TierIndex } from "@/app/pages/tiers";
import { TierDetail } from "@/app/pages/tier-detail";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    ctx;
  },
  render(Document, [
    route("/", Home),
    route("/tiers", TierIndex),
    route("/tiers/:slug", TierDetail),
  ]),
]);
