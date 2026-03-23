import PromptList from '../components/Prompts/PromptList';
import SEOMetadata from '../components/SEO/SEOMetadata';

const HomePage = ({ user, search, filter, setFilter, isMobile }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PromptKing",
    "url": "https://promptking.com/",
    "description": "Unlock the full potential of AI with PromptKing. Discover premium prompts for ChatGPT, Midjourney, and more.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://promptking.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <main>
      <SEOMetadata 
        title="PromptKing - The Ultimate AI Prompts Library" 
        schema={schema}
      />
      <PromptList 
        user={user} 
        search={search} 
        filter={filter} 
        setFilter={setFilter} 
        isMobile={isMobile}
      />
    </main>
  );
};

export default HomePage;
