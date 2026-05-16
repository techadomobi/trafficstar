export const setPageMeta = (title: string, description: string) => {
  if (typeof document === "undefined") return;
  document.title = title;
  const setMeta = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement("meta");
      if (selector.includes("property")) el.setAttribute("property", attr);
      else el.setAttribute("name", attr);
      document.head.appendChild(el);
    }
    el.content = value;
  };
  setMeta('meta[name="description"]', "description", description);
  setMeta('meta[property="og:description"]', "og:description", description);
  setMeta('meta[name="twitter:description"]', "twitter:description", description);
  setMeta('meta[property="og:title"]', "og:title", title);
  setMeta('meta[name="twitter:title"]', "twitter:title", title);
};
