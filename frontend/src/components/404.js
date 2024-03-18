import React from "react";

const styles = {
  root: {
    paddingTop: "80px",
    paddingBottom: "80px",
  },
  inner: {
    position: "relative",
  },
  image: {
    position: "absolute",
    inset: 0,
    opacity: 0.75,
    color:
      "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))",
  },
  content: {
    paddingTop: "220px",
    position: "relative",
    zIndex: 1,
    "@media (max-width: $mantine-breakpoint-sm)": {
      paddingTop: "120px",
    },
  },
  title: {
    fontFamily: "Greycliff CF, var(--mantine-font-family)",
    textAlign: "center",
    fontWeight: 900,
    fontSize: "38px",
    "@media (max-width: $mantine-breakpoint-sm)": {
      fontSize: "32px",
    },
  },
  description: {
    maxWidth: "540px",
    margin: "auto",
    marginTop: "var(--mantine-spacing-xl)",
    marginBottom: "calc(var(--mantine-spacing-xl) * 1.5)",
  },
};

const PageNotFound = () => {
  return (
    <div style={styles.root}>
      <div style={styles.inner}>
        <div style={styles.image}></div>
        <div style={styles.content}>
          <h1 style={styles.title}>Nothing to see here</h1>
          <p style={styles.description}>
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. Go to Homepage
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
