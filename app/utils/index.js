"use strict";
import Mailgun from "mailgun-js";

const mailgun = Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
  
  export function sendMail({
    from = process.env.EMAIL_SENDER,
    to,
    subject,
    message,
    template = undefined,
    variables = {},
  }) {
    return new Promise((ful, rej) => {
      const payload = { from, to, subject };
      if (template) {
        payload.template = template;
        for (let variable in variables)
          payload[`v:${variable}`] = variables[variable];
      } else {
        payload.html = message;
      }
  
      mailgun.messages().send(payload, (err, body) => {
        if (err) {
          console.log("============email error===========");
          console.log(err);
          console.log("============email error===========");
          rej(new Error("Mail sending failed"));
        }
        ful(true);
      });
    });
  }
  export function fileUpload() {
    return async (req, res) => {
      try {
        req.pipe(request(process.env.FILE_MANAGER_URL)).pipe(res);
      } catch (err) {
        res.status(err.httpStatusCode || 500).json(errorMessage(err));
      }
    };
  }
  
  export async function removeFile(data) {
    try {
      await getContent({
        url: process.env.FILE_MANAGER_URL,
        method: "DELETE",
        data,
      });
    } catch (err) {
      throw err;
    }
  }
  
  export const fileManager = {
    remove: async (fileUrl) => {
      if (!fileUrl) return;
      await getContent({
        url: process.env.FILE_MANAGER_URL,
        method: "DELETE",
        data: { fileUrl, throwError: false },
      });
    },
  
    exists: async () =>
      await postContent({
        url: process.env.FILE_MANAGER_URL + "/exists",
        data: { fileUrl },
      }),
  
    url: (relativeUrl) => {
      if (!relativeUrl) return "";
  
      const urlToken = relativeUrl.split("://");
      if (urlToken.length > 1) return relativeUrl;
  
      const [prefix] = relativeUrl.split("-");
      let baseUrl = process.env.FILE_MANAGER_MEDIA_URL + "/";
      if (prefix === "s3") baseUrl = process.env.AWS_S3_BASE_URL + "/";
      return baseUrl + relativeUrl;
    },
  };
  