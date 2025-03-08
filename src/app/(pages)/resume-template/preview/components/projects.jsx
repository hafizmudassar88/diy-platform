import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function Projects({ data }) {
  if (!data.projects || !data.projects.length) {
    return null;
  }

  return (
    <section id="projects" className="container py-12 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {data.projects.map((project, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">
                  {project.name || "Project"}
                </h3>
                {project.link && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {project.description && (
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, j) => (
                    <Badge key={j} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
