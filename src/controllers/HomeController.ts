import { Request, Response } from "express";
import GuerrilaMailApi from "../services/GuerrilaMailService";

export class homeController {
  async homeFunction(request: Request, response: Response) {
    const email1 = new GuerrilaMailApi();

    await email1.get_email_address();

    return response.json(email1);
  }
}
