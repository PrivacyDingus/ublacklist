import { SEARCH_ENGINES } from "../../common/search-engines.ts";
import type { SearchEngine, SerpHandler } from "../types.ts";
// I am unsure of if we need hasDarkBackground 
import { handleSerp, hasDarkBackground } from "./helpers.ts";

function getSerpHandler(): SerpHandler {
  return handleSerp({
    globalStyle: {
      '[data-ub-blocked="visible"]': {
        backgroundColor:
          "var(--ub-block-color, rgba(255, 192, 192, 0.5)) !important",
      },
      ".ub-button": {
        color: "var(--ub-link-color, rgb(0, 100, 77))",
      },
      ".ub-button:hover": {
        textDecoration: "underline",
      },
    },
    controlHandlers: [
      {
        target: "body",
        position: "afterbegin",
        style: {
          display: "block",
          fontSize: "13px",
          padding: "9px 20px",
          textAlign: "right",
        },
      },
    ],
    entryHandlers: [
      {
        target: ".r*",
        url: "ob",
        title: "title",
        actionTarget: (root) => root.querySelector(".result__body") || root,
        actionStyle: {
          display: "block",
          fontSize: "13px",
          order: 1,
          paddingTop: "5px",
        },
      },
    ],
    pageProps: {
      $site: "mojeek",
      $category: "web",
    },
    getDialogTheme: () => {
      const layout = document.querySelector<HTMLElement>(".layout");
      return layout && hasDarkBackground(layout) ? "dark" : "light";
    },
  });
}

export const mojeek: Readonly<SearchEngine> = {
  ...SEARCH_ENGINES.mojeek,
  getSerpHandler,
};
