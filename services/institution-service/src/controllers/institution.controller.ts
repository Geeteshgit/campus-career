import { Request, Response } from "express"
import { Institution } from "../models/institution.model.js";

export const getAllInstitutions =  async (req: Request, res: Response) => {
    try {
        const institutions = await Institution.find();
        return res.status(200).json({ message: "Institutions fetched successfully", institutions });
    } catch (err) {
        console.error("Error Fetching Institutions: ", err);
        return res.status(500).json({ message: "Failed to fetch institutions" });
    }
}

export const getInstitutionById = async (req: Request, res: Response) => {
    try {
        const { institutionId } = req.params;
        const institution = await Institution.findById(institutionId);
        if(!institution) {
            return res.status(404).json({ message: "Institution not found" });
        }
        return res.status(200).json({ message: "Institution fetched successfully", institution });
    } catch (err) {
        console.error("Error Fetching Institution: ", err);
        return res.status(500).json({ message: "Failed to fetch institution" });
    }
}

export const deleteInstitution = async (req: Request, res: Response) => {
    try {
        const { institutionId } = req.params;
        const institution = await Institution.findByIdAndDelete(institutionId);
        if(!institution) {
            return res.status(404).json({ message: "Institution not found" });
        }
        return res.status(200).json({ message: "Institution deleted successfully", institution });
    } catch (err) {
        console.error("Error Deleting Institution: ", err);
        return res.status(500).json({ message: "Failed to delete institution" });
    }
}