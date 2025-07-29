import brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

const apiKey = apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

export default apiInstance;
