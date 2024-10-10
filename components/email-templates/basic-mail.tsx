import * as React from "react";

interface EmailTemplateProps {
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  message,
}) => (
  <div>
    <p className="text-lg font-bold text-red-500">Your email is {email}</p>
    <p className="text-lg font-bold">Your message is {message}</p>
  </div>
);
