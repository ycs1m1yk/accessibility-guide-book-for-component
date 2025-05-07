import "../src/styles/global.scss";
import "./storybook.scss";

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
          "스크린 리더 사용법",
          "Part1",
          ["Accordion", "Loader", "Notification", "Tab", "Toggle"],
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
