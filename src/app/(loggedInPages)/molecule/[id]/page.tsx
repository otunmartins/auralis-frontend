import MoleculeResult from "@/containers/Dashboard/MoleculeResult";

interface MoleculePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoleculePage({ params }: MoleculePageProps) {
  const { id } = await params; // Await the params to resolve
  return <MoleculeResult moleculeId={id} />;
}
