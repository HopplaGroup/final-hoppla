import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const subject = "Info For Driver";

type HopplaMailTemplateProps = {
  previewMessage: string;
  mainMessage: string;
  secondaryMessage: string;
  buttonUrl?: string;
  buttonText?: string;
};

export const HopplaMailTemplate = ({
  previewMessage,
  mainMessage,
  secondaryMessage,
  buttonUrl = "https://hoppla.ge/",
  buttonText = "დაბრუნდი პლატფორმაზე",
}: HopplaMailTemplateProps) => (
  <Html>
    <Head />
    <Preview>{previewMessage}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={
              "https://cdn.discordapp.com/attachments/1188885218107604993/1289259481733136415/logo.png?ex=66f82bf5&is=66f6da75&hm=e85a27967fb7f6006e0540606b76508bdc6486ae2189f37c57f65387638ca0c6&"
            }
            width="75"
            height="27"
            alt="Hoppla"
          />
          <Hr style={hr} />
          <Text style={paragraph}>{mainMessage}</Text>
          <Text style={paragraph}>{secondaryMessage}</Text>
          <Button style={button} href={buttonUrl}>
            {buttonText}
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>—ჰოპლას გუნდი</Text>
          <Hr style={hr} />
          <Text style={footer}>
            დამატებითი კითხვების შემთხვევაში მოგვმართეთ სოციალურ ქსელების
            დახმარებით
            <a href="https://www.facebook.com/hoppla.ge"> Facebook</a> or
            <a href="https://www.instagram.com/hoppla.ge/"> Instagram</a>
          </Text>
          <Text style={footer}>© 2024 Hoppla Group </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default HopplaMailTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#e74f3c",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
