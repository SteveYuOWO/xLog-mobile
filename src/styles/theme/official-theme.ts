import { defineTheme } from "./utils";

export default defineTheme(
  "official",
  [
    {
      mode: "light",
      token: theme => ({
        ...theme,
        primary: "#F97316",
        background: "#F9FAFB",
        backgroundStrong: "#FFFFFF",
        backgroundHover: "#F2F2F3",
        backgroundPress: "#EDEEF0",
        backgroundFocus: "#DCE0E5",
        backgroundTransparent: "rgba(255, 255, 255, 0.5)",
        borderColor: "#D3D6DB",
        borderColorHover: "#C5C8CE",
        borderColorPress: "#B6B9BE",
        borderColorFocus: "#A5A8AF",
        color: "#1A1A1B",
        colorHover: "#171718",
        colorPress: "#0F0F10",
        colorFocus: "#0F0F10",
        colorSubtitle: "#3C3C3D",
        colorDescription: "#5C5C5D",
        colorHint: "#7C7C7D",
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowColorHover: "rgba(0, 0, 0, 0.3)",
        shadowColorPress: "rgba(0, 0, 0, 0.4)",
        shadowColorFocus: "rgba(0, 0, 0, 0.4)",
      }),
    },
    {
      mode: "dark",
      token: theme => ({
        ...theme,
        primary: "#F97316",
        background: "#1C1C1E",
        backgroundStrong: "#2C2C2E",
        backgroundHover: "#313133",
        backgroundPress: "#37373A",
        backgroundFocus: "#444446",
        backgroundTransparent: "rgba(42, 42, 43, 0.5)",
        borderColor: "#2C2C2E",
        borderColorHover: "#3A3A3C",
        borderColorPress: "#47474A",
        borderColorFocus: "#57575A",
        color: "#F9FAFB",
        colorHover: "#FFFFFF",
        colorPress: "#E8E8E9",
        colorFocus: "#E8E8E9",
        colorSubtitle: "#8F8F92",
        colorDescription: "#6B6B6D",
        colorHint: "#474749",
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowColorHover: "rgba(255, 255, 255, 0.1)",
        shadowColorPress: "rgba(255, 255, 255, 0.2)",
        shadowColorFocus: "rgba(255, 255, 255, 0.2)",
      }),
    },
  ]);
