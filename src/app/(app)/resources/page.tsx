
import { BookHeart, LifeBuoy, Globe } from 'lucide-react';
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
import AppHeader from '@/components/layout/app-header';

const europeResources = {
  organizations: [
    { title: 'Mental Health Europe', description: 'Advocates for positive mental health and well-being across Europe.', url: 'https://www.mhe-sme.org/' },
    { title: 'Stichting MIND', description: 'A prominent mental health charity in the Netherlands, offering support and information.', url: 'https://mindblue.nl/' },
    { title: 'Mind (UK)', description: 'A UK non-profit focused on mental health support and suicide prevention.', url: 'https://www.mind.org.uk/' },
    { title: 'Befrienders Worldwide', description: 'A global network of emotional support centers, with members in most European countries.', url: 'https://www.befrienders.org/' },
  ],
  articles: [
    { title: 'Student Mental Health: Where to Get Help', url: 'https://www.savethestudent.org/mental-health/student-mental-health-university-help.html', source: 'Save the Student' },
    { title: 'How to Look After Your Mental Health at University', url: 'https://www.topuniversities.com/student-info/health-and-support/how-look-after-your-mental-health-university', source: 'Top Universities' },
  ],
};

const northAfricaResources = {
  organizations: [
    { title: 'Embrace', description: 'A leading mental health organization in Lebanon, running a national emotional support and suicide prevention helpline.', url: 'https://embracelebanon.org/' },
    { title: 'Nafsiyat', description: 'An intercultural therapy centre accessible to diverse communities, including those from North Africa.', url: 'https://www.nafsiyat.org.uk/' },
    { title: 'Project Masam', description: 'An initiative providing mental health support to communities affected by conflict in the MENA region.', url: 'https://www.projectmasam.com/' },
  ],
   articles: [
    { title: 'Breaking the Stigma: Mental Health in the Arab World', url: 'https://www.nature.com/articles/d41586-022-01584-z', source: 'Nature' },
    { title: 'Navigating University Life in a New Country', url: 'https://www.internationalstudents.org/study-abroad-guide/first-year/', source: 'internationalstudents.org' },
  ],
};

export default function ResourcesPage() {
  return (
    <>
      <AppHeader title="Resources" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-headline">Mental Health Resources</h1>
          <p className="text-muted-foreground text-sm">
            A curated selection of resources to support your well-being.
          </p>
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
            <div className="space-y-6 mt-4">
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
              <div className="space-y-6 mt-4">
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
    </>
  );
}
