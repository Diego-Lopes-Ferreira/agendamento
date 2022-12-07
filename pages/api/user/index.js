import prisma from "prisma/theClient";

export default async function handler(req, res) {
  let resp = {};
  let status = 200;

  if (req.method == "PUT") resp = await updateUser(req.body);
  else if (req.method == "DELETE") resp = await deleteUser(req.body);
  else {
    res.status(400);
    resp = { error: "Only PUT POST or DELETE" };
  }

  res.status(status);
  res.json(resp);
}

async function updateUser(body) {
  const sqlResult = await prisma.user.update({
    where: {
      email: body.email,
    },
    data: {
      ...body,
    },
  });
  return sqlResult;
}

async function deleteUser(body) {
  const sqlResult = await prisma.user.delete({
    where: {
      email: body.email,
    },
  });
  return sqlResult;
}

export const config = {
  api: {
    bodyParser: true,
  },
};
