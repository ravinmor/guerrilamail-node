import { Request, Response } from "express";
import GuerrilaMailApi from "../services/GuerrilaMailService";

export class homeController {
  async homeFunction(request: Request, response: Response) {
    const gm = new GuerrilaMailApi();

    const email1 = await gm.get_email_address();
    const email2 = await gm.get_email_address();
    const email3 = await gm.get_email_address();
    const email4 = await gm.get_email_address();

    console.log(email1);
    console.log(email2);
    console.log(email3);
    console.log(email4);
    return response.json(email1);
  }
}
