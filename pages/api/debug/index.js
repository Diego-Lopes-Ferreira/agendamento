import prisma from "prisma/theClient";

export default async function handler(req, res) {
  if (req.method != "GET")
    res.status(400).json({ error: "This is a GET route" });

  const sqlResult = await prisma.user.findMany();

  res.json(sqlResult);
}
