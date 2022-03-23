export const getHeartBeat = (req, res) => {
  res.json({ heartbeat: "The API is rolling!", typeOfRequest: "GET" });
};

export const postHeartBeat = (req, res) => {
  res.json({ heartbeat: "The API is rolling!", typeOfRequest: "POST" });
};

export const putHeartBeat = (req, res) => {
  res.json({ heartbeat: "The API is rolling!", typeOfRequest: "PUT" });
};

export const deleteHeartBeat = (req, res) => {
  res.json({ heartbeat: "The API is rolling!", typeOfRequest: "DELETE" });
};

export const patchHeartBeat = (req, res) => {
  res.json({ heartbeat: "The API is rolling!", typeOfRequest: "PATCH" });
};
