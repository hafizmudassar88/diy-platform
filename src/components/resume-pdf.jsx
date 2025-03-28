"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
    marginLeft: 15,
  },
});

// Create Document Component
const ResumePDF = ({ data }) => {
  console.log("data.profileImage", data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Profile Picture */}
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            src={
              data.profileImage
                ? data.profileImage
                : "https://images.unsplash.com/photo-1507679799987-c73779587ccf"
            }
          />
          <View style={styles.headerText}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.text}>
              {data.email} | {data.phone}
            </Text>
            <Text style={styles.text}>{data?.location}</Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.title}>About</Text>
          <Text style={styles.text}>{data.about}</Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.title}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.section}>
              <Text style={styles.text}>{edu.school}</Text>
              <Text style={styles.text}>
                {edu.degree} in {edu.field}
              </Text>
              <Text style={styles.text}>
                {edu.start} - {edu.end}
              </Text>
            </View>
          ))}
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.title}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.section}>
              <Text style={styles.text}>
                {exp.company} - {exp.title}
              </Text>
              <Text style={styles.text}>
                {exp?.location} | {exp.start} - {exp.end}
              </Text>
              {exp.description.map((desc, j) => (
                <Text key={j} style={styles.listItem}>
                  • {desc}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.title}>Skills</Text>
          {data.skills.map((skill, i) => (
            <View key={i}>
              <Text style={styles.text}>{skill.category}:</Text>
              <Text style={styles.text}>{skill.items.join(", ")}</Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.title}>Projects</Text>
          {data.projects.map((project, i) => (
            <View key={i}>
              <Text style={styles.text}>{project.name}</Text>
              <Text style={styles.text}>{project.description}</Text>
              <Text style={styles.text}>
                Technologies: {project.technologies.join(", ")}
              </Text>
              {project.link && (
                <Text style={styles.text}>Link: {project.link}</Text>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default function DownloadResumeButton({ data }) {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <PDFDownloadLink
      document={<ResumePDF data={data} />}
      fileName={`${data.name.toLowerCase().replace(/\s+/g, "-")}-resume.pdf`}
    >
      {({ loading }) => (
        <Button variant="outline" disabled={loading}>
          <FileDown className="h-4 w-4 mr-2" />
          {loading ? "Generating PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
