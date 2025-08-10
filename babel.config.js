module.exports = (api) => {
  // Ensure NODE_ENV is set
  process.env.NODE_ENV = process.env.NODE_ENV || "development";

  api.cache(true);

  const presets = ["react-app"];
  const plugins = [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@": "./src",
          "@components": "./src/components",
          "@layouts": "./src/layouts",
          "@pages": "./src/pages",
          "@routes": "./src/routes",
          "@contexts": "./src/contexts",
          "@theme": "./src/theme",
          "@utils": "./src/utils",
        },
      },
    ],
  ];

  return { presets, plugins };
};
