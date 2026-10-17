import type { Metadata } from "next";
import ResearchMap from "@/components/custom/ResearchMap";
export const metadata: Metadata = {
 title: "Interactive Research Map",
 description: "Nine linked research questions connecting causal decisions, cooperative intelligence, and heterogeneous networks.",
};
export default function ResearchMapPage() { return <ResearchMap />; }
