export const uploadFiles = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.status(200).json({ message: "Files successfully uploaded" });
};
