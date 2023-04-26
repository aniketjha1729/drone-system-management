exports.singUp = async (req: any, res: any) => {
  const { name, email, password } = req.body;
  res.send({ name: name, email: email, password: password });
};
