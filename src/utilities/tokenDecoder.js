import jwt from "jsonwebtoken";

export default async (token) => {
  try {
    let { header } = jwt.decode(token, { complete: true });
    return header;
  } catch (e) {
    console.log(e);
  }
};
