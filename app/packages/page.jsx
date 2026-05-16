import {SanityPackagesPage} from "@/components/sanity-pages";
import {sanityFetch} from "@/lib/sanity/fetch";
import {packagesQuery} from "@/lib/sanity/queries";

export default async function Page() {
  const packages = await sanityFetch({query: packagesQuery});
  return <SanityPackagesPage packages={packages} />;
}
