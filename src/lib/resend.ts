import { Resend } from "resend";

const resend = new Resend(Bun.env.RESEND_API_KEY);

export default resend;
