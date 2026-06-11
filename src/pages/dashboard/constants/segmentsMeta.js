// pages/dashboard/constants/segmentsMeta.js
import { createElement } from "react";

import { TbLayoutGrid, TbTool, TbFolder } from "react-icons/tb";

export const SEGMENTS_META = [
  {
    label: "Platform Tools",
    key: "platform",
    color: "#3b82f6",

    icon: createElement(TbLayoutGrid),
  },
  {
    label: "Custom Tools",
    key: "custom",
    color: "#a855f7",

    icon: createElement(TbTool),
  },
  {
    label: "Folders",
    key: "folders",
    color: "#10b981",

    icon: createElement(TbFolder),
  },
];
