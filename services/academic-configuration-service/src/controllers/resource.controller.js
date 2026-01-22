import { Resource } from "../models/resource.model.js";

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();

    return res
      .status(200)
      .json({ message: "Fetched all preparation resources", resources });
  } catch (err) {
    console.error("Error Fetching Resources:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch preparation resources" });
  }
};

export const getResourcesByProgram = async (req, res) => {
  try {
    const { program } = req.query;

    if (!program) {
      return res.status(400).json({ message: "Program is required" });
    }

    const resources = await Resource.find({ program });

    return res.status(200).json({
      message: "Fetched preparation resources",
      resources,
    });
  } catch (err) {
    console.error("Error Fetching Resources:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch preparation resources" });
  }
};
export const createResource = async (req, res) => {
  try {
    const { title, url, program } = req.body;

    if (!title || !url || !program) {
      return res
        .status(400)
        .json({ message: "Title, URL, and Program are required" });
    }

    const resource = await Resource.create({ title, url, program });

    return res
      .status(201)
      .json({ message: "Resource created successfully", resource });
  } catch (err) {
    console.error("Error Creating Resource:", err);
    return res.status(500).json({ message: "Failed to create resource" });
  }
};

export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedResource = await Resource.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    return res
      .status(200)
      .json({ message: "Resource updated successfully", updatedResource });
  } catch (err) {
    console.error("Error Updating Resource:", err);
    return res.status(500).json({ message: "Failed to update resource" });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Resource.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Resource not found" });
    }

    return res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    console.error("Error Deleting Resource:", err);
    return res.status(500).json({ message: "Failed to delete resource" });
  }
};
