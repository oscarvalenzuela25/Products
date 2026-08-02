import { getSecret } from "astro:env/server";
import NutritionistHome from "../demos/nutritionist/index.astro";
import NutritionistAbout from "../demos/nutritionist/about.astro";
import NutritionistServices from "../demos/nutritionist/services/index.astro";
import NutritionistServicesDetail from "../demos/nutritionist/services/[slug].astro";
import NutritionistProjects from "../demos/nutritionist/projects/index.astro";
import NutritionistProjectsDetail from "../demos/nutritionist/projects/[slug].astro";
import NutritionistBlog from "../demos/nutritionist/blog/index.astro";
import NutritionistBlogDetail from "../demos/nutritionist/blog/[slug].astro";
import NutritionistContact from "../demos/nutritionist/contact.astro";
import NutritionistThanks from "../demos/nutritionist/thanks.astro";
import NutritionistPrivacyPolicy from "../demos/nutritionist/privacy-policy.astro";
import NutritionistTermsAndConditions from "../demos/nutritionist/terms-and-conditions.astro";
import NutritionistNotFound from "../demos/nutritionist/not-found.astro";

const NUTRITIONIST = "nutritionist";

type DemoKeys = typeof NUTRITIONIST;

type Paths =
  | "home"
  | "about"
  | "services"
  | "servicesDetail"
  | "projects"
  | "projectsDetail"
  | "blog"
  | "blogDetail"
  | "contact"
  | "thanks"
  | "privacyPolicy"
  | "termsAndConditions"
  | "notFound";

const useDemo = () => {
  const isDemo = getSecret("DEMO") === "true";

  const availableDemos: { key: DemoKeys; label: string }[] = [
    {
      key: NUTRITIONIST,
      label: "Nutrisionista",
    },
  ];

  const renderDemo = ({
    demoKey,
    path,
  }: {
    demoKey: DemoKeys;
    path: Paths;
  }) => {
    if (!isDemo) return null;
    if (demoKey === NUTRITIONIST) {
      switch (path) {
        case "home":
          return NutritionistHome;
        case "about":
          return NutritionistAbout;
        case "services":
          return NutritionistServices;
        case "servicesDetail":
          return NutritionistServicesDetail;
        case "projects":
          return NutritionistProjects;
        case "projectsDetail":
          return NutritionistProjectsDetail;
        case "blog":
          return NutritionistBlog;
        case "blogDetail":
          return NutritionistBlogDetail;
        case "contact":
          return NutritionistContact;
        case "thanks":
          return NutritionistThanks;
        case "privacyPolicy":
          return NutritionistPrivacyPolicy;
        case "termsAndConditions":
          return NutritionistTermsAndConditions;
        case "notFound":
          return NutritionistNotFound;
        default:
          return null;
      }
    }
    return null;
  };

  return { isDemo, availableDemos, renderDemo };
};

export default useDemo;
