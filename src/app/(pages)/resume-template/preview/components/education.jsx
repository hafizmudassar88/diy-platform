import { Card, CardHeader } from "@/components/ui/card";

export function Education({ data }) {
  if (!data.education || !data.education.length) {
    return null;
  }

  return (
    <section id="education" className="container py-12 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Education</h2>
      <div className="grid gap-4">
        {data.education.map((edu, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {edu.school || "School/University"}
                  </h3>
                  {(edu.degree || edu.field) && (
                    <p className="text-muted-foreground">
                      {edu.degree}
                      {edu.degree && edu.field ? ` in ${edu.field}` : edu.field}
                    </p>
                  )}
                </div>
                {(edu.start || edu.end) && (
                  <p className="text-sm text-muted-foreground">
                    {edu.start || ""}
                    {edu.start && edu.end ? " - " : ""}
                    {edu.end || "Present"}
                  </p>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
