import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import TodoRoutes from "./routes/todos";

const app = express();
app.use(json());
app.use("/todos", TodoRoutes);
// Error handling MidW
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.json({ message: err.message });
});

app.listen(5000);
