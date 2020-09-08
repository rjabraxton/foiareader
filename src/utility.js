import { contacts } from "./conversations/contacts.json";

export const getAbbrName = (num) => {
  if (contacts[num]) {
    return contacts[num].abbr;
  } else {
    return num;
  }
};

export const getFullName = (num) => {
  if (contacts[num]) {
    return contacts[num].name === "Unknown"
      ? contacts[num].abbr
      : contacts[num].name;
  } else {
    return num;
  }
};
