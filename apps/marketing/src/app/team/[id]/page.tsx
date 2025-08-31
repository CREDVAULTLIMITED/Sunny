import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTeamMemberById, getAllTeamMemberIds } from '@/data/team';
import { TeamMemberProfile } from '@/components/team/TeamMemberProfile';

interface TeamMemberPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return getAllTeamMemberIds().map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const teamMember = getTeamMemberById(params.id);
  
  if (!teamMember) {
    return {
      title: 'Team Member Not Found | Sunny Payments',
    };
  }

  return {
    title: `${teamMember.name} - ${teamMember.role} | Sunny Payments`,
    description: teamMember.bio,
    keywords: `${teamMember.name}, ${teamMember.role}, Sunny Payments, leadership, team, fintech`,
    openGraph: {
      title: `${teamMember.name} - ${teamMember.role}`,
      description: teamMember.bio,
      type: 'profile',
      images: [
        {
          url: teamMember.image,
          width: 1200,
          height: 630,
          alt: teamMember.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${teamMember.name} - ${teamMember.role}`,
      description: teamMember.bio,
      images: [teamMember.image],
    },
  };
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const teamMember = getTeamMemberById(params.id);

  if (!teamMember) {
    notFound();
  }

  return <TeamMemberProfile teamMember={teamMember} />;
}
