import { Message } from "../models/message.model.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(200);
    return res.status(200).json({ message: "Messages fetched successfully", messages });
  } catch (err) {
    console.error("Error Fetching Messages: ", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
