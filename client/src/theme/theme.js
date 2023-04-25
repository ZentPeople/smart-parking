//decide the color theme for entire website
export const themeSettings = () => {
  return {
    palette: {
      primary: {
        light: "#DA9FF9",
        main: "#B088F9",
        dark: "#7952B3",
        contrastText: "#000",
      },
      secondary: {
        light: "#BEDCFA",
        main: "#98ACF8",
        dark: "#94D0CC",
        contrastText: "#fff",
      },
      text: {
        primary: "#0A1931",
        secondary: "#777",
        disabled: "#999",
      },
      action: {
        light: "#82ff64",
        main: "#40ed2b",
        dark: "#00b900",
        contrastText: "#fff",
      },
    },
    typography: {
      color: "#505050",
      fontFamily: "Raleway, Arial",
      fontSize: 12,
      h1: {
        fontFamily: "Raleway, Arial",
        fontSize: 40,
      },
      h2: {
        fontFamily: "Raleway, Arial",
        fontSize: 32,
      },
      h3: {
        fontFamily: "Raleway, Arial",
        fontSize: 24,
      },
      h4: {
        fontFamily: "Raleway, Arial",
        fontSize: 20,
      },
      h5: {
        fontFamily: "Raleway, Arial",
        fontSize: 16,
      },
      h6: {
        fontFamily: "Raleway, Arial",
        fontSize: 14,
      },
    },
  };
};
