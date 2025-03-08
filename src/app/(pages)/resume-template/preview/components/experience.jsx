import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function Experience({ data }) {
  if (!data.experience || !data.experience.length) {
    return null;
  }

  return (
    <section id="experience" className="container py-12 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
      <div className="grid gap-4">
        {data.experience.map((exp, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {exp.company || "Company"}
                  </h3>
                  {exp.title && (
                    <p className="text-muted-foreground">{exp.title}</p>
                  )}
                  {exp.location && (
                    <p className="text-sm text-muted-foreground">
                      {exp.location}
                    </p>
                  )}
                </div>
                {(exp.start || exp.end) && (
                  <p className="text-sm text-muted-foreground">
                    {exp.start || ""}
                    {exp.start && exp.end ? " - " : ""}
                    {exp.end || "Present"}
                  </p>
                )}
              </div>
            </CardHeader>
            {exp.description && exp.description.length > 0 && (
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {exp.description.map((desc, j) => (
                    <li key={j} className="text-muted-foreground">
                      {desc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
