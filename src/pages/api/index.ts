import type { NextApiRequest, NextApiResponse } from "next";

const projects = [
  {
    id: "delta",
    name: "Delta",
    images: [],
  },
  {
    id: "fa",
    name: "FA",
    images: [],
  },
];

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(projects);
};
