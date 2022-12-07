import prisma from "prisma/theClient";

export default async function handler(req, res) {
  let [status, resp] = await createUser(req.body);

  res.status(status).json(resp);
}

async function createUser(body) {
  const { email, password, name, ra } = body;
  console.log(email);
  let sqlResult = {};
  try {
    sqlResult = await prisma.user.create({
      data: {
        email: email,
        password: password,
        name: name,
        ra: ra,
      },
    });
  } catch (err) {
    console.warn(err);
  }
  if (sqlResult.email) {
    return [200, { message: "created user" }];
  }
  return [400, { message: "User not created" }];
}
