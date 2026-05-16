import {SanityPackageDetailPage} from "@/components/sanity-pages";
import {sanityFetch} from "@/lib/sanity/fetch";
import {packageBySlugQuery} from "@/lib/sanity/queries";

export default async function Page({ params }) {
  const { id } = await params;
  const pkg = await sanityFetch({query: packageBySlugQuery, params: {slug: id}});
  return <SanityPackageDetailPage pkg={pkg} />;
}
