import fs from "fs";
import path from "path";
import CertsClient from "@/components/CertsClient";

export const metadata = {
  title: "Certifications | Minimalist Cyber-Research",
  description: "Professional certifications across offensive security, cloud infrastructure, AI, and threat intelligence.",
};

export default async function CertsPage() {
  const filePath = path.join(process.cwd(), "content", "certs.json");
  const certsData = fs.readFileSync(filePath, "utf-8");
  const certs = JSON.parse(certsData);

  return (
    <CertsClient certs={certs} />
  );
}
