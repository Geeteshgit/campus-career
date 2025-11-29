import { Request, Response } from "express";
import { Program } from "../models/academic.model.js";

export const getPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await Program.find();

    return res.status(200).json({
      message: "Fetched all programs",
      programs,
    });
  } catch (err) {
    console.error("Error Fetching Programs:", err);
    return res.status(500).json({ message: "Failed to fetch programs" });
  }
};

export const createProgram = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ message: "Program name is required" });

    const program = await Program.create({ name });

    return res.status(201).json({
      message: "Program created successfully",
      program,
    });
  } catch (err) {
    console.error("Error Creating Program:", err);
    return res.status(500).json({ message: "Failed to create program" });
  }
};

export const updateProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProgram = await Program.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedProgram)
      return res.status(404).json({ message: "Program not found" });

    return res.status(200).json({
      message: "Program updated successfully",
      updatedProgram,
    });
  } catch (err) {
    console.error("Error Updating Program:", err);
    return res.status(500).json({ message: "Failed to update program" });
  }
};

export const deleteProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Program.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ message: "Program not found" });

    return res.status(200).json({
      message: "Program deleted successfully",
    });
  } catch (err) {
    console.error("Error Deleting Program:", err);
    return res.status(500).json({ message: "Failed to delete program" });
  }
};