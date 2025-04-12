import { v4 as uuidv4 } from "uuid";

const uncategorizedCategoryDefault = {
  primary: {
    id: "1",
    name: "Uncategorized",
    level: "primary",
    childs: 1,
    parentId: null,
    parentNodeId: null,
  },
  secondary: {
    id: "2",
    name: "Uncategorized",
    level: "secondary",
    childs: 1,
    parentId: "1",
    parentNodeId: "1",
  },
  tertiary: {
    id: "3",
    name: "Uncategorized",
    level: "tertiary",
    childs: null,
    parentId: "2",
    parentNodeId: "1",
  },
};

const defaultConfigStore = {
  storeConfigName: "Default",
  id: uuidv4(),
  colors: {
    // primaryColorStore: "#1877f2",
    primaryColorStore: "#084c61",
    secondaryColorStore: "#2B2D38",
    tertiaryColorStore: "#23252F",
  },
  footerConfig: {
    colors: {
      primaryColorFooter: "#000000",
    },
    social: {
      instagram: "https://www.instagram.com",
      facebook: "https://www.facebook.com",
      gmail: "test@test.com",
      whatsapp: "5492966605314",
      storeAddress: "Argentina - Buenos Aires - Av Siempre Viva 678",
    },
  },
  logoConfig: {
    logoUrl: "no-url",
  },
};

const defaultLogoDetails = {
  filename: "logolegacy.webp",
};

export { uncategorizedCategoryDefault, defaultConfigStore, defaultLogoDetails };
