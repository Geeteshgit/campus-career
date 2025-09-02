import express, { Request, Response } from "express";

const app = express();
const PORT: number = 3000;

app.get("/", (req: Request, res: Response) => {
    return res.send("Server running");
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});