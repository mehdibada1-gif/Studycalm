import { BookHeart, Clapperboard, LifeBuoy, Globe } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';


const europeResources = {
    organizations: [
      { title: 'Mental Health Europe', description: 'An umbrella organization representing mental health associations across Europe. Advocates for positive mental health and well-being.', url: '#' },
      { title: 'Stichting MIND', description: 'A prominent mental health charity in the Netherlands, offering support, information, and advocacy.', url: '#' },
      { title: 'Mind (Sweden)', description: 'A Swedish non-profit focused on mental health support and suicide prevention.', url: '#' },
      { title: 'Telefono Amico Italia', description: 'An Italian helpline offering emotional support to anyone in crisis or distress.', url: '#' },
    ],
    articles: [
      { title: 'Understanding the Healthcare System in the Netherlands', url: '#', source: 'Expat.com' },
      { title: 'Student Mental Health in Sweden: Where to Get Help', url: '#', source: 'Study in Sweden' },
    ],
};

const northAfricaResources = {
    organizations: [
      { title: 'Embrace', description: 'A leading mental health organization in Lebanon, running a national emotional support and suicide prevention helpline.', url: '#' },
      { title: 'Association Hadaf', description: 'A Moroccan association working to support individuals with mental health challenges and their families.', url: '#' },
      { title: 'Association Tunisienne pour la Promotion de la Santé Mentale', description: 'A Tunisian association for the promotion of mental health awareness and services.', url: '#' },
    ],
     articles: [
      { title: 'Breaking the Stigma: Mental Health in the Arab World', url: '#', source: 'Local News Outlet' },
      { title: 'Navigating University Life in Morocco', url: '#', source: 'Student Guide' },
    ],
};

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <BookHeart className="size-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Mental Health Resources</h1>
          <p className="text-muted-foreground">
            A curated selection of resources to support your well-being.
          </p>
        </div>
      </div>
      <Tabs defaultValue="europe" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="europe">
            <Globe className="mr-2 size-4" />
            Europe
          </TabsTrigger>
          <TabsTrigger value="north-africa">
            <Globe className="mr-2 size-4" />
            North Africa
          </TabsTrigger>
        </TabsList>
        <TabsContent value="europe">
          <div className="space-y-8 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy className="text-muted-foreground" />
                  Support Organizations
                </CardTitle>
                <CardDescription>Find professional help and community support in Europe.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {europeResources.organizations.map((item) => (
                    <li key={item.title}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">{item.title}</a>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookHeart className="text-muted-foreground" />
                  Helpful Articles
                </CardTitle>
                <CardDescription>Read up on tips and strategies for student well-being.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {europeResources.articles.map((item) => (
                    <li key={item.title}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">{item.title}</a>
                      <p className="text-sm text-muted-foreground">{item.source}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="north-africa">
            <div className="space-y-8 mt-4">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <LifeBuoy className="text-muted-foreground" />
                        Support Organizations
                        </CardTitle>
                        <CardDescription>Find professional help and community support in North Africa.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                        {northAfricaResources.organizations.map((item) => (
                            <li key={item.title}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">{item.title}</a>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <BookHeart className="text-muted-foreground" />
                    Helpful Articles
                    </CardTitle>
                    <CardDescription>Read up on tips and strategies for student well-being.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                    {northAfricaResources.articles.map((item) => (
                        <li key={item.title}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">{item.title}</a>
                        <p className="text-sm text-muted-foreground">{item.source}</p>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
