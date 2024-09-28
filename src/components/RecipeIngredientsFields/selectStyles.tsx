export const selectIngredient = {
  valueContainer: (baseStyles:any, state:any) => ({
    ...baseStyles,

    ":hover": {
      cursor: "text",
    },
  }),
  container: (baseStyles:any) => ({
    ...baseStyles,
    flex: "1 1 0%",
    marginRight: "14px",
  }),
  indicatorsContainer: (baseStyles:any, state:any) => ({
    ...baseStyles,

    ":hover": {
      cursor: "pointer",
    },
  }),
  singleValue: (baseStyles:any) => ({
    ...baseStyles,
    color: `"#23262A"`,
    fontWeight: "normal",
  }),
  control: (baseStyles:any, state:any) => ({
    ...baseStyles,
    backgroundColor: "#d9d9d94f",
    borderRadius: "6px",
    border: "none",

    boxShadow: state.isFocused && "0 0 0 1px transparent",
    fontFamily: "inherit",
    fontStyle: "inherit",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "1.5",
    letterSpacing: "-0.02em",
    textAlign: "left",
    width: "100%",
    height: "50px",
    "@media (min-width: 768px)": {
      fontSize: "16px",
      lineHeight: "1.3",
      
    },
  }),

  menuList: (baseStyles:any, state:any) => ({
    ...baseStyles,
    fontFamily: "inherit",
    fontStyle: "inherit",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "1.5",
    textAlign: "left",
    letterSpacing: "-0.02em",
    maxHeight: "200px",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "rgba(255,255,255,0.5)",
    scrollbarWidth: "thin",
    scrollbarColor: "#E7E5E5 transparent",

    "@media (min-width: 768px)": {
      fontSize: "16px",
      lineHeight: "1.3",
      maxHeight: "230px",
    },
  }),
  placeholder: (baseStyles:any, state:any) => ({
    ...baseStyles,
    color: "#00000085",
    fontSize: "14px",
  }),
  option: (baseStyles:any, state:any) => ({
    ...baseStyles,
    color: state.isSelected
      ? state.isFocused
        ? "black"
        : "#8BAA36"
      : "#000000",
    backgroundColor: state.isFocused ? "#8BAA36" : "transparent",
  }),
  dropdownIndicator: (baseStyles:any) => ({
    ...baseStyles,
    color: "#8BAA36",
    opacity: 1,
    ":hover": {
      color: "#8BAA36",
    },
  }),
  indicatorSeparator: (baseStyles:any) => ({
    ...baseStyles,
    opacity: 0,
  }),
  menu: (baseStyles:any) => ({
    ...baseStyles,
    margin: 0,
  }),
};

export const selectUnit = {
  valueContainer: (baseStyles:any, state:any) => ({
    ...baseStyles,

    ":hover": {
      cursor: "text",
    },
  }),

  indicatorsContainer: (baseStyles:any, state:any) => ({
    ...baseStyles,

    ":hover": {
      cursor: "pointer",
    },
  }),
  singleValue: (baseStyles:any) => ({
    ...baseStyles,
    color: "#23262A",
    fontWeight: "normal",
  }),
  control: (baseStyles:any, state:any) => ({
    ...baseStyles,
    backgroundColor: "transparent",
    borderRadius: "6px",
    border: "none",

    boxShadow: state.isFocused && "0 0 0 1px transparent",
    fontFamily: "inherit",
    fontStyle: "inherit",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "1.5",
    letterSpacing: "-0.02em",
    textAlign: "left",
    width: "100%",
    height: "50px",
    "@media (min-width: 768px)": {
      fontSize: "16px",
      lineHeight: "1.3",
      
    },
  }),

  menuList: (baseStyles:any, state:any) => ({
    ...baseStyles,
    fontFamily: "inherit",
    fontStyle: "inherit",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "1.5",
    textAlign: "left",
    letterSpacing: "-0.02em",
    maxHeight: "200px",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "rgba(255,255,255,0.5)",
    scrollbarWidth: "thin",
    scrollbarColor: "#E7E5E5 transparent",

    "@media (min-width: 768px)": {
      fontSize: "16px",
      lineHeight: "1.3",
      maxHeight: "230px",
    },
  }),
  placeholder: (baseStyles:any, state:any) => ({
    ...baseStyles,
    color: "#00000085",
    fontSize: "14px",
  }),
  option: (baseStyles:any, state:any) => ({
    ...baseStyles,
    color: state.isSelected
      ? state.isFocused
        ? "black"
        : "#8BAA36"
      : "#000000",
    backgroundColor: state.isFocused ? "#8BAA36" : "transparent",
  }),
  dropdownIndicator: (baseStyles:any) => ({
    ...baseStyles,
    color: "#8BAA36",
    opacity: 1,
    ":hover": {
      color: "#8BAA36",
    },
  }),
  indicatorSeparator: (baseStyles:any) => ({
    ...baseStyles,
    opacity: 0,
  }),
  menu: (baseStyles:any) => ({
    ...baseStyles,
    margin: 0,
  }),
};
