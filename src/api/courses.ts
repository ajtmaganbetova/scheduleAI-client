// // pages/api/courses.ts
// import type { NextApiRequest, NextApiResponse } from "next";

// const handler = (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { courseAbbr, semester } = req.body;
//     // Implement logic to fetch schedule based on courseAbbr and semester
//     const schedule = fetchSchedule(courseAbbr, semester); // Example function

//     // Return schedule data
//     res.status(200).json(schedule);
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default handler;
