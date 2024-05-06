import "../src/styles/global.scss";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "",
        order: [
          "Part1",
          ["AccordionGroup", "Loader", "Notification", "Tab", "Toggle"],
          "Part2",
          [
            "Carousel",
            "Dialog",
            "MenuBar",
            "SelectMenu",
            "Slider",
            "SpinButton",
          ],
        ],
        locales: "",
      },
    },
  },
};

export default preview;
