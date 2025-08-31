import { CareersHero } from '@/components/careers/CareersHero';
import { JobListings } from '@/components/careers/JobListings';
import { CompanyCulture } from '@/components/careers/CompanyCulture';
import { Benefits } from '@/components/careers/Benefits';

export default function CareersPage() {
  return (
    <main>
      <CareersHero />
      <JobListings />
      <CompanyCulture />
      <Benefits />
    </main>
  );
}
