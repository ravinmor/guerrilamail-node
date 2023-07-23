import { Request, Response } from "express";
import GuerrilaMailApi from "../services/GuerrilaMailService";

export class homeController {
  async homeFunction(request: Request, response: Response) {

    const gm = new GuerrilaMailApi();

    const emailData = await gm.get_email_address();

    console.log(emailData);
    return response.json(emailData);
  }
}
