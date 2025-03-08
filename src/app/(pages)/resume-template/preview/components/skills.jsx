import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Skills({ data }) {
  if (!data.skills || !data.skills.length) {
    return null;
  }

  return (
    <section id="skills" className="container py-12 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.skills.map((category, i) => (
          <Card key={i}>
            <CardHeader>
              <h3 className="font-semibold">{category.category || "Skills"}</h3>
            </CardHeader>
            {category.items && category.items.length > 0 && (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, j) => (
                    <Badge key={j} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
