export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function objToQueryParams(object = {}) {
  let query = Object.keys(object)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(object[k]))
    .join("&");
  return query;
}

export const getSystemLang = (language = "ko") => {
  if (language.startsWith("ko")) {
    language = "ko";
  } else if (language.startsWith("en")) {
    language = "en";
  } else return undefined;
  return lang[language];
};

export const lang = {
  en: "en",
  ko: "ko",
};

export const copyToClipboard = (text) => {
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = text;
  // tempTextarea.style.display = "none";
  document.body.appendChild(tempTextarea);

  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 9999);

  document.execCommand("copy");
  document.body.removeChild(tempTextarea);
};
